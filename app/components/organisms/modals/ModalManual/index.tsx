import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/app/utils/colors";
import CloseIcon from "@/app/assets/icons/CloseIcon";

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
            <Text style={styles.enums}>
              {" "}
              Verificar que el dispositivo este encendido.
            </Text>
          </Text>
          <Text>
            <Text style={styles.numbers}>2.</Text>
            <Text style={styles.enums}>
              {" "}
              Conectarse a la red creada por el dispositivo.
            </Text>
          </Text>
          <Text>
            <Text style={{ ...styles.bold }}>Nombre de la red: DosifiApp</Text>
          </Text>
          <Text style={styles.bold}>Contraseña: dosificador123*</Text>
          <Text>
            <Text style={styles.numbers}>3.</Text>
            <Text style={styles.enums}>
              {" "}
              Debe conectarse al dispositivo desde la app tambien al presionar
              el boton de conectarse al panel.
            </Text>
          </Text>
          <Text>
            <Text style={styles.numbers}>4.</Text>
            <Text style={styles.enums}>
              {" "}
              Para realizar una dosificación desde la aplicacion debe dirigirse
              a la segunda pestaña y seleccionar la semana para enviar la
              dosificación al panel de control.
            </Text>
          </Text>
          <Text>
            <Text style={styles.numbers}>5.</Text>
            <Text style={styles.enums}>
              {" "}
              Para programar una dosificación debe dirigirse a la tercera
              pestaña y seleccionar el dia en el que iniciara el proceso de
              dosificación de alimento.
            </Text>
          </Text>
          <Text>
            <Text style={styles.numbers}>6.</Text>
            <Text style={styles.enums}>
              {" "}
              Recuerde que debe verificar que tenga suficiente alimento en el
              tanque.
            </Text>
          </Text>
        </View>
      </View>
    </Modal>
  );
}
