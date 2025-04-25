import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { userRepository } from "../repositories/repositories.js";
import { userDTO } from "../dto/UserDTO.js";
import cookieExtractor from "../utils/cookieExtractor.js";

dotenv.config();

export default function configurePassport(passport) {
    const getJwtStrategyOptions = (extractor) => ({
        jwtFromRequest: extractor,
        secretOrKey: process.env.JWT_SECRET,
    });

    passport.use(
        "jwt",
        new JwtStrategy(
            getJwtStrategyOptions(ExtractJwt.fromAuthHeaderAsBearerToken()),
            async (jwt_payload, done) => {
                try {
                    const user = await userRepository.getById(jwt_payload.id);
                    if (!user) {
                        return done(null, false, { message: "User not found" });
                    }
                    return done(null, userDTO(user));
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );

    passport.use(
        "current",
        new JwtStrategy(
            getJwtStrategyOptions(cookieExtractor),
            async (jwt_payload, done) => {
                try {
                    const user = await userRepository.getById(jwt_payload.id);
                    if (!user) {
                        return done(null, false, { message: "User not found" });
                    }
                    return done(null, userDTO(user));
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );
}
