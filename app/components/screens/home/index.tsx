import {
  Alert,
  Image,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { styles } from "./styles";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { RegistroType } from "@/app/types/semana";
import useNotifications from "@/app/hooks/useNotifications";
import useWebSocket from "@/app/hooks/useWebsocket";
import useDatabase from "@/app/hooks/useDatabase";
import { url } from "@/app/utils/constants";
import { colors } from "@/app/utils/colors";
import BookIcon from "@/app/assets/icons/BookIcon";
import RegistersContainer from "../../organisms/RegistersContainer";
import ModalManual from "../../organisms/modals/ModalManual";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const logoImage = require("../../../assets/images/logofinal.png");
  const [mensaje, setMensaje] = useState<{ status: string; data: string }>({
    data: "Aun no hay datos.",
    status: "false",
  });
  const [modal, setModal] = useState(false);
  const [registros, setRegistros] = useState<RegistroType[] | []>([]);

  const { sendLocalNotification } = useNotifications();
  const { connectWebSocket, disconnectWebSocket, message } = useWebSocket({
    sendLocalNotification,
  });

  const {
    crearTabla,
    guardarRegistro,
    obtenerTodosRegistros,
    vaciarTabla,
    eliminarRegistro,
  } = useDatabase();

  const obtenerRegistrosArduino = async () => {
    try {
      const response = await fetch(`${url}/data`);
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      const datos = await response.json();
      setMensaje(datos);
      console.log("Datos:", datos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Hubo un error:", error);
        setMensaje({ status: "error", data: error.message });
      } else {
        console.error("Error desconocido:", error);
        Alert.alert("Error", "Ocurrió un error desconocido");
        setMensaje({ status: "error", data: "Error desconocido" });
      }
    }
  };

  const handleCloseModal = () => {
    setModal(false);
  };
  const handleConexion = () => {
    obtenerRegistrosArduino();
  };

  const obtenerRegistrosyGuardar = async () => {
    const resultados = await obtenerTodosRegistros();
    setRegistros(resultados);
  };

  const eliminarRegistroHandler = async (id: number) => {
    await eliminarRegistro(id);
    obtenerRegistrosyGuardar();
  };

  const vaciarTablaHandler = async () => {
    vaciarTabla();
    obtenerRegistrosyGuardar();
  };

  useEffect(() => {
    crearTabla();
    obtenerRegistrosyGuardar();
  }, []);

  useEffect(() => {
    if (message) {
      try {
        const parsedMessage = JSON.parse(message);
        Toast.show({
          type: "info",
          text1: "Mensaje recibido",
          text2: `Datos: ${parsedMessage.data}`,
        });

        const guardarYActualizar = async () => {
          console.log("Mensaje recibido:", message);
          await guardarRegistro(parsedMessage.data);
          await obtenerRegistrosyGuardar();
        };
        guardarYActualizar();
      } catch (error) {
        console.error("Error al parsear el mensaje JSON:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudo procesar el mensaje recibido.",
        });
      }
    }
  }, [message,]);

  useFocusEffect(
    useCallback(() => {
      connectWebSocket();
      return () => disconnectWebSocket();
    }, [connectWebSocket, disconnectWebSocket])
  );



  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} horizontal={false}>
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={styles.btnManual}
        >
          <BookIcon fill={colors.primary} />
          {/* <Text>Manual</Text> */}
        </TouchableOpacity>
        <Image style={styles.image} source={logoImage} />

        <RegistersContainer
          registros={registros}
          onPressCard={eliminarRegistroHandler}
        />
        {/* <TouchableOpacity style={styles.boton} onPress={handleConexion}>
          <Text style={styles.textWhite}>Conectarse al panel</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.boton} onPress={() => {
          guardarRegistro('2023-10-10');
          obtenerRegistrosyGuardar();
        }}>
          <Text style={styles.textWhite}>Guardar registro</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={styles.btnManual}
        >
          <BookIcon fill={colors.primary} />
          {/* <Text>Manual</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteTable}
          onPress={vaciarTablaHandler}
        >
          <Text style={styles.textWhite}>Eliminar registros</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boton}
          onPress={connectWebSocket} // Conectar al WebSocket
        >
          <Text style={styles.textWhite}>Conectarse al panel</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.deleteTable} onPress={() => sendLocalNotification('hola')}>
          <Text style={styles.textWhite}>Enviar noti</Text>
        </TouchableOpacity> */}
      </ScrollView>
      {modal && <ModalManual onPressClose={handleCloseModal} />}
    </View>
  );
}
