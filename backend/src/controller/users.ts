import { Request, Response } from 'express';
import { UserModel, User } from '../models/users';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';


const createToken = (user: User) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT || 'qwertyuisopasdfghjklzxcvbnm', { expiresIn: '24h' });
  return token;
};

/**
 * User login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const login = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const _query: { isDeleted: boolean; username?: string } = { isDeleted: false };

    if (payload.username) _query.username = payload.username.toLowerCase();

    let user = await UserModel.findOne(_query);

    if (!user) return res.status(400).json({ error: 'Invalid username and password.' });
    
    const isPasswordValid = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid username and password.' });

    // Create a JWT token for the user
    const token = createToken(user);

    return res.status(200).json({ msg: "Logged in successfully", data:user, token: token });
  }
  catch (error) { 
    const err = error as Error;
    return res.status(400).json({ error: err.message }); 
  }
}


/**
 * User Logout
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const logout = async (req: Request, res: Response) => {
  try {
    const payload = req.user;

    return res.status(200).json(payload);
  }
  catch (error) { 
    const err = error as Error;
    return res.status(400).json({ error: err.message }); 
  }
}


/**
 * Get User By Id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    if (req.user instanceof UserModel) {
      id = req.user._id;
    }
    
    const newUser = await UserModel.findById(id).lean();

    if(!newUser) return res.status(400).json({ error: 'User not found in the system.' });

    return res.status(200).json(newUser);
  } catch (error) { 
    const err = error as Error;
    return res.status(400).json({ error: err.message }); 
  }
};

/**
 * Create User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const _query: { isDeleted: boolean; username?: string } = { isDeleted: false };

    if(username) _query.username = username.toLowerCase();


    let user = await UserModel.findOne(_query);

    if (user) return res.status(400).json({ error: 'User already exist with same username.' });
    
    const newUser: User = new UserModel({
      username: username.toLowerCase(),
      password: await bcrypt.hash(password, 10)
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) { 
    const err = error as Error;
    return res.status(400).json({ error: err.message }); 
  }
};