import { Repository } from "typeorm";
import { Usuario } from "../models/Usuario";
import { AppDataSource } from "../database/dataSource";
import bcrypt from 'bcrypt';
import { ValidationError } from "../errors/CustomError";
import { generateToken } from "../utils/jwt";

export class AuthService {
    private userRepository: Repository<Usuario>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(Usuario);
    }

    async login(email: string, password: string): Promise<{ user: Usuario; token: string }> {

        try {
            const user = await this.userRepository.findOne({ where: { email } });

            if (!user || !password) {
                throw new ValidationError("Credenciais invalida");
            }

            const isPasswordValid = user.password ? await bcrypt.compare(password, user.password) : false;

            if (!isPasswordValid) {
                throw new ValidationError("Credenciais invalida");
            }

            const token = generateToken(user.id);
            return { user, token };

        } catch (error) {
            console.log(error);
            throw new ValidationError("Erro ao autenticar usuario");
        }


    }

    async googleLogin(googleId: string, email: string, name: string): Promise<  { user: Usuario; token: string }> {
        try {
            let user = await this.userRepository.findOne({ where: { googleId } });

            if (user) {
                user.googleId = googleId;
                await this.userRepository.save(user);
            } else {
                user = this.userRepository.create({ googleId, email, name });
                await this.userRepository.save(user);
            }

            const token = generateToken(user.id);
            return { user, token };

        } catch (error) {
            console.log(error);
            throw new ValidationError("Erro ao autenticar com o Google");
        }
    }

}
