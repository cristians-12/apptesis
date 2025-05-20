import React, { useCallback, useEffect, useState } from "react";
import { View, Button, Platform, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import { styles } from "./styles";
import DropDownPicker from "react-native-dropdown-picker";
import { fontFamilies } from "@/app/utils/fontfamily";
import { useWebSocketContext } from "@/app/context/WebsocketProvider";

export default function ScheduleRegisterScreen() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // Estado para el dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Semana 1", value: 1 },
    { label: "Semana 2", value: 2 },
    { label: "Semana 3", value: 3 },
    { label: "Semana 4", value: 4 },
    { label: "Semana 5", value: 5 },
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
        <>
          {/* Botón para seleccionar fecha (opcional si lo necesitas) */}
          {/* <Button title="Seleccionar fecha" onPress={showDatePicker} /> */}
          {/* Botón para enviar dosificación */}
          <Button title="Enviar dosificación" onPress={enviarDosificacion} />
        </>
      )}
      {!isConnected && (
        <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
          No estás conectado al panel. Conéctate desde la pestaña Home.
        </Text>
      )}
    </View>
  );
}