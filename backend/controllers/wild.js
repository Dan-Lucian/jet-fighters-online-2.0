const path = require('path');
const { Router } = require('express');

const routerWild = Router();

routerWild.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = routerWild;
