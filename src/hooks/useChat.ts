import { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from './types/chat';
import { toast } from 'sonner';

export const useChat = (username: string, avatarSeed?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  // Cargar historial real de mensajes
  useEffect(() => {
    fetch('http://localhost:3001/messages')
      .then(res => res.json())
      .then((data) => {
        const msgs = data.map((msg: any) => ({
          id: msg.id.toString(),
          username: msg.username,
          content: msg.content,
          timestamp: new Date(msg.createdAt),
          avatarSeed: msg.avatarSeed,
        }));
        setMessages(msgs);
      })
      .catch(() => {
        toast.error('No se pudo cargar el historial de mensajes');
      });
  }, []);

  // WebSocket conexión
  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3001');
    ws.current.onopen = () => {
      setIsConnected(true);
      toast.success(`¡Bienvenido ${username}! Te has conectado al chat`, { duration: 3000 });
    };
    ws.current.onclose = () => {
      setIsConnected(false);
      toast.error('Desconectado del chat');
    };
    ws.current.onerror = () => {
      setIsConnected(false);
      toast.error('Error de conexión con el chat');
    };
    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setMessages(prev => [
          ...prev,
          {
            id: msg.id.toString(),
            username: msg.username,
            content: msg.content,
            timestamp: new Date(msg.createdAt),
            avatarSeed: msg.avatarSeed,
          },
        ]);
      } catch {}
    };
    return () => {
      ws.current?.close();
    };
  }, [username, avatarSeed]);

  // Enviar mensaje por WebSocket
  const sendMessage = useCallback((content: string) => {
    if (!isConnected || !ws.current || ws.current.readyState !== WebSocket.OPEN) {
      toast.error('No estás conectado al chat. Intentando reconectar...');
      return;
    }
    ws.current.send(JSON.stringify({ username, content, avatarSeed }));
  }, [username, isConnected, avatarSeed]);

  return {
    messages,
    sendMessage,
    isConnected,
  };
};