import React, { useCallback, useEffect, useState } from "react";
import { View, Button, Platform, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useWebSocket from "@/app/hooks/useWebsocket";
import useNotifications from "@/app/hooks/useNotifications";
import Toast from "react-native-toast-message";
import { styles } from "./styles";
import { useFocusEffect } from "@react-navigation/native";

export default function ScheduleRegisterScreen() {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const { sendLocalNotification } = useNotifications();

    const { sendMessage, connectWebSocket, disconnectWebSocket } = useWebSocket({ sendLocalNotification });

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios"); // Mantén el picker abierto en iOS
        setDate(currentDate); // Actualiza la fecha seleccionada
    };

    const showDatePicker = () => {
        setShow(true); // Muestra el selector de fecha
    };

    const enviarFecha = () => {
        sendMessage({
            fecha: date.toLocaleDateString('es-ES'),
        });
        Toast.show(
            {
                type: 'info',
                text1: 'Programando dosificacion..',
                text2: 'Espera unos segundos.. ⌚'
            }
        );
    };

    useFocusEffect(
        useCallback(() => {
            connectWebSocket();
            return () => disconnectWebSocket();
        }, [connectWebSocket, disconnectWebSocket])
    )

    return (
        <View style={styles.container}>

            <Text style={{ marginBottom: 20 }}>Fecha seleccionada: {date.toLocaleDateString('es-ES')}</Text>
            <Button title="Seleccionar fecha" onPress={showDatePicker} />
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
            <Button title="Enviar fecha" onPress={enviarFecha} />
        </View>
    );
}