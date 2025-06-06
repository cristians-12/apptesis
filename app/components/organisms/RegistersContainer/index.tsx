import { ScrollView, Text } from "react-native";
import RegistroCard from "../RegistroCard";
import { styles } from "./styles";
import { RegistroType } from "@/app/types/semana";

interface Props {
    registros: RegistroType[];
    onPressCard: (id: number) => void; // <-- acepta el id
}

export default function RegistersContainer({ registros, onPressCard }: Props) {
    return (
        <>
            <Text style={{ ...styles.text, textAlign: 'center' }}>Registros de dosificación</Text>
            <ScrollView style={styles.containerRegistros} horizontal={false} showsVerticalScrollIndicator={false}>
                {registros.length > 0 ?
                    (
                        registros.map((registro) => (
                            <RegistroCard
                                onPressDelete={() => onPressCard(registro.id)}
                                key={registro.id}
                                fecha={registro.timestamp}
                                semana={registro.semana}
                            />
                        ))
                    )
                    :
                    (
                        <Text style={styles.text}>No hay registros.</Text>
                    )}
            </ScrollView>
        </>
    )
}