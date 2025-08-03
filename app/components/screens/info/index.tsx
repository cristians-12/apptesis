import { Dimensions, SafeAreaView, Text, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/app/utils/colors";
import { LineChart } from "react-native-gifted-charts";
import { useWebSocketContext } from "@/app/context/WebsocketProvider";
import { RegistroType } from "@/app/types/semana";
import { getWeekOfMonth } from "date-fns";

const { width } = Dimensions.get("window");

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

export default function InfoScreen() {
  const { registros } = useWebSocketContext();
  const currentWeek = getWeekOfMonth(new Date(), { weekStartsOn: 1 });

  const weeklyData = registros.filter((r) => Number(r.semana) === currentWeek);

  const chartData = daysOfWeek.map((day, index) => {
    const dayRecords = weeklyData.filter(
      (r) => new Date(r.timestamp).getDay() === (index + 1) % 7
    );
    const total = dayRecords.reduce((sum, r) => sum + r.cantidad, 0);
    return { value: total, label: day };
  });

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <Text style={styles.title}>Semana {currentWeek}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: width,
          justifyContent: "flex-start",
          backgroundColor: "transparent",
          flex: 1,
        }}

        onTouchEnd={() => console.log(currentWeek)}
      >
        {/* Texto descripción eje Y rotado */}
        <Text style={styles.yAxisLabel}>Kg de comida dosificada</Text>

        {/* Gráfico */}
        <View style={{ backgroundColor: "transparent" }}>
          <LineChart
            data={chartData}
            color={colors.primary}
            dashGap={0}
            dataPointsWidth={10}
            xAxisColor={"black"}
            yAxisColor={"gray"}
            yAxisLabelTexts={["0", "1", "2", "3", "4", "5"]} // etiquetas para eje Y
            yAxisTextStyle={{ color: "gray", fontSize: 12 }}
            height={200}
            width={width * 0.8}
            hideYAxisText={false} // mostrar etiquetas
            yAxisThickness={1}
            disableScroll={false}
            thickness={4}
            spacing={70}
            customDataPoint={() => (
              <View
                style={{
                  backgroundColor: "darkblue",
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  borderWidth: 2,
                  borderColor: colors.primary,
                  marginTop: 0,
                  marginLeft: 0,
                }}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
