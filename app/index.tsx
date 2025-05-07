import { Alert, Image, ScrollView, Text, Touchable, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import ModalManual from "./components/organisms/modals/ModalManual";
import { url } from "./utils/constants";
import BookIcon from "@/assets/icons/BookIcon";
import { colors } from "./utils/colors";
import useDatabase from "./hooks/useDatabase";
import { RegistroType } from "./types/semana";
import RegistroCard from "./components/organisms/RegistroCard";
import ModalConexion from "./components/organisms/modals/ModalConexion";

export default function Index() {
  const logoImage = require("./../assets/images/logofinal.png");
  const [mensaje, setMensaje] = useState<{ status: string; data: string }>({
    data: "Aun no hay datos.",
    status: "false",
  });
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [registros, setRegistros] = useState<RegistroType[] | []>([]);

  const {
    crearTabla,
    guardarRegistro,
    obtenerTodosRegistros,
    vaciarTabla,
    eliminarRegistro
  } = useDatabase();

  const obtenerRegistrosArduino = async () => {
    try {
      const response = await fetch(`${url}/data`);
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
  const handleConexion = () => {
    obtenerRegistrosArduino();
    setModal2(true);
  }

  const handleCloseModal2 = () => {
    setModal2(false);
  }

  const obtenerRegistrosyGuardar = async () => {
    const resultados = await obtenerTodosRegistros();
    setRegistros(resultados);
  }

  const eliminarRegistroHandler = async (id: number) => {
    await eliminarRegistro(id);
    obtenerRegistrosyGuardar();
  }

  const vaciarTablaHandler = async () => {
    vaciarTabla();
    obtenerRegistrosyGuardar();
  }

  useEffect(() => {
    crearTabla();
    obtenerRegistrosyGuardar();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} horizontal={false}>
        <TouchableOpacity onPress={() => setModal(true)} style={styles.btnManual}>
          <BookIcon fill={colors.primary} />
        </TouchableOpacity>
        <Image style={styles.image} source={logoImage} />
        <Text style={{ ...styles.text, textAlign: 'center' }}>Registros de dosificación</Text>
        <ScrollView style={styles.containerRegistros} horizontal={false} showsVerticalScrollIndicator={false}>
          {registros.length > 0 ?
            (

              registros.map((registro) => (
                <RegistroCard onPressDelete={() => eliminarRegistroHandler(registro.id)} key={registro.id} fecha={registro.timestamp} semana={registro.semana} />
              ))

            )
            :
            (
              <Text style={styles.text}>No hay registros.</Text>
            )}
        </ScrollView>
        <TouchableOpacity style={styles.boton} onPress={handleConexion}>
          <Text style={styles.textWhite}>Conectarse al panel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton} onPress={() => {
          guardarRegistro('2023-10-10');
          obtenerRegistrosyGuardar();
        }}>
          <Text style={styles.textWhite}>Guardar registro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModal(true)} style={styles.btnManual}>
          <BookIcon fill={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteTable} onPress={vaciarTablaHandler}>
          <Text style={styles.textWhite}>Eliminar registros</Text>
        </TouchableOpacity>
      </ScrollView>
      {modal && <ModalManual onPressClose={handleCloseModal} />}
      {modal2 && <ModalConexion onClose={handleCloseModal2} message={mensaje.data} />}
    </View>
  );
}