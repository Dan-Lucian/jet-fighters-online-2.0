export const config =
  process.env.NODE_ENV === 'production'
    ? {
        protocol: 'wss',
        hostname: 'jetfightersonline.org',
        port: '',
        routeWs: '/websocket',
      }
    : {
        protocol: 'ws',
        hostname: 'localhost',
        port: ':3001',
        routeWs: '/websocket',
      };
