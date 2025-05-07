import { fontFamilies } from "@/app/utils/fontfamily";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create(
    {
        container: {
            borderWidth: 1,
            borderColor: "gray",
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
        delete:{
            backgroundColor: "red",
            padding: 5,
            borderRadius: 5,
        }
    }
)