import { Modal, Text } from "react-native";
import { styles } from "./styles";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import CloseIcon from "@/assets/icons/CloseIcon";
import SolidButton from "@/app/components/molecules/SolidButton";
import useDatabase from "@/app/hooks/useDatabase";

interface Props {
    // visible: boolean;
    onClose: () => void;
    message: string;
}

export default function ModalConexion({ onClose, message }: Props) {

    const { guardarRegistro } = useDatabase();

    return (
        <Modal transparent animationType="fade" >
            <View style={styles.container}>
                <View style={styles.inside}>
                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                        <CloseIcon />
                    </TouchableOpacity>
                    <Text style={styles.text}>Mensaje recibido: </Text>
                    <Text style={{ ...styles.text, marginTop: 20 }}>{message}</Text>
                    <View style={styles.containerBtn}>
                        <SolidButton onPress={() => guardarRegistro(message)} title="Guardar registro" />
                    </View>
                </View>
            </View>
        </Modal>
    )
}