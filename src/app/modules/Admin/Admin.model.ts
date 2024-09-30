import { model, Schema } from 'mongoose';
import { TAdmin } from './Admin.interface';

const adminSchema: Schema = new Schema<TAdmin>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'User',
    },
    body: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = model<TAdmin>('admin', adminSchema);
