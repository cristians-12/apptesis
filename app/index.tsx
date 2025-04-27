import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import ModalManual from "./components/organisms/modals/ModalManual";
import { url } from "./utils/constants";
import BookIcon from "@/assets/icons/BookIcon";
import { colors } from "./utils/colors";
import useDatabase from "./hooks/useDatabase";

export default function Index() {
  const logoImage = require("./../assets/images/logofinal.png");
  const [mensaje, setMensaje] = useState<{ status: string; data: string }>({
    data: "Aun no hay datos.",
    status: "false",
  });
  const [modal, setModal] = useState(false);
  const [registros, setRegistros] = useState<[]>([]);

  const { crearTabla, guardarRegistro, obtenerPrimerRegistro, obtenerTodosRegistros, vaciarTabla } = useDatabase();



  const obtenerRegistrosArduino = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      // const responseText = await response.text();
      // console.log("Respuesta completa:", responseText);
      const datos = await response.json();
      setMensaje(datos)
      console.log("Datos:", datos);
      // Alert.alert("Respuesta completa", JSON.stringify(data));
      // setMensaje({ status: "success", data: data.mensaje || JSON.stringify(data) });
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
  }

  const handleCloseModal = () => {
    setModal(false);
  }

  useEffect(() => {
    crearTabla();
    // obtenerRegistrosArduino();
    // obtenerPrimerRegistro();
    obtenerTodosRegistros();
    // vaciarTabla();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModal(true)} style={styles.btnManual}>
        <BookIcon fill={colors.primary} />
      </TouchableOpacity>
      <Image style={styles.image} source={logoImage} />
      <Text style={styles.text}>Ver registros de dosificación</Text>
      <View style={styles.containerRegistros}>
        <Text style={styles.text}>{mensaje.data}</Text>
      </View>
      <TouchableOpacity style={styles.boton} onPress={obtenerRegistrosArduino}>
        <Text style={styles.textWhite}>Conectarse al panel</Text>
      </TouchableOpacity>
      {modal && <ModalManual onPressClose={handleCloseModal} />}
    </View>
  );
}