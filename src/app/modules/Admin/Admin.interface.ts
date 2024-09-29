import { Types } from 'mongoose';

// export type TAdmin = {
//   email: string;
//   password: string;
//   title: string;
//   body: string;
//   type: string;
// };

export type TAdmin = {
  user: Types.ObjectId;
  name: string;
  title: string;
  body: string;
  type: string;
  email: string;
  contactNo: string;
  isDeleted: boolean;
};
