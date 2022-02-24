export const config =
  process.env.NODE_ENV === 'production'
    ? {
        hostname: 'fierce-harbor-11463.herokuapp.com',
        port: '',
        routeWs: '/websocket',
      }
    : {
        hostname: 'localhost',
        port: ':3001',
        routeWs: '/websocket',
      };
