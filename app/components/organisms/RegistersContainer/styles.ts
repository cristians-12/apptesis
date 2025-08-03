import { colors } from "@/app/utils/colors";
import { fontFamilies } from "@/app/utils/fontfamily";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerRegistros: {
        borderTopWidth: 1,
        borderColor: colors.primary,
        padding: 0,
        borderRadius: 10,
        marginTop: 20,
        height: 350,
        width: '100%',
        marginHorizontal: 'auto',
        borderBottomWidth: 1
    },
    text: {
        fontFamily: fontFamilies.MONTSERRAT.medium,
        textAlign: 'center'
    },
})