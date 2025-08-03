import { colors } from "@/app/utils/colors";
import { fontFamilies } from "@/app/utils/fontfamily";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create(
    {
        container: {
            borderWidth: 2,
            borderColor: colors.primary,
            marginVertical: 10,
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        texto: {
            fontFamily: fontFamilies.MONTSERRAT.medium
        },
        delete: {
            backgroundColor: "red",
            padding: 5,
            borderRadius: 5,
        },
        texto2: {
            fontFamily: fontFamilies.MONTSERRAT.bold,
            color: colors.primary,
        }
    }
)