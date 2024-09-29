import { model, Schema } from 'mongoose';
import { TCandyGiver } from './candy.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const candyGiverSchema: Schema = new Schema<TCandyGiver>(
  {
    shopName: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'User',
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    isDeleted: { type: Boolean, default: false },
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

candyGiverSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bcrypt_Salt_rounds),
  );

  next();
});

export const CandyGiver = model<TCandyGiver>('CandyGiver', candyGiverSchema);
