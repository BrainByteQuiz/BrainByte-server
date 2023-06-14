import express from 'express';
import cors from 'cors';
import { env } from 'process';
import type { ApiResponse } from './controllers/types';
import registerUserController from './controllers/user/register';
import loginUserController from './controllers/user/login';
import deleteUserController from './controllers/user/delete';
import readUserController from './controllers/user/read';

const app = express();
const port = env.PORT ?? 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/register', registerUserController);
app.post('/login', loginUserController);
app.get('/users/:id', readUserController);
app.delete('/users/:id', deleteUserController);

app.use((_req, res) => {
  const response: ApiResponse<{}> = {
    status: 'failure',
    data: {},
    error: 'No matching endpoint was found.',
  };

  return res.status(404).send(response);
});

if (env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(
      `[${new Date().toISOString()}] RESTful API for iteration 06 is listening on port ${port}`,
    );
  });
}

export default app;
