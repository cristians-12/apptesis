import React, { useCallback, useEffect, useState } from "react";
import { View, Button, Platform, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import { styles } from "./styles";
import DropDownPicker from "react-native-dropdown-picker";
import { fontFamilies } from "@/app/utils/fontfamily";
import { useWebSocketContext } from "@/app/context/WebsocketProvider";
import { TouchableOpacity } from "react-native";

export default function ScheduleRegisterScreen() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // Estado para el dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Semana 1 - 540gr", value: 1 },
    { label: "Semana 2 - 715gr", value: 2 },
    { label: "Semana 3 - 800gr", value: 3 },
    { label: "Semana 4 - 1200gr", value: 4 },
    { label: "Semana 5 - 1600gr", value: 5 },
  ]);

  // Usar el contexto de WebSocketProvider
  const { sendMessage, isConnected } = useWebSocketContext();

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const enviarFecha = () => {
    if (!isConnected) {
      Toast.show({
        type: "error",
        text1: "No conectado",
        text2: "Conéctate al panel primero.",
      });
      return;
    }

    sendMessage({
      fecha: date.toLocaleDateString("es-ES"),
      semana: value, // Envía la semana seleccionada
    });
    Toast.show({
      type: "info",
      text1: "Programando dosificación...",
      text2: "Espera unos segundos ⌚",
    });
  };

  const getCantidad = (value: number) => {
    switch (value) {
      case 1:
        return 540;
      case 2:
        return 715;
      case 3:
        return 800;
      case 4:
        return 1200;
      case 5:
        return 1600;
      default:
        return 0;
    }
  };

  const enviarDosificacion = () => {
    if (!isConnected) {
      Toast.show({
        type: "error",
        text1: "No conectado",
        text2: "Conéctate al panel primero.",
      });
      return;
    }

    if (!value) {
      Toast.show({
        type: "error",
        text1: "Selección requerida",
        text2: "Selecciona una semana primero.",
      });
      return;
    }

    sendMessage({
      semana: value,
      dosificar: true,
      fecha: date.toLocaleDateString("es-ES"),
      cantidad: getCantidad(value),
    });
    Toast.show({
      type: "success",
      text1: "Enviando dosificación...",
      text2: "Espera unos segundos... ⌚",
    });
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Selecciona una semana"
        style={{ marginBottom: 20 }}
        containerStyle={{ marginHorizontal: 18 }}
        theme="LIGHT"
        textStyle={{ fontFamily: fontFamilies.MONTSERRAT.medium }}
        labelStyle={{ fontFamily: fontFamilies.MONTSERRAT.medium }}
      />
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      {value && (
        <TouchableOpacity onPress={enviarDosificacion} style={styles.boton}>
          <Text style={styles.text}>Enviar dosificación</Text>
        </TouchableOpacity>
      )}
      {!isConnected && (
        <Text
          style={{
            color: "red",
            textAlign: "center",
            marginTop: 10,
            fontFamily: fontFamilies.MONTSERRAT.medium,
          }}
        >
          No estás conectado al panel. Conéctate desde la pestaña Home.
        </Text>
      )}
    </View>
  );
}
