import { QueryFailedError, Repository } from "typeorm";
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
              usuario.createUsuario(dto.email, passwordHash, dto.googleId ? dto.googleId : "",  dto.name, dto.bio, new Date(dto.dataNasc), dto.genero)

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

    async getAll(): Promise<Usuario[]> {
        try {
            const usuarios = await this.usuarioRepository.find({
                select: ['id', 'email', 'name', 'bio', 'dataNasc', 'genero', 'profilePicture', 'createdAt', 'updateAt'],
                relations: ['barberias', 'avaliacoes']
            });
            return usuarios;
        } catch (error) {

            console.log(error);

            if (error instanceof QueryFailedError) {
                throw new ValidationError("Erro na consulta ao banco de dados");
            }

            throw new InternalServerError("Erro interno ao buscar usuários");
        }
    }

    async getById(id: string): Promise<Usuario | null> {
        try {

            const usuario = await this.usuarioRepository.findOne({
                where: { id },
                select: ['id', 'email', 'name', 'bio', 'dataNasc', 'genero', 'profilePicture','createdAt', 'updateAt'],
                relations: ['barberias','avaliacoes',]
            });
            return usuario;

        } catch (error) {
            console.log(error);

            if (error instanceof QueryFailedError) {
                throw new ValidationError("Erro na consulta ao banco de dados");
            }

            throw new InternalServerError("Erro interno ao buscar usuário");
        }
    }

    async update(id: string, dto: CreateUsuarioDto): Promise<Usuario | null> {
        try {

            this.usuarioValidations.validateDto(dto, true);

            const usuario = await this.usuarioRepository.findOne({ where: { id },
                 select:['id', 'email', 'name', 'bio', 'dataNasc', 'genero', 'createdAt', 'updateAt'] });

            if(!usuario) throw new ValidationError("Usuário não encontrado!");

            this.usuarioRepository.merge(usuario, dto);
            const updatedUsuario = await this.usuarioRepository.save(usuario);
            return updatedUsuario;

        } catch (error) {
            console.log(error);

            if (error instanceof ValidationError) {
                throw error;
            }

            if (error instanceof QueryFailedError) {
                throw new ValidationError("Erro na consulta ao banco de dados");
            }

            throw new InternalServerError("Erro interno ao atualizar usuário");
        }

        return null;
    }

    async delete(id: string): Promise<void> {

        try {

            const usuario = await this.usuarioRepository.findOne({ where: { id }});

            if(!usuario) throw new ValidationError("Usuário não encontrado!");

            await this.usuarioRepository.delete({  id })
            return;

        } catch (error) {
            console.log(error);

            if (error instanceof QueryFailedError) {
                throw new ValidationError("Erro na consulta ao banco de dados");
            }

            throw new InternalServerError("Erro interno ao deletar usuário");

        }

    }

}

export default UsuarioService;
