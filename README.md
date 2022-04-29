# [Jet Fighters Online](https://www.jetfightersonline.org/)

## Table of contents

- [Demo](#demo)
- [Description](#description)
- [Technologies used](#technologies-used)
- [Auth](#auth)
- [What I've learned](#what-i-have-learned)
- [Upcoming features](#upcoming-features)

## Demo

- [See the app](https://www.jetfightersonline.org/)

## Description

Jet Fighters Online is a web platform where you can play a real-time multiplayer game based on the “Jet Fighter” 1975 Atari game featuring 2d aircraft combat.

## Technologies used

**Frontend**

- **Language:** JavaScript
- **Base library:** [React](https://reactjs.org/) (Create React App)
- **Styling:** with SCSS modules
- **Routing:** with [React Router](https://reactrouter.com/)
- **Props validation:** with [prop-types](https://www.npmjs.com/package/prop-types)
- **Http requests:** with [axios](https://www.npmjs.com/package/axios)
- **Charts:** with [chart.js](https://www.chartjs.org/)
- **Code style:** [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/), lint rules borrowed from [wesbos](https://github.com/wesbos/eslint-config-wesbos)

**Backend**

- **Server base:** Node.js + [express](https://expressjs.com/)
- **Database:** Cloud MongoDB [Atlas](https://www.mongodb.com/atlas/database) + [mongoose](https://mongoosejs.com/)
- **Authorization and authentication:** built from scratch using [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) and refresh tokens
- **Emails:** with [nodemailer](https://nodemailer.com/about/) (disabled during tests)
- **Validation**: with [Joi](https://github.com/sideway/joi)
- **Environment variables:** with [dotenv](https://github.com/motdotla/dotenv#readme) and [cross-env](https://github.com/kentcdodds/cross-env)
- **Testing:** with [jest](https://jestjs.io/) and [supertest](https://github.com/visionmedia/supertest)
- **Error handling:** centralized to a final middleware
- **Cross-Origin Resource-Sharing:** enabled by [cors](https://github.com/expressjs/cors)
- **Code style:** [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/), lint rules borrowed from [wesbos](https://github.com/wesbos/eslint-config-wesbos)

## Auth

Authentication and authorization are built on jwts (json web tokens), refresh tokens and admin/user roles.

Upon successful login the server sends one http only cookie which is used by the browser to get the jwt (json web token) from the `/refresh-token` route.

The received jwt expires in 15 minutes which means that the frontend will request a new jwt every 14 minutes or every time the user visits the website. The http only cookie expires in a week, but every time a new jwt is received, a new refresh token is received as well. This means that the user will be logged off only if he hasn't opened the app for a whole week.

The refresh token is revoked when a user logs off or if an admin manually revokes it.

Authorization is done by sending the jwt token inside the "Authorization" request header. The backend verifies the digital signature and if it is ok, and the role permits it, then the requested data is sent to the frontend.

On the backend, the bulk of authorization logic is done by the `/middleware/authorize.js` middleware, which can be attached to any route.

## What I have learned

- How to style React applications with SCSS modules.
- How to implement websockets within [React](https://reactjs.org/).
- How to implement websockets within [Express](https://expressjs.com/).
- How to work with canvas within [React](https://reactjs.org/).
- How to make charts using [chart.js](https://www.chartjs.org/).
- How to implement an authorization/authentication system based on json web tokens + refresh tokens.
- How to self-host google fonts.

## Upcoming features

- [x] <del>Possibility to search users by name and view their profile.</del>
- [x] <del>Notification system.</del>
- [ ] Add the possibility to add and challenge friends.
- [ ] Add different unique powers to each jet (ex: multi shot, speed boost, invisiblity, short time immunity).
