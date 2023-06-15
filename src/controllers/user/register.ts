import type { Request, Response } from 'express';
import type { ApiResponse } from '../types';
import register from '../../repositories/user/register';
import { z } from 'zod';


const userSchema = z.object({
  username: z.string().min(4).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

const registerUserController = async (req: Request, res: Response) => {
  let validatedData;
  try {
    validatedData = userSchema.parse(req.body);
  }
  catch (error) {
    const response: ApiResponse<{}> = {
      status: 'failure',
      data: {},
      error: (error as Error).message,
    };
    return res.status(400).send(response);
  }
  try {
    const userResult = await register(validatedData);
    if (userResult.isOk) {
      return res.status(200).send({ status: 'success', data: userResult.unwrap(), message: 'Registering successful'});
    }
    console.log(userResult.error);
    throw userResult.error;
  } catch (error) {
    const response: ApiResponse<{}> = {
      status: 'failure',
      data: {},
      error: (error as Error).message,
    };
    return res.status(500).send(response);
  }
};

export default registerUserController;
