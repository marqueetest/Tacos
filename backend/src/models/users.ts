import mongoose, { Document } from 'mongoose';

import * as bcrypt from 'bcryptjs';

export interface User extends Document {
  _id: string;
  username: string;
  password: string;
  tacos: number;
  wallet: number;
  isDeleted: boolean;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<User>({
  username    : { type: String, default : "" },
  password    : { type: String, default : "" },
  tacos       : { type: Number, default: 0 },
  wallet      : { type: Number, default: 50 },
  isDeleted   : { type: Boolean, default: false },
  createdAt   : { type: Date, default: Date.now }
});

export const UserModel = mongoose.model<User>('users', userSchema);