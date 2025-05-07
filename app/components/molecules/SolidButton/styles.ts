import { colors } from "@/app/utils/colors";
import { fontFamilies } from "@/app/utils/fontfamily";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 'auto',
        position: 'relative',
    },
    text: {
        fontFamily: fontFamilies.MONTSERRAT.bold,
        color: 'white',
        textAlign: 'center',
    },

});