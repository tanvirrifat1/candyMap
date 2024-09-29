export type TUser = {
  password: string;
  email: string;
  needsPasswordChange?: boolean;
  role: 'admin' | 'candyGiver';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
