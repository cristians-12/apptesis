import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import CloseIcon from "@/app/assets/icons/CloseIcon";

interface Props {
    semana: string;
    fecha: string;
    onPressDelete: () => void;
}

export default function RegistroCard({ fecha, semana, onPressDelete }: Props) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.texto}>
                    Fecha: {fecha}
                </Text>
                <Text style={styles.texto}>
                    {semana}
                </Text>
            </View>
            <TouchableOpacity onPress={onPressDelete} style={styles.delete}>
                <CloseIcon fill="white" />
                {/* <Text>x</Text> */}
            </TouchableOpacity>
        </View>
    )
}