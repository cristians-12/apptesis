import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles";
import { PieChart } from 'react-native-gifted-charts';

export default function DateScheduleScreen() {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <Text style={{ marginVertical: 10 }}>
                Seleccionada: {date.toLocaleString()}
            </Text>
            <Button title="Seleccionar fecha para inicio de proceso." onPress={() => setShow(true)} />
            {show && (
                <DateTimePicker
                    value={date}
                    mode="datetime"
                    display="default"
                    onChange={onChange}
                />
            )}
            <PieChart
                data={[
                    { value: 40, color: '#4CAF50', text: 'Verde' },
                    { value: 30, color: '#2196F3', text: 'Azul' },
                    { value: 20, color: '#FFC107', text: 'Amarillo' },
                    { value: 10, color: '#F44336', text: 'Rojo' },
                ]}
                strokeWidth={0}
                innerCircleBorderWidth={0}
                innerRadius={60}
                donut
                radius={70}
            />
        </View>
    );
}