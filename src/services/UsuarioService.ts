import { Repository } from "typeorm";
import { Usuario } from "../models/Usuario";
import { AppDataSource } from "../database/dataSource";
import { CreateUsuarioDto } from "../types/UsuarioDTO";
import { UsuarioValidations } from "../validations/UsuarioValidations";
import * as bcrypt from 'bcrypt';

import { ValidationError, ConflictError, InternalServerError } from "../errors/CustomError";

class UsuarioService {
    private usuarioRepository: Repository<Usuario>;
    private usuarioValidations:  UsuarioValidations;

    constructor() {
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
        this.usuarioValidations = new UsuarioValidations();
    }

    async create(dto: CreateUsuarioDto ): Promise<Usuario> {
        try {

            this.usuarioValidations.validateDto(dto);

            // Verifica se o usuário já existe
            const existingUser = await this.usuarioRepository.findOne({ where: { email: dto.email } });

            if (existingUser) throw new ConflictError("Usuário já cadastrado com este email!");

              const passwordHash = await bcrypt.hash(dto.password, 10);
              const usuario = new Usuario();

            // Cria o usuário com os dados fornecidos
              usuario.createUsuario(dto.email, passwordHash, dto.name, dto.bio, new Date(dto.dataNasc), dto.genero)

              console.log("")
              console.log(dto)
              console.log("Usuario: ", usuario)
              console.log("")

              const savedUsuario = await this.usuarioRepository.save(usuario)
              return savedUsuario;
        } catch (error) {

            console.log(error);

            if ( error instanceof ValidationError || error instanceof ConflictError) {
                throw error;
            }

            throw new InternalServerError("Erro interno ao criar usuário");
        }
    }

}

export default UsuarioService;
