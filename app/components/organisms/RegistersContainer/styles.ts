import { fontFamilies } from "@/app/utils/fontfamily";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerRegistros: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        height: 300,
        width: '90%',
        marginHorizontal: 'auto',
    },
    text: {
        fontFamily: fontFamilies.MONTSERRAT.medium
    },
})