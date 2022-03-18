import { useState, useRef, useEffect, useCallback } from 'react';

const useWebsocket = (link) => {
  const ws = useRef();
  const [readyState, setReadyState] = useState('CONNECTING');
  const [message, setMessage] = useState({});
  const [stateForReconnect, setStateForReconnect] = useState(false);

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
      setMessage(messageJson);
    };

    return () => {
      ws.current.close();
    };
  }, [link, stateForReconnect]);

  const reconnect = useCallback((obj) => {
    setStateForReconnect((prev) => !prev);
  }, []);

  const sendMessage = useCallback((obj) => {
    ws.current.send(JSON.stringify(obj));
  }, []);

  const resetMessage = useCallback(() => {
    setMessage({});
  }, []);

  return { readyState, message, sendMessage, resetMessage, reconnect };
};

export default useWebsocket;
