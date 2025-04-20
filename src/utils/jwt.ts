import jwt from 'jsonwebtoken';
import { ValidationError } from '../errors/CustomError';


export const generateToken = (userId: string): string => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRATION = '1h';

    if (!JWT_SECRET) {

        throw new Error('JWT secret is not defined');
    }

    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

}

export const verifyToken = (token: string): string | jwt.JwtPayload => {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        throw new ValidationError('JWT secret is not defined');
    }

    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new ValidationError('Invalid token');
    }
}
