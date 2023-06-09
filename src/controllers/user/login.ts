import type { Request, Response } from 'express';
import type { ApiResponse } from '../types';
import login from '../../repositories/user/login';

const loginUser = async (req: Request, res: Response) => {
    try {
      if (!req.params['email'] || !req.params['password'] ) {
        throw new Error();
      }
      const userResult = await login({ email: req.params['email'], password: req.params['password'] });
      if (userResult.isOk) {
        return res.status(200).send({ status: 'success', data: userResult.unwrap(), message: '' });
      }
      console.log(userResult.error);
      throw userResult.error;
    } catch (error) {
      const response: ApiResponse<{}> = {
        status: 'failure',
        data: {},
        error: (error as Error).message,
      };
      return res.status(404).send(response);
    }
};

export default login;
