import React from 'react';
import { useWebSocketContext } from '../context/WebsocketProvider';

export default function useServo() {

    const { sendMessage } = useWebSocketContext();

    const detenerServo = () => {
        sendMessage({
            detainServo: true
        })
    }

    return (
        {
            detenerServo
        }
    );
}