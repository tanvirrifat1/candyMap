import { model, Schema } from 'mongoose';
import { TParent } from './Parent.interface';

const ParentSchema = new Schema<TParent>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Parent = model<TParent>('Parent', ParentSchema);
