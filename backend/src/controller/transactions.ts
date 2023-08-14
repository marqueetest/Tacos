import { Request, Response } from 'express';
import { TransactionModel, Transaction } from '../models/transactions';
import { UserModel } from '../models/users';
import { TransactionTypes } from '../utils/enums';


export const buy = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const tacos : number = process.env.TOCOS_PRICE || 0 as any;
    let userWallet = 0;
    let userId = null;

    if(req.user instanceof UserModel){
      userWallet = req.user.wallet;
      userId = req.user._id;
    }

    if(!userId) return res.status(400).json({ error: 'Something went wrong.' });

    if(!payload || payload.tacos == undefined) return res.status(400).json({ error: 'Tacos value is required.' });

    if(payload.tacos <= 0) return res.status(400).json({ error: 'Tacos value should be greater than 0.' });

    const amount = parseFloat(payload.tacos) * tacos;

    const remainAmount = userWallet - amount;

    if(remainAmount < 0) return res.status(400).json({ error: 'Insufficient balance in your wallet.' });

    const newTansaction: Transaction = new TransactionModel({
      receiver: userId,
      tacos: payload.tacos,
      tacosValue : tacos,
      type : TransactionTypes.BUY,
      amount : amount
    });

    await newTansaction.save();

    var data = await UserModel.findOneAndUpdate({ _id: userId }, { $inc: { tacos : payload.tacos, wallet : -amount } }, { new : true } );
    

    return res.status(200).json({ msg : 'Tacos buy successfully.', data : data });
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ error: err.message });
  }
};

export const sell = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    let userTacos = 0;
    let userId = null;
    const tacos : number = process.env.TOCOS_PRICE || 0 as any;

    if(req.user instanceof UserModel){
      userTacos = req.user.tacos;
      userId = req.user._id;
    }

    if(!userId) return res.status(400).json({ error: 'Something went wrong.' });

    if(!payload || payload.tacos == undefined) return res.status(400).json({ error: 'Tacos value is required.' });

    if(payload.tacos <= 0) return res.status(400).json({ error: 'Tacos value should be greater than 0.' });

    if(payload.tacos > userTacos) return res.status(400).json({ error: 'You don\'t have sufficient tacos for sell.' });

    const amount = parseFloat(payload.tacos) * tacos;

    const newTansaction: Transaction = new TransactionModel({
      sender: userId,
      tacos: payload.tacos,
      tacosValue : tacos,
      type : TransactionTypes.SELL,
      amount : amount
    });

    await newTansaction.save();

    var data = await UserModel.findOneAndUpdate({ _id: userId }, { $inc: { tacos : -payload.tacos, wallet : amount } }, { new : true } );

    return res.status(200).json( { msg : 'Tacos sold successfully.', data : data } );
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ error: err.message });
  }
};

export const transfer = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const tacos : number = process.env.TOCOS_PRICE || 0 as any;

    if(!payload || payload.sender == undefined || payload.sender == "") return res.status(400).json({ error: 'Sender Id is required.' });

    if(!payload || payload.receiver == undefined || payload.receiver == "") return res.status(400).json({ error: 'Receiver Id is required.' });

    if(!payload || payload.tacos == undefined || payload.tacos <= 0) return res.status(400).json({ error: 'Tacos value should be greater than 0.' });

    if(payload.sender == payload.receiver) return res.status(400).json({ error: 'Sender and Receiver id should be different.' });

    const sender = await UserModel.findById(payload.sender);
    if(!sender) return res.status(400).json({ error: 'Sender Id is invalid.' });

    const receiver = await UserModel.findById(payload.receiver);
    if(!receiver) return res.status(400).json({ error: 'Receiver Id is invalid.' });

    if(payload.tacos > sender.tacos) return res.status(400).json({ error: 'Insufficient tacos for transferr.' });

    const newTansaction: Transaction = new TransactionModel({
      sender: sender._id,
      receiver: receiver._id,
      tacos: payload.tacos,
      tacosValue : tacos,
      type : TransactionTypes.TRANSFERR
    });

    await newTansaction.save();

    sender.tacos -= payload.tacos;

    await sender.save();

    receiver.tacos += payload.tacos;

    await receiver.save();

    return res.status(200).json( { msg : `Tacos transferred to ${receiver.username} successfully.`, data : sender } );
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ error: err.message });
  }
};