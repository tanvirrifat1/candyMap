import { Types } from 'mongoose';

export type TCandyGiver = {
  shopName: string;
  user: Types.ObjectId;
  email: string;
  password: string;
  address?: string;
  role: string;
  lat?: number;
  lng?: number;
  isDeleted?: boolean;
  currentLon?: {
    type: 'Point';
    coordinates: [number, number];
  };
};
