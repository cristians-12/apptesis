import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

export default function Index() {
  const logoImage = require("./../assets/images/logofinal.png");

  const [mensaje, setMensaje] = useState<{ status: string; data: string }>({
    data: "",
    status: "success",
  });

  const url = "http://192.168.4.1";

  const db = SQLite.openDatabaseAsync("registros.db");

  const crearTabla = async () => {
    (await db).execSync(
      `
      CREATE TABLE IF NOT EXISTS registros (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          semana VARCHAR(50) NOT NULL
        );
      INSERT INTO registros (timestamp, semana) VALUES ('2025-04-21 10:00:00', 'Semana 1');
      `
    )
  };

  const intentarCrearRegistro = async () => {
    try {
      const firstRow = await (await db).getFirstAsync('SELECT * FROM registros');
      if (firstRow) {
        console.log(firstRow.id, firstRow.timestamp, firstRow.semana);
      } else {
        console.log("No se encontraron registros");
      }
    } catch (error) {
      console.error("Error al obtener el registro:", error);
    }
  }

  const obtenerMensaje = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const responseText = await response.text();
      console.log("Respuesta completa:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error("La respuesta no es un JSON válido");
      }

      Alert.alert("Respuesta completa", JSON.stringify(data));
      setMensaje({ status: "success", data: data.mensaje || JSON.stringify(data) });

      // insertarMensaje(JSON.stringify(data), "success");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Hubo un error:", error);
        Alert.alert("Error", error.message);
        setMensaje({ status: "error", data: error.message });
      } else {
        console.error("Error desconocido:", error);
        Alert.alert("Error", "Ocurrió un error desconocido");
        setMensaje({ status: "error", data: "Error desconocido" });
      }
    }
  }

  useEffect(() => {
    crearTabla();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logoImage} />
      <View>
        <Text>Ver registros de dosificación</Text>
        <Text>{mensaje.data}</Text>
      </View>
      <TouchableOpacity style={styles.boton} onPress={intentarCrearRegistro}>
        <Text>Conectarse al panel.</Text>
      </TouchableOpacity>
    </View>
  );
}