import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import Toast from "react-native-toast-message";
import useDatabase from "@/app/hooks/useDatabase"; // Ajusta la ruta según tu estructura
import { RegistroType } from "@/app/types/semana"; // Ajusta la ruta según tu estructura

interface WebSocketContextType {
  message: string | undefined;
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
  sendMessage: (obj: any) => void;
  registros: RegistroType[] | [];
  isConnected: boolean;
  vaciarTablaHandler: () => void;
  obtenerRegistrosyGuardar: () => void;
  dosificacion: string;
}

// Crear el contexto
const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

// Hook personalizado para usar el contexto
export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider"
    );
  }
  return context;
};

// Proveedor del contexto
export const WebSocketProvider = ({
  children,
  sendLocalNotification,
}: {
  children: React.ReactNode;
  sendLocalNotification: (msg: string) => void;
}) => {
  const ws = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [registros, setRegistros] = useState<RegistroType[] | []>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [dosificacion, setDosificacion] = useState<string>("");

  const {
    crearTabla,
    guardarRegistro,
    obtenerTodosRegistros,
    vaciarTabla,
    crearTabla2,
    obtenerDosificacionProgramada,
  } = useDatabase();

  useEffect(() => {
    crearTabla();
    crearTabla2();
    obtenerRegistrosyGuardar();
  }, [dosificacion]);

  const obtenerRegistrosyGuardar = async () => {
    try {
      const resultados = await obtenerTodosRegistros();
      const dosif = await obtenerDosificacionProgramada();
      setDosificacion(dosif ? dosif.timestamp.toString() : "");
      setRegistros(resultados);
    } catch (error) {
      console.error("Error al obtener registros de la base de datos:", error);
    }
  };

  const vaciarTablaHandler = async () => {
    vaciarTabla();
    obtenerRegistrosyGuardar();
  };

  useEffect(() => {
    if (message) {
      try {
        const parsedMessage = JSON.parse(message);
        Toast.show({
          type: "info",
          text1: "Mensaje recibido",
          text2: `Datos: ${
            parsedMessage.data || JSON.stringify(parsedMessage)
          }`,
        });

        const guardarYActualizar = async () => {
          console.log("Mensaje recibido:", message);
          const data = parsedMessage.data || parsedMessage;

          if (data.cantidad !== undefined && data.semana !== undefined) {
            const fecha = data.fecha || new Date().toISOString();
            await guardarRegistro(fecha, data.cantidad, data.semana);
            await obtenerRegistrosyGuardar();
          } else {
            console.log(
              "Mensaje recibido no es un registro de consumo:",
              parsedMessage
            );
          }
        };
        guardarYActualizar();

        // Enviar notificación local si hay datos
        if (parsedMessage.data) {
          sendLocalNotification(parsedMessage.data);
          console.log(
            "Notificación local disparada con datos:",
            parsedMessage.data
          );
        }
      } catch (error) {
        console.error("Error al parsear el mensaje JSON:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se pudo procesar el mensaje recibido.",
        });
      }
    }
  }, [message, sendLocalNotification]);

  const connectWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      setIsConnected(false);
    }

    // Reemplaza la URL con la dirección de tu servidor WebSocket (por ejemplo, el de tu Arduino)
    ws.current = new WebSocket("ws://192.168.4.1/");

    Toast.show({
      type: "info",
      text1: "Conectándose al panel...",
      text2: "Espera unos segundos por favor. ⌚",
    });

    // Manejar eventos del WebSocket
    ws.current.onopen = () => {
      setIsConnected(true);
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
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket desconectado");
      Toast.show({
        type: "info",
        text1: "Desconectado del panel",
        text2: "La conexión con el panel se ha cerrado.",
      });
    };

    ws.current.onerror = (error) => {
      setIsConnected(false);
      console.error("Error en WebSocket:", error);
      Toast.show({
        type: "error",
        text1: "Error al conectarse al panel",
        text2: "Conéctate a la red generada por el panel! 😁",
      });
    };
  }, []);

  // Desconectar del WebSocket
  const disconnectWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
      setIsConnected(false);
      Toast.show({
        type: "info",
        text1: "Desconectado",
        text2: "Te has desconectado del panel.",
      });
    }
  }, []);

  const guardarRegistroYActualizar = useCallback((obj: any) => {
    guardarRegistro(obj.fecha, obj.cantidad, obj.semana);
    obtenerRegistrosyGuardar();
  }, []);

  const sendMessage = useCallback((obj: any) => {
    console.log("Enviando mensaje:", obj);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      Toast.show({
        type: "info",
        text1: "Enviando",
        text2: JSON.stringify(obj),
      });
      ws.current.send(JSON.stringify(obj));
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No estás conectado al panel.",
      });
    }
    guardarRegistroYActualizar(obj);
  }, []);

  useEffect(() => {
    let reconnectInterval: NodeJS.Timeout | null = null;
    if (!isConnected) {
      reconnectInterval = setInterval(() => {
        if (!isConnected && !ws.current) {
          console.log("Intentando reconectar al WebSocket...");
          connectWebSocket();
        }
      }, 5000); // Reintentar cada 10 segundos
    }

    return () => {
      if (reconnectInterval) {
        clearInterval(reconnectInterval);
      }
    };
  }, [isConnected, connectWebSocket]);

  useEffect(() => {
    const diaHoy = new Date().toLocaleDateString("es-ES", {
      day: "2-digit",
    });
    if (diaHoy === "30") {
      vaciarTablaHandler();
    }
  }, [dosificacion]);

  // Conectar automáticamente al iniciar la app (opcional)
  useEffect(() => {
    connectWebSocket();
    return () => {
      disconnectWebSocket();
    };
  }, [connectWebSocket, disconnectWebSocket]);

  return (
    <WebSocketContext.Provider
      value={{
        message,
        connectWebSocket,
        disconnectWebSocket,
        sendMessage,
        registros,
        isConnected,
        vaciarTablaHandler,
        obtenerRegistrosyGuardar,
        dosificacion,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
