import { Types } from 'mongoose';

export type TCandyGiver = {
  shopName: string;
  user: Types.ObjectId;
  email: string;
  address?: string;
  lat?: number;
  lng?: number;
  isDeleted?: boolean;
  currentLon?: {
    type: 'Point';
    coordinates: [number, number];
  };
};
