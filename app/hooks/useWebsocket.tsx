import React, { useEffect, useRef, useState, useCallback } from "react";
import Toast from "react-native-toast-message";

const useWebSocket = ({
  sendLocalNotification,
}: {
  sendLocalNotification: (msg: string) => void;
}) => {
  const ws = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const sendMessage = useCallback((obj: any) => {
    console.log("Enviando mensaje:", JSON.stringify(obj));
    if (ws.current) {
      Toast.show({
        type: "info",
        text1: "Enviando",
        text2: JSON.stringify(obj),
      });
      ws.current.send(JSON.stringify(obj));
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket("ws://192.168.4.1/");

    Toast.show({
      type: "info",
      text1: "Conectándose al panel...",
      text2: "Espera unos segundos por favor. ⌚",
    });

    ws.current.onopen = () => {
      Toast.show({
        type: "success",
        text1: "Te conectaste al panel principal",
        text2: "Ya estarás recibiendo las notificaciones del panel! 😊",
      });
    };

    ws.current.onmessage = (event) => {
      const receivedMessage = event.data;
      setMessage(receivedMessage);
      console.log("Mensaje recibido del WebSocket:", receivedMessage);
      try {
        const jsonData = JSON.parse(receivedMessage);
        if (jsonData.data) {
          sendLocalNotification(jsonData.data);
          console.log("Notificación local disparada con datos:", jsonData.data);
        } else {
          console.log("No se encontraron datos en el mensaje para notificación.");
        }
      } catch (error) {
        console.error("Error al parsear mensaje WebSocket:", error);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket desconectado");
      Toast.show({
        type: "info",
        text1: "Desconectado del panel",
        text2: "La conexión con el panel se ha cerrado.",
      });
    };

    ws.current.onerror = (error) => {
      console.error("Error en WebSocket:", error);
      Toast.show({
        type: "error",
        text1: "Error al conectarse al panel",
        text2: "Conéctate a la red generada por el panel! 😁",
      });
    };
  }, [sendLocalNotification]);

  const disconnectWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  }, []);

  return { message, connectWebSocket, disconnectWebSocket, sendMessage };
};

export default useWebSocket;