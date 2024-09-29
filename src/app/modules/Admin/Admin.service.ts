import { Admin } from './Admin.model';

const getAllAdmin = async () => {
  const result = await Admin.find();
  return result;
};

export const AdminService = {
  getAllAdmin,
};
