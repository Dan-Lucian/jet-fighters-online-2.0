// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny'));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

// handler of reqs with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  next(err);
};

app.use(errorHandler);

// eslint-disable-next-line no-undef
let { PORT } = process.env;
if (!PORT) {
  PORT = 3001;
}
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
