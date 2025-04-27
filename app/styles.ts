import { StyleSheet } from "react-native";
import { colors } from "./utils/colors";
import { fontFamilies } from "./utils/fontfamily";

export const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
        },
        image: {
            width: 150,
            height: 150,
            objectFit: 'contain'
        },
        boton: {
            backgroundColor: colors.primary,
            borderRadius: 20,
            paddingVertical: 10,
            marginTop: 20,
            paddingHorizontal: 20,
        },
        containerRegistros: {
            borderWidth: 1,
            borderColor: 'black',
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
        },
        textWhite: {
            color: 'white',
            fontSize: 20,
            fontFamily: fontFamilies.MONTSERRAT.bold
        },
        btnManual: {
            // backgroundColor: colors.primary
            borderWidth: 1,
            borderColor: 'gray',
            padding: 7,
            borderRadius: 10,
            position: 'absolute',
            top: 30,
            right: 30,
        },
        text: {
            fontFamily: fontFamilies.MONTSERRAT.medium
        }
    }
)
