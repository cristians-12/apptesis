import React, { useEffect, useRef, useState, useCallback } from 'react';

const useWebSocket = (sendLocalNotification) => {
    const ws = useRef<WebSocket | null>(null);
    const [message, setMessage] = useState();

    const connectWebSocket = useCallback(() => {
        if (ws.current) {
            ws.current.close(); // Cerrar cualquier conexión existente
        }

        ws.current = new WebSocket('ws://192.168.4.1/');

        ws.current.onopen = () => {
            // console.log('WebSocket connected');
            sendLocalNotification('Conexion con el panel exitosa.')
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
        };
    }, [sendLocalNotification]);

    const disconnectWebSocket = useCallback(() => {
        if (ws.current) {
            ws.current.close();
            ws.current = null;
        }
    }, []);

    return { message, connectWebSocket, disconnectWebSocket };
};

export default useWebSocket;