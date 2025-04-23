import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { UserRepository } from "../repositories/repositories.js";

dotenv.config();

export default function configurePassport(passport) {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            try {
                const user = await UserRepository.getById(jwt_payload.id);
                if (user) return done(null, user);
                return done(null, false);
            } catch (error) {
                return done(error, false);
            }
        })
    );
}
