import { model, Schema } from 'mongoose';
import { TCandyGiver } from './candy.interface';

const candyGiverSchema: Schema = new Schema<TCandyGiver>(
  {
    shopName: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'User',
    },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    isDeleted: { type: Boolean, default: false },
    createParent: { type: Boolean, default: false },
    currentLon: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const CandyGiver = model<TCandyGiver>('CandyGiver', candyGiverSchema);
