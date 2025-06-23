import { colors } from "@/app/utils/colors";
import { fontFamilies } from "@/app/utils/fontfamily";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  text: {
    fontFamily: fontFamilies.MONTSERRAT.medium,
  },
  text2: {
    fontFamily: fontFamilies.MONTSERRAT.bold,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: colors.primary,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    position: "absolute",
    top: 10,
    // marginBottom: 20,
  },
  textDanger: {
    fontFamily: fontFamilies.MONTSERRAT.bold,
    color: "red",
    marginVertical: 10,
    textAlign: "center",
  },
  boton: {
    backgroundColor: colors.primary,
    paddingInline: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  title: {
    fontFamily: fontFamilies.MONTSERRAT.bold,
    fontSize: 24,
    textAlign: "center",
    color: colors.primary,
    marginVertical: 20,
  },
  yAxisLabel: {
    transform: [{ rotate: "-90deg" }],
    width: 100,
    textAlign: "center",
    fontSize: 14,
    color: "gray",
    marginRight: -100,
  },
});
