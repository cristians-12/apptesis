import { StyleSheet } from "react-native";

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        image: {
            width: 100,
            height: 100,
            objectFit: 'contain'
        },
        boton: {
            backgroundColor: 'gray',
            borderRadius: 10,
            padding: 10,
        }
    }
)

export default styles;