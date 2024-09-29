import { model, Schema } from 'mongoose';
import { TAdmin } from './Admin.interface';

const adminSchema: Schema = new Schema<TAdmin>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  },
);

export const Admin = model<TAdmin>('admin', adminSchema);
