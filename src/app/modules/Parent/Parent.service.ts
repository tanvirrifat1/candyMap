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
        <p>Dear ${result.name},</p>
        <p>Your parent account has been successfully created!</p>
        <p><strong>Email:</strong> ${result.email}</p>
        <p><strong>Login Link:</strong> <a href="https://yourapp.com/login">Login Here</a></p>
        <p>Thank you for joining us!</p>
      </div>
    `,
  );
  return result;
};
//  <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
//      name: ${result.name} email: ${result.email}
//    </div>
export const ParentService = {
  createParentIntoDb,
};
