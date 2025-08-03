import { colors } from "@/app/utils/colors";
import { fontFamilies } from "@/app/utils/fontfamily";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {

    },
    text: {
        fontFamily: fontFamilies.MONTSERRAT.bold,
        color: colors.primary,
        fontSize: 30
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 10,
        alignItems: 'center'
    },
    text2: {
        fontFamily: fontFamilies.MONTSERRAT.medium,
        textAlign: 'center'
    },
    picker: {
        backgroundColor: colors.primary
    },
    btnText: {
        fontFamily: fontFamilies.MONTSERRAT.bold,
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }
})