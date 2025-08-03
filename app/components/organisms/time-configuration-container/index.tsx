import CloseIcon from '@/app/assets/icons/CloseIcon';
import { colors } from '@/app/utils/colors';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { styles } from './styles';
import { useWebSocketContext } from '@/app/context/WebsocketProvider';

export default function ConfigurationHourContainer() {
    const { sendMessage } = useWebSocketContext();

    // Fecha actual
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // JS months: 0-11
    const currentYear = today.getFullYear();

    // Rango de años, meses, días
    const years = Array.from({ length: 10 }, (_, i) => ({
        label: (currentYear + i).toString(),
        value: currentYear + i
    }));

    const months = Array.from({ length: 12 }, (_, i) => ({
        label: (i + 1).toString().padStart(2, "0"),
        value: i + 1
    }));

    // Calcula días según año/mes seleccionados y la fecha de hoy
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedDay, setSelectedDay] = useState(currentDay);

    useEffect(() => {
        // Si cambias año o mes y el día queda inválido, pon el 1 o el actual
        setSelectedDay((prev) => {
            const max = daysInMonth(selectedYear, selectedMonth);
            if (selectedYear === currentYear && selectedMonth === currentMonth && prev < currentDay)
                return currentDay;
            if (prev > max) return max;
            return prev;
        });
    }, [selectedYear, selectedMonth]);

    function daysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    let minDay = 1;
    if (selectedYear === currentYear && selectedMonth === currentMonth) minDay = currentDay;
    const daysArr = Array.from(
        { length: daysInMonth(selectedYear, selectedMonth) - minDay + 1 },
        (_, i) => ({
            label: (minDay + i).toString().padStart(2, "0"),
            value: minDay + i
        })
    );

    // Hora/minuto igual que antes, pero minutos deben ir de 0 a 59:
    const hours = Array.from({ length: 24 }, (_, i) => ({
        label: (i + 1).toString().padStart(2, "0"),
        value: i + 1
    }));
    const minutes = Array.from({ length: 60 }, (_, i) => ({
        label: i.toString().padStart(2, "0"),
        value: i
    }));

    const [selectedHour, setSelectedHour] = useState(today.getHours() + 1); // WheelPicker inicia en 1
    const [selectedMinute, setSelectedMinute] = useState(today.getMinutes());

    // Handler combinado
    const handleSendDateHour = () => {
        sendMessage({
            year: selectedYear,
            month: selectedMonth,
            day: selectedDay,
            hour: selectedHour,
            minute: selectedMinute
        });
    };

    return (
        <>
            <Text style={styles.text2}>Configurar fecha y hora del panel</Text>

            {/* Picker de FECHA */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 16 }}>
                <WheelPickerExpo
                    selectedStyle={{
                        borderColor: colors.primary,
                        borderWidth: 2
                    }}
                    height={260}
                    width={80}
                    initialSelectedIndex={daysArr.findIndex(d => d.value === selectedDay)}
                    items={daysArr}
                    onChange={({ item }) => setSelectedDay(item.value)}
                />
                <Text style={{ fontSize: 28, alignSelf: "center", marginHorizontal: 5 }}>/</Text>
                <WheelPickerExpo
                    selectedStyle={{
                        borderColor: colors.primary,
                        borderWidth: 2
                    }}
                    height={260}
                    width={80}
                    initialSelectedIndex={selectedMonth - 1}
                    items={months}
                    onChange={({ item }) => setSelectedMonth(item.value)}
                />
                <Text style={{ fontSize: 28, alignSelf: "center", marginHorizontal: 5 }}>/</Text>
                <WheelPickerExpo
                    selectedStyle={{
                        borderColor: colors.primary,
                        borderWidth: 2
                    }}
                    height={260}
                    width={100}
                    initialSelectedIndex={selectedYear - currentYear}
                    items={years}
                    onChange={({ item }) => setSelectedYear(item.value)}
                />
            </View>

            {/* Picker de HORA */}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <WheelPickerExpo
                    selectedStyle={{
                        borderColor: colors.primary,
                        borderWidth: 2
                    }}
                    height={260}
                    width={120}
                    initialSelectedIndex={selectedHour - 1}
                    items={hours}
                    onChange={({ item }) => setSelectedHour(item.value)}
                />
                <Text style={{ fontSize: 28, marginHorizontal: 10, alignSelf: "center" }}>:</Text>
                <WheelPickerExpo
                    selectedStyle={{
                        borderColor: colors.primary,
                        borderWidth: 2
                    }}
                    height={260}
                    width={120}
                    initialSelectedIndex={selectedMinute}
                    items={minutes}
                    onChange={({ item }) => setSelectedMinute(item.value)}
                />
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 14,
                    marginHorizontal: 32,
                    marginTop: 30,
                    borderRadius: 11,
                }}
                onPress={handleSendDateHour}
            >
                <Text style={styles.btnText}>
                    Enviar fecha y hora
                </Text>
            </TouchableOpacity>
        </>
    );
}