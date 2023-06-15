import type { Request, Response } from 'express';
import deleteUser from '../../repositories/user/delete';
import type { ApiResponse } from '../types';
import { z } from 'zod';

const deleteSchema = z.object({
  id: z.string().uuid(),
});

const deleteUserController = async (req: Request, res: Response) => {
  let validatedData;
  try {
    validatedData = deleteSchema.parse(req.params);
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
    const userResult = await deleteUser(validatedData);
    if (userResult.isOk) {
      return res.status(200).send({ status: 'success', data: userResult.unwrap(), message: 'Delete successful' });
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
}


export default deleteUserController;
