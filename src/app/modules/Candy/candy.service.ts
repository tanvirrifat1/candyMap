// const candyGiverInsert = async (data: TCandyGiver) => {
//   const result = await CandyGiver.create(data);
//   return result;
// };

import { CandyGiver } from './candy.model';

// const loginCandyGiver = async (
//   email: string,
//   password: string,
// ): Promise<string | null> => {
//   try {
//     const candyGiver = await CandyGiver.findOne({ email });
//     if (candyGiver && (await bcrypt.compare(password, candyGiver.password))) {
//       // Generate JWT token
//       const token = jwt.sign(
//         { id: candyGiver._id },
//         process.env.DEFAULT_PASSWORD || 'secret',
//         { expiresIn: '1h' },
//       );
//       return token;
//     }
//     return null;
//   } catch (error) {
//     console.error('Error logging in candy giver:', error);
//     throw new Error('Failed to log in candy giver');
//   }
// };

const getAllCandy = async () => {
  const result = await CandyGiver.find();
  return result;
};

export const CandyService = {
  getAllCandy,
};
