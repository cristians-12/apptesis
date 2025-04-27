import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import CloseIcon from "@/assets/icons/CloseIcon";
import { colors } from "@/app/utils/colors";

interface Props {
    onPressClose: () => void;
}

export default function ModalManual({ onPressClose }: Props) {
    return (
        <Modal animationType="slide">
            <View style={styles.container}>
                <View style={styles.flex}>
                    <View />
                    <Text style={styles.text}>Manual de usuario</Text>
                    <TouchableOpacity onPress={onPressClose}>
                        <CloseIcon fill={colors.primary} width={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                    <Text>
                        <Text style={styles.numbers}>1.</Text>
                        <Text style={styles.enums}>{' '}Verificar que el dispositivo este encendido.</Text>
                    </Text>
                </View>
            </View>
        </Modal>
    )
}