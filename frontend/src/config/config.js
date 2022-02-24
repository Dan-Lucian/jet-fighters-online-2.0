export const config =
  process.env.NODE_ENV === 'production'
    ? {
        protocol: 'wss',
        hostname: 'fierce-harbor-11463.herokuapp.com',
        port: '',
        routeWs: '/websocket',
      }
    : {
        protocol: 'ws',
        hostname: 'localhost',
        port: ':3001',
        routeWs: '/websocket',
      };
