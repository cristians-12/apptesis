import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { RegistroType } from "@/app/types/semana";
import { colors } from "@/app/utils/colors";
import BookIcon from "@/app/assets/icons/BookIcon";
import RegistersContainer from "../../organisms/RegistersContainer";
import ModalManual from "../../organisms/modals/ModalManual";
import Toast from "react-native-toast-message";
import useDatabase from "@/app/hooks/useDatabase";
import { useWebSocketContext } from "@/app/context/WebsocketProvider";
import useServo from "@/app/hooks/useServo";

export default function Home() {
  const logoImage = require("../../../assets/images/logofinal.png");
  const [modal, setModal] = useState(false);

  // Usar el contexto de WebSocketProvider
  const { connectWebSocket, disconnectWebSocket, registros, isConnected, obtenerRegistrosyGuardar } = useWebSocketContext();

  const {
    crearTabla,
    vaciarTabla,
    eliminarRegistro,
  } = useDatabase();

  const { detenerServo } = useServo();

  const eliminarRegistroHandler = async (id: number) => {
    await eliminarRegistro(id);
    obtenerRegistrosyGuardar();
  };

  const vaciarTablaHandler = async () => {
    await vaciarTabla();
    obtenerRegistrosyGuardar();
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  useEffect(() => {
    crearTabla();
    obtenerRegistrosyGuardar();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} horizontal={false}>
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={styles.btnManual}
        >
          <BookIcon fill={colors.primary} />
        </TouchableOpacity>
        <Image style={styles.image} source={logoImage} />

        {/* Usar los registros proporcionados por el contexto */}
        <RegistersContainer
          registros={registros}
          onPressCard={eliminarRegistroHandler}
        />
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={styles.btnManual}
        >
          <BookIcon fill={colors.primary} />
        </TouchableOpacity>
        {
          registros.length > 0 && <TouchableOpacity
            style={styles.deleteTable}
            onPress={vaciarTablaHandler}
          >
            <Text style={styles.textWhite}>Eliminar registros</Text>
          </TouchableOpacity>
        }

        <TouchableOpacity
          style={[styles.boton, !isConnected && { backgroundColor: "#808080" }]}
          onPress={connectWebSocket} // Conectar al WebSocket
        >
          <Text style={styles.textWhite}>
            {isConnected ? "Conectado al panel" : "Conectarse al panel"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={detenerServo} style={styles.boton}>
          <Text style={styles.textWhite}>
            Detener dosificacion
          </Text>
        </TouchableOpacity>

        {/* {isConnected && (
          <TouchableOpacity
            style={[styles.boton, { backgroundColor: "#ff6347" }]} // Color diferente para desconectar
            onPress={disconnectWebSocket} // Desconectar del WebSocket
          >
            <Text style={styles.textWhite}>Desconectarse del panel</Text>
          </TouchableOpacity>
        )} */}
      </ScrollView>
      {modal && <ModalManual onPressClose={handleCloseModal} />}
    </View>
  );
}