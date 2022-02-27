import { Router } from 'express';

const routerIndex = Router();

routerIndex.get('*', (req, res) => {
  res.redirect('/');
});

export default routerIndex;
