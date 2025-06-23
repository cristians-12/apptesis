import { Dimensions, SafeAreaView, Text, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/app/utils/colors";
import { LineChart } from "react-native-gifted-charts";

const { width } = Dimensions.get("window");
const data = [
  {
    value: 100,
    label: "Lunes",
  },
  {
    value: 200,
    label: "Martes",
  },
  {
    value: 300,
    label: "Miercoles",
  },
  {
    value: 403,
    label: "Jueves",
  },
  {
    value: 210,
    label: "Viernes",
  },
  {
    value: 210,
    label: "Sabado",
  },
  {
    value: 210,
    label: "Domingo",
  },
];

export default function InfoScreen() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <Text style={styles.title}>Semana 1</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: width,
          justifyContent: "flex-start",
          backgroundColor: "transparent",
          flex: 1,
        }}
      >
        {/* Texto descripción eje Y rotado */}
        <Text style={styles.yAxisLabel}>gr de comida dosificada</Text>

        {/* Gráfico */}
        <View style={{ backgroundColor: "transparent" }}>
          <LineChart
            data={data}
            color={colors.primary}
            dashGap={0}
            dataPointsWidth={10}
            xAxisColor={"black"}
            yAxisColor={"gray"}
            yAxisLabelTexts={["0", "100", "200", "300", "400", "500"]} // etiquetas para eje Y
            yAxisTextStyle={{ color: "gray", fontSize: 12 }}
            height={200}
            width={width * 0.85}
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
