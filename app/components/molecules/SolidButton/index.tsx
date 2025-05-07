import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { styles } from "./styles";

interface Props {
    title: string;
    onPress: () => void;
}

export default function SolidButton({ onPress, title }: Props) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}