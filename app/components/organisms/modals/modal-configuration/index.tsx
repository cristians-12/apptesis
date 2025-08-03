import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import CloseIcon from '@/app/assets/icons/CloseIcon';
import { colors } from '@/app/utils/colors';
import { styles } from './styles';
// import WheelPickerExpo from "react-native-wheel-picker-expo";
import { useWebSocketContext } from '@/app/context/WebsocketProvider';
import ConfigurationHourContainer from '../../time-configuration-container';

interface Props {
    onPressClose: () => void;
}

export default function ModalConfiguration({ onPressClose }: Props) {

    const { isConnected } = useWebSocketContext()

    return (
        <Modal animationType='slide'>
            {/* <View style={styles.flex}>
                <View />
                <Text style={styles.text}>
                    Configuracion
                </Text>
                <TouchableOpacity onPress={onPressClose}>
                    <CloseIcon fill={colors.primary} width={30} />
                </TouchableOpacity>
            </View>
            {
                isConnected ?
                    (
                        <ConfigurationHourContainer />
                    )
                    :
                    (
                        <View style={{ flex: 1, minHeight: '40%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.textError}>Debes estar conectado para configurar el panel.</Text>
                        </View>
                    )
            } */}
        </Modal>
    );
}