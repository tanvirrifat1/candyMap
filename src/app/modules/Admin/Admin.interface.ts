import { Types } from 'mongoose';

export type TAdmin = {
  user: Types.ObjectId;
  name: string;
  title: string;
  body: string;
  type: string;
  email: string;
  isDeleted: boolean;
};
