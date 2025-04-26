import { StyleSheet } from "react-native";

export const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        image: {
            width: 150,
            height: 150,
            objectFit: 'contain'
        },
        boton: {
            backgroundColor: 'blue',
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
            fontWeight: 'bold',
        }
    }
)
