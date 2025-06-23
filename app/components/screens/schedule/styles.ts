import { colors } from "@/app/utils/colors";
import { fontFamilies } from "@/app/utils/fontfamily";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 20,
    paddingHorizontal: 20,
  },
  boton: {
    backgroundColor: colors.primary,
    paddingInline: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  text: {
    color: "white",
    fontFamily: fontFamilies.MONTSERRAT.bold,
    fontSize: 18,
  },
});
