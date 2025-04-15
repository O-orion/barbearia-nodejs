import { Logger, Repository } from "typeorm";
import { Usuario } from "../models/Usuario";
import { AppDataSource } from "../database/dataSource";
import { Request, Response } from 'express';

class UsuarioController {

    private usuarioRepository: Repository<Usuario>;


    constructor() {
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
    }

    // Cadastro de Usuário
    async create(req: Request, res: Response): Promise<void> {

        try {
            const { email, password, name, bio, dataNasc, genero } = req.body;

            if (!email || !password || !name || !bio || !dataNasc || !genero) {
                res.status(400).json({ error: 'Todos os campo são obrigatórios' })
                return;
            }

            const usuario = new Usuario();
            usuario.createUsuario(email, password, name,bio, dataNasc);

        } catch (error) {

        }

    }

}

export default new UsuarioController();
