import { Text, View } from "react-native";
import { styles } from "./styles";

interface Props {
    semana: string;
    fecha: string;
}

export default function RegistroCard({ fecha, semana }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>
                Fecha: {fecha}
            </Text>
            <Text style={styles.texto}>
                {semana}
            </Text>
        </View>
    )
}