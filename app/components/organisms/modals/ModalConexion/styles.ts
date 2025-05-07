import { fontFamilies } from "@/app/utils/fontfamily";
import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: height,
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    inside: {
        backgroundColor: 'white',
        width: '70%',
        height: '50%',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 'auto',
        marginTop: 100,
        position: 'relative'
    },
    text: {
        fontFamily: fontFamilies.MONTSERRAT.medium,
        fontSize: 15,
        textAlign: 'center',
    },
    closeIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 3,
    },
    containerBtn: {
        position: 'absolute',
        bottom: 20,
        width: '117%',
        // backgroundColor: 'red',
    }
})