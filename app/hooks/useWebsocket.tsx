import React, { useEffect, useRef, useState, useCallback } from 'react';
import Toast from 'react-native-toast-message';

const useWebSocket = ({ sendLocalNotification }: { sendLocalNotification: (msg: string) => void }) => {
    const ws = useRef<WebSocket | null>(null);
    const [message, setMessage] = useState();

    const sendMessage = useCallback((obj: any) => {
        console.log(JSON.stringify(obj))
        if (ws.current) {
            Toast.show(
                {
                    type: 'info',
                    text1: 'Enviando',
                    text2: JSON.stringify(obj)
                }
            )
            ws.current.send(JSON.stringify(obj));
        }
    }, []);

    const connectWebSocket = useCallback(() => {
        if (ws.current) {
            ws.current.close(); // Cerrar cualquier conexión existente
        }

        ws.current = new WebSocket('ws://192.168.4.1/');

        Toast.show(
            {
                type: 'info',
                text1: 'Conectandose al panel..',
                text2: 'Espera unos segundos por favor. ⌚'
            }
        )

        ws.current.onopen = () => {
            // console.log('WebSocket connected');
            Toast.show(
                {
                    type: 'success',
                    text1: 'Te conectaste al panel principal',
                    text2: 'Ya estaras recibiendo las notificaciones del panel! 😊'
                }
            )
        };

        ws.current.onmessage = (event) => {
            const receivedMessage = event.data;
            setMessage(receivedMessage);
            sendLocalNotification(receivedMessage);
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            Toast.show(
                {
                    type: 'error',
                    text1: 'Error al conectarse al panel.',
                    text2: 'Conectate a la red generada por el panel! 😁'
                }
            )
        };
    }, [sendLocalNotification]);

    const disconnectWebSocket = useCallback(() => {
        if (ws.current) {
            ws.current.close();
            ws.current = null;
        }
    }, []);

    return { message, connectWebSocket, disconnectWebSocket, sendMessage };
};

export default useWebSocket;