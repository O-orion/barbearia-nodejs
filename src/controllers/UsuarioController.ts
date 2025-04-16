import { Request, Response } from 'express';
import UsuarioService from "../services/UsuarioService";

class UsuarioController {

    private readonly usuarioService: UsuarioService;

    constructor() {
       this.usuarioService = new UsuarioService();
    }

    // Cadastro de Usuário
    async create(req: Request, res: Response): Promise<void> {
        const dto = req.body;
        const usuario = await this.usuarioService.create(dto);
        res.status(201).json({
            status: 'success',
            data: usuario,
            timesTamp: new Date().toISOString(),
            message: 'Usuário cadastrado com sucesso!'
        });
    }

    async getAll(req: Request, res: Response): Promise<void> {

        const usuarios = await this.usuarioService.getAll();
        res.status(200).json({
            status: 'success',
            data: usuarios,
            timesTamp: new Date().toISOString(),
            message: 'Usuários encontrados com sucesso!'
        });
    }

    async getById(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const usuario = await this.usuarioService.getById(id);
        res.status(200).json({
            status: 'success',
            data: usuario,
            timesTamp: new Date().toISOString(),
            message: 'Usuário encontrado com sucesso!'
        });
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const dto = req.body;
        const usuario = await this.usuarioService.update(id, dto);
        res.status(200).json({
            status: 'success',
            data: usuario,
            timesTamp: new Date().toISOString(),
            message: 'Usuário atualizado com sucesso!'
        });
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        await this.usuarioService.delete(id);
        res.status(204).json({
            status: 'success',
            timesTamp: new Date().toISOString(),
            message: 'Usuário deletado com sucesso!'
        });
    }

}

export default  UsuarioController;
