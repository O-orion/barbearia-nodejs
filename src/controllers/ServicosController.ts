import { Request, Response } from "express";
import ServicosService from "../services/ServicosService";

export default class ServicosController {

    private servicosService: ServicosService;

    constructor() {
        this.servicosService = new ServicosService();
    }

    async create(req: Request, res: Response) {
        const dto = req.body;
        const servico = await this.servicosService.create(dto);
        res.status(201).json({
            status: 'success',
            data: servico,
            timesTamp: new Date().toISOString(),
            message: 'Serviço cadastrado com sucesso!'
        });
    }

    async getAll(req: Request, res: Response) {
        const servicos = await this.servicosService.findAll();
        res.status(200).json({
            status: 'success',
            data: servicos,
            timesTamp: new Date().toISOString(),
            message: 'Serviços encontrados com sucesso!'
        });
    }

    async getById(req: Request, res: Response) {

        const id = req.params.id;
        const servico = await this.servicosService.findById(id);
        res.status(200).json({
            status: 'success',
            data: servico,
            timesTamp: new Date().toISOString(),
            message: 'Serviço encontrado com sucesso!'
        });
    }

    async update(req: Request, res: Response) {

        const id = req.params.id;
        const dto = req.body;
        const servico = await this.servicosService.update(id, dto);
        res.status(200).json({
            status: 'success',
            data: servico,
            timesTamp: new Date().toISOString(),
            message: 'Serviço atualizado com sucesso!'
        });
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        await this.servicosService.delete(id);
        res.status(200).json({
            status: 'success',
            timesTamp: new Date().toISOString(),
            message: 'Serviço deletado com sucesso!'
        });

    }


}
