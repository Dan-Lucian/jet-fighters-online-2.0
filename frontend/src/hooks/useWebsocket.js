import { useState, useRef, useEffect, useCallback } from 'react';

const useWebsocket = (link) => {
  const ws = useRef();
  const [readyState, setReadyState] = useState('CONNECTING');
  const [message, setMessage] = useState('');

  useEffect(() => {
    ws.current = new WebSocket(link);

    // connection open
    ws.current.onopen = () => {
      console.log('ws opened');
      setReadyState('OPEN');
    };

    // connection close
    ws.current.onclose = () => {
      console.log('ws closed');
      setReadyState('CLOSED');
    };

    // message received
    ws.current.onmessage = (messageReceived) => {
      const messageJson = JSON.parse(messageReceived.data);
      console.log('message received', messageJson);
      setMessage(messageJson);
    };

    return () => {
      ws.current.close();
    };
  }, [link]);

  const sendMessage = useCallback((obj) => {
    ws.current.send(JSON.stringify(obj));
  }, []);

  return { readyState, message, sendMessage };
};

export { useWebsocket };
