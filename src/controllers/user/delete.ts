import type { Request, Response } from 'express';
import deleteUser from '../../repositories/user/delete';
import type { ApiResponse } from '../types';

const deleteUserC = async (req: Request, res: Response) => {
  try {
    if (!req.params['id']) {
      throw new Error();
    }
    const userResult = await deleteUser({ id: req.params['id'] });
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
}


export default deleteUserC;
