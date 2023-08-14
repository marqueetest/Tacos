import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export interface Transaction extends Document {
  _id: string;
  sender: any;
  receiver: any;
  tacos: number;
  tacosValue: number;
  amount: number;
  type: string;
  isDeleted: boolean;
  createdAt: Date;
}

const transactionSchema = new mongoose.Schema<Transaction>({
    sender      :{ type: ObjectId, ref:"users", default: null },
    receiver    :{ type: ObjectId, ref:"users", default: null },
    tacos       : { type: Number, default: 0 },
    tacosValue  : { type: Number, default: 0 },
    amount      : { type: Number, default: 0 },
    type        : { type: String, default: "" },
    isDeleted   : { type: Boolean, default: false },
    createdAt   : { type: Date, default: Date.now }
});

export const TransactionModel = mongoose.model<Transaction>('transactions', transactionSchema);