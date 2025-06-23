import React, { useState } from "react";
import {
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./styles";
import { LineChart, PieChart } from "react-native-gifted-charts";
import { useWebSocketContext } from "@/app/context/WebsocketProvider";
import { logo_image } from "@/app/utils/constants";
import useDatabase from "@/app/hooks/useDatabase";
import { colors } from "@/app/utils/colors";

export default function DateScheduleScreen() {
  const { isConnected, dosificacion } = useWebSocketContext();
  const { guardarDosificacion, obtenerDosificacionProgramada, crearTabla2 } =
    useDatabase();
  // Initialize date with a Date object based on dosificacion (string) or current date
  const [date, setDate] = useState(
    dosificacion ? new Date(dosificacion) : new Date()
  );
  const [show, setShow] = useState(false);
  const [localDosificacion, setLocalDosificacion] = useState(null); // Local state for dosification

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("Pantalla enfocada, cargando dosificación...");
      crearTabla2().catch((error) => {
        console.error("Error al crear tabla:", error);
      });
      obtenerDosificacionProgramada()
        .then((result) => {
          console.log("Dosificación cargada:", result);
          setLocalDosificacion(result);
          // Update date if there's a dosification in the database
          if (result?.timestamp) {
            const parsedDate = new Date(result.timestamp);
            if (!isNaN(parsedDate.getTime())) {
              setDate(parsedDate);
            }
          }
        })
        .catch((error) => {
          console.error("Error al cargar dosificación:", error);
        });

      return () => {
        console.log("Pantalla desenfocada");
      };
    }, [])
  );

  const onChange = async (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      if (event.type === "set") {
        const currentDate = selectedDate || date;
        const formattedDate = formatDate(currentDate);
        console.log("Guardando fecha:", formattedDate);
        setShow(false);
        setDate(currentDate);
        try {
          await guardarDosificacion(formattedDate);
          const newDosificacion = await obtenerDosificacionProgramada();
          console.log("Dosificación guardada:", newDosificacion);
          setLocalDosificacion(newDosificacion);
        } catch (error) {
          console.error("Error al guardar dosificación:", error);
        }
      } else if (event.type === "dismiss") {
        console.log("Selector cancelado");
        setShow(false);
      }
    } else {
      const currentDate = selectedDate || date;
      const formattedDate = formatDate(currentDate);
      console.log("Guardando fecha:", formattedDate);
      setShow(false);
      setDate(currentDate);
      try {
        await guardarDosificacion(formattedDate);
        const newDosificacion = await obtenerDosificacionProgramada();
        console.log("Dosificación guardada:", newDosificacion);
        setLocalDosificacion(newDosificacion);
      } catch (error) {
        // Fixed: Changed 'else' to 'catch'
        console.error("Error al guardar dosificación:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo_image} style={styles.logo} />
      <Text style={styles.text2}>
        Seleccione la fecha para iniciar el proceso.
      </Text>
      {/* {
                dosificacion && date ? */}
      <Text style={styles.text}>
        Fecha de inicio seleccionada:{" "}
        {date.toLocaleDateString() || "No hay fecha seleccionada"}
      </Text>
      <Text style={styles.text}>
        {date.toLocaleDateString("es-ES", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </Text>
      {/* :
                    <Text style={styles.text}>Aun no cuentas con una fecha de inicio seleccionada.</Text>
            } */}
      {isConnected ? (
        <TouchableOpacity onPress={() => setShow(true)} style={styles.boton}>
          <Text style={styles.text}>Programar dosificación</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.textDanger}>
          Debes conectarte al panel para programar una fecha de inicio de
          proceso.
        </Text>
      )}
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      {/* <PieChart
                data={[
                    { value: 40, color: "#4CAF50", text: "Verde" },
                    { value: 30, color: "#2196F3", text: "Azul" },
                    { value: 20, color: "#FFC107", text: "Amarillo" },
                    { value: 10, color: "#F44336", text: "Rojo" },
                ]}
                strokeWidth={0}
                innerCircleBorderWidth={0}
                innerRadius={60}
                donut
                radius={70}
            /> */}
    </SafeAreaView>
  );
}
