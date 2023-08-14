// passport.config.ts
import * as passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/users';
import { Request } from 'express';

interface JwtPayload {
  userId: string;
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT || 'qwertyuisopasdfghjklzxcvbnm',
};

passport.use(
  new JwtStrategy(options, async (jwtPayload: JwtPayload, done) => {
    try {
      const user = await UserModel.findById(jwtPayload.userId);

      if (user) {
        return done(null, user!);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
