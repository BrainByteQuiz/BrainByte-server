import type { Request, Response } from 'express';
import type { ApiResponse } from '../types';
import login from '../../repositories/user/login';
import { z } from 'zod';


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const loginUserController = async (req: Request, res: Response) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const userResult = await login(validatedData);
      if (userResult.isOk) {
        return res.status(200).send({ status: 'success', data: userResult.unwrap(), message: 'Login successful' });
      }
      console.log(userResult.error);
      throw userResult.error;
    } catch (error) {
      const response: ApiResponse<{}> = {
        status: 'failure',
        data: {},
        error: (error as Error).message,
      };
      return res.status(400).send(response);
    }
};

export default loginUserController;
