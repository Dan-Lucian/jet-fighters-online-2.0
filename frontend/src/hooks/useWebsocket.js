import { useRef, useEffect } from 'react';

const useWebsocket = (link) => {
  const ws = useRef();

  useEffect(() => {
    ws.current = new WebSocket(link);
    ws.current.onopen = () => console.log('ws opened');
    ws.current.onmessage = () => console.log('message received');
    ws.current.onclose = () => console.log('ws closed');

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, [link]);
};

export { useWebsocket };
