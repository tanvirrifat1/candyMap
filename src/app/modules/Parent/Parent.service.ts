import { sendEmail } from '../../ulitis/sendMail';
import { TParent } from './Parent.interface';
import { Parent } from './Parent.model';
import bcrypt from 'bcrypt';

const createParentIntoDb = async (payload: TParent) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const parentData = {
    ...payload,
    password: hashedPassword,
  };

  const result = await Parent.create(parentData);

  await sendEmail(
    payload.email,
    'Parent Created Successful',
    `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
     name: ${result.name} email: ${result.email}
   </div>
`,
  );
  return result;
};

export const ParentService = {
  createParentIntoDb,
};
