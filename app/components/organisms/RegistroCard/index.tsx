import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import CloseIcon from "@/app/assets/icons/CloseIcon";

interface Props {
  semana: string;
  fecha: string;
  onPressDelete: () => void;
  cantidad: number;
}

export default function RegistroCard({
  fecha,
  semana,
  onPressDelete,
  cantidad,
}: Props) {
  // Dividir la cadena de fecha en fecha y hora usando el espacio como separador
  const [fechaParte, horaParte] = fecha.split(" ");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.texto}>Fecha: {fechaParte}</Text>
        <Text style={styles.texto}>Hora: {horaParte || "No disponible"}</Text>
        <Text style={styles.texto}>Semana: {semana}</Text>
        <Text style={styles.texto}>Cantidad: {cantidad} gr</Text>
      </View>
      <TouchableOpacity onPress={onPressDelete} style={styles.delete}>
        <CloseIcon fill="white" />
        {/* <Text>x</Text> */}
      </TouchableOpacity>
    </View>
  );
}
