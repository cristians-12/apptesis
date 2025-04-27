import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import CloseIcon from "@/assets/icons/CloseIcon";

interface Props {
    onPressClose: () => void;
}

export default function ModalManual({ onPressClose }: Props) {
    return (
        <Modal>
            <View style={styles.container}>
                <View style={styles.flex}>
                    <Text>Manual de usuario</Text>
                    <TouchableOpacity onPress={onPressClose}>
                        <CloseIcon width={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}