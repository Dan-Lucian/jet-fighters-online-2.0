import { useState, useRef, useEffect, useCallback } from 'react';

const useWebsocket = (link) => {
  const ws = useRef();
  const [readyState, setReadyState] = useState('CONNECTING');
  const [message, setMessage] = useState('');

  useEffect(() => {
    ws.current = new WebSocket(link);
    ws.current.onopen = () => {
      console.log('ws opened');
      setReadyState('OPEN');
    };
    ws.current.onmessage = (messageReceived) => {
      console.log('message received');
      const messageJson = JSON.parse(messageReceived.data);
      setMessage(messageJson);
    };
    ws.current.onclose = () => {
      console.log('ws closed');
      setReadyState('CLOSED');
    };

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, [link]);

  const sendMessage = useCallback((obj) => {
    ws.current.send(JSON.stringify(obj));
  }, []);

  return { readyState, message, sendMessage };
};

export { useWebsocket };
