import { Request } from 'express';
import { User } from '../user/models';

export interface ExpressRequestInterface extends Request {
  user?: User;
}
