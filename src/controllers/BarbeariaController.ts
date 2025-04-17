import { Request, Response } from "express";
import BarberiaService from "../services/BarberiaService";


class BarbeariaController {

    private readonly barbeariaService: BarberiaService;

    constructor () {
        this.barbeariaService = new BarberiaService();
    }

    // Cadastro de Barbearia
    async create(req: Request, res: Response): Promise<void> {
        const dto = req.body;
        const barbearia = await this.barbeariaService.create(dto);
        res.status(201).json({
            status: 'success',
            data: barbearia,
            timesTamp: new Date().toISOString(),
            message: 'Barbearia cadastrada com sucesso!'
        });
    }

    async getAll(req: Request, res: Response): Promise<void> {

        const barbearias = await this.barbeariaService.getAll();
        res.status(200).json({
            status: 'success',
            data: barbearias,
            timesTamp: new Date().toISOString(),
            message: 'Barbearias encontradas com sucesso!'
        })

    }

    async getById(req: Request, res: Response): Promise<void> {
        const id= req.params.id;
        const barbearia = await this.barbeariaService.getById(id);
        res.status(200).json({
            status: 'success',
            data: barbearia,
            timesTamp: new Date().toISOString(),
            message: 'Barbearia encontrada com sucesso!'
        });
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const dto = req.body;
        const barbearia = await this.barbeariaService.update(id, dto);
        res.status(200).json({
            status: 'success',
            data: barbearia,
            timesTamp: new Date().toISOString(),
            message: 'Barbearia atualizada com sucesso!'
        });
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        await this.barbeariaService.delete(id);
        res.status(204).json({
            status: 'success',
            timesTamp: new Date().toISOString(),
            message: 'Barbearia deletada com sucesso!'
        });
    }

}

export default BarbeariaController;
