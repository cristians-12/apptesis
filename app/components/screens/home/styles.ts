import { colors } from "@/app/utils/colors";
import { fontFamilies } from "@/app/utils/fontfamily";
import { StyleSheet } from "react-native";


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
            objectFit: 'contain',
            marginHorizontal: 'auto'
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
            height: 300,
            width: '90%',
            marginHorizontal: 'auto',
        },
        textWhite: {
            color: 'white',
            fontSize: 20,
            fontFamily: fontFamilies.MONTSERRAT.bold,
            textAlign: 'center'
        },
        btnManual: {
            // backgroundColor: colors.primary
            borderWidth: 1,
            borderColor: 'gray',
            padding: 7,
            borderRadius: 10,
            position: 'absolute',
            top: 50,
            right: 15,
        },
        text: {
            fontFamily: fontFamilies.MONTSERRAT.medium
        },
        scrollContainer: {
            width: '100%',
            height: '100%',
            padding: 20,
            // backgroundColor: colors.white,
        },
        deleteTable: {
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 20,
            marginTop: 20,
        }
    }
)
