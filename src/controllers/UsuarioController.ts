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

}

export default  UsuarioController;
