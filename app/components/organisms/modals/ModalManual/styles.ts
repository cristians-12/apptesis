import { colors } from "@/app/utils/colors";
import { fontFamilies } from "@/app/utils/fontfamily";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",

    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        marginTop: 20,
    },
    text: {
        fontFamily: fontFamilies.MONTSERRAT.bold,
        textAlign: 'center',
        fontSize: 20,
        color: colors.primary,
        // borderWidth: 1,
        // borderColor: colors.primary,
    },
    container2: {
        marginHorizontal: 18,
        marginTop: 20,
    },
    numbers: {
        fontFamily: fontFamilies.MONTSERRAT.bold,
        color: colors.primary,
        fontSize: 15,
    },
    enums: {
        fontFamily: fontFamilies.MONTSERRAT.medium,
        color: 'black',
        fontSize: 15,
    },
    bold: {
        fontFamily: fontFamilies.MONTSERRAT.bold
    }
})