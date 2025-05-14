import React, { useCallback, useEffect, useState } from "react";
import { View, Button, Platform, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useWebSocket from "@/app/hooks/useWebsocket";
import useNotifications from "@/app/hooks/useNotifications";
import Toast from "react-native-toast-message";
import { styles } from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker"; // <-- Agrega esta línea
import { fontFamilies } from "@/app/utils/fontfamily";

export default function ScheduleRegisterScreen() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // Estado para el dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Semana 1", value: "semana1" },
    { label: "Semana 2", value: "semana2" },
    { label: "Semana 3", value: "semana3" },
    { label: "Semana 4", value: "semana4" },
    { label: "Semana 5", value: "semana5" },
  ]);

  const { sendLocalNotification } = useNotifications();

  const { sendMessage, connectWebSocket, disconnectWebSocket } = useWebSocket({
    sendLocalNotification,
  });

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const enviarFecha = () => {
    sendMessage({
      fecha: date.toLocaleDateString("es-ES"),
      semana: value, // Envía la semana seleccionada
    });
    Toast.show({
      type: "info",
      text1: "Programando dosificacion..",
      text2: "Espera unos segundos ⌚",
    });
  };

  const enviarDosificacion = () => {
    sendMessage({
      semana: value,
    });
    Toast.show({
      type: "success",
      text1: "Enviando dosificacion..",
      text2: "Espera unos segundos.. ⌚",
    });
  };

  useFocusEffect(
    useCallback(() => {
      connectWebSocket();
      return () => disconnectWebSocket();
    }, [connectWebSocket, disconnectWebSocket])
  );

  return (
    <View style={styles.container}>
      {/* <Text style={{ marginBottom: 20 }}>
        Fecha seleccionada: {date.toLocaleDateString("es-ES")}
      </Text> */}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Selecciona una semana"
        style={{ marginBottom: 20}}
        containerStyle={{ marginHorizontal: 18 }}
        theme="LIGHT"
        textStyle={{fontFamily:fontFamilies.MONTSERRAT.medium}}
        labelStyle={{fontFamily:fontFamilies.MONTSERRAT.medium}}

      />
      {/* <Button title="Seleccionar fecha" onPress={showDatePicker} /> */}
      {show && (
        <>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        </>
      )}
      {value && <Button title="Enviar dosificacion" onPress={enviarDosificacion} />}
    </View>
  );
}
