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

  // Abre o crea la base de datos
  // const db = SQLite.openDatabase("databaseName.db");

  // Función para crear una tabla
  // const crearTabla = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `CREATE TABLE IF NOT EXISTS mensajes (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         data TEXT NOT NULL,
  //         status TEXT NOT NULL
  //       );`,
  //       [],
  //       () => console.log("Tabla creada exitosamente"),
  //       (tx, error) => {
  //         console.error("Error al crear la tabla:", error);
  //         return false;
  //       }
  //     );
  //   });
  // };

  // Función para insertar datos en la tabla
  // const insertarMensaje = (data: string, status: string) => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `INSERT INTO mensajes (data, status) VALUES (?, ?);`,
  //       [data, status],
  //       () => console.log("Mensaje insertado exitosamente"),
  //       (tx, error) => {
  //         console.error("Error al insertar el mensaje:", error);
  //         return false;
  //       }
  //     );
  //   });
  // };

  // Función para obtener datos de la tabla
  const obtenerMensajes = () => {
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     `SELECT * FROM mensajes;`,
    //     [],
    //     (_, { rows }) => {
    //       console.log("Mensajes obtenidos:", rows._array);
    //       Alert.alert("Mensajes", JSON.stringify(rows._array));
    //     },
    //     (tx, error) => {
    //       console.error("Error al obtener los mensajes:", error);
    //       return false;
    //     }
    //   );
    // });
  };

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
    } catch (error) {
      console.error("Hubo un error:", error);
      Alert.alert("Error", error.message);
      setMensaje({ status: "error", data: error.message });

      // insertarMensaje(error.message, "error");
    }
  };

  useEffect(() => {
    // crearTabla();
    // obtenerMensaje();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logoImage} />
      <View>
        <Text>Ver registros de dosificación</Text>
        <Text>{mensaje.data}</Text>
      </View>
      <TouchableOpacity style={styles.boton} onPress={obtenerMensaje}>
        <Text>Hacer petición</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} onPress={obtenerMensajes}>
        <Text>Ver mensajes guardados</Text>
      </TouchableOpacity>
    </View>
  );
}