import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";

export default function Index() {
  const logoImage = require("./../assets/images/logofinal.png");

  const [mensaje, setMensaje] = useState('Aun no hay respuesta');

  const url = 'http://192.168.4.1';

  const obtenerMensaje = async () => {
    try {
      const response = await fetch(url); // Realiza la solicitud a la URL
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`); // Maneja errores HTTP
      }
  
      const responseText = await response.text(); // Obtén la respuesta como texto
      console.log("Respuesta completa:", responseText); // Muestra la respuesta completa en la consola
  
      // Intenta parsear el texto como JSON
      let data;
      try {
        data = JSON.parse(responseText); // Convierte el texto a JSON
      } catch (parseError) {
        throw new Error("La respuesta no es un JSON válido");
      }
  
      Alert.alert("Respuesta completa", JSON.stringify(data)); // Muestra la respuesta en una alerta
      setMensaje(data.mensaje || JSON.stringify(data)); // Actualiza el estado con el mensaje recibido
    } catch (error) {
      console.error('Hubo un error:', error); // Muestra el error en la consola
      Alert.alert("Error", error.message); // Muestra el error en una alerta
      setMensaje(JSON.stringify(error.message)); // Actualiza el estado con un mensaje de error
    }
  };

  useEffect(() => {
    obtenerMensaje();
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
    </View>
  );
}
