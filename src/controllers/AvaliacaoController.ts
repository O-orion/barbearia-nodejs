import { Response,Request } from "express";
import AvaliacoesService from "../services/AvaliacoesService";

export default class AvaliacaoController {

    private avaliacoesService: AvaliacoesService;

    constructor() {
        this.avaliacoesService = new AvaliacoesService();
    }

    async create(req: Request, res: Response) {
            const dto = req.body;
            const avaliacao = await this.avaliacoesService.create(dto);
            res.status(201).json({
                status: 'success',
                data: avaliacao,
                timesTamp: new Date().toISOString(),
                message: 'Avaliação cadastrada com sucesso!'
            });

    }

    async getAll(req: Request, res: Response) {
        const avaliacoes = await this.avaliacoesService.findAll();
        res.status(200).json({
            status: 'success',
            data: avaliacoes,
            timesTamp: new Date().toISOString(),
            message: 'Avaliações encontradas com sucesso!'
        })
    }

    async getById(req: Request, res: Response) {
        const id = req.params.id;
        const avaliacao = await this.avaliacoesService.findById(id);
        res.status(200).json({
            status: 'success',
            data: avaliacao,
            timesTamp: new Date().toISOString(),
            message: 'Avaliação encontrada com sucesso!'
        });
    }

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const dto = req.body;
        const avaliacao = await this.avaliacoesService.update(id, dto);
        res.status(200).json({
            status: 'success',
            data: avaliacao,
            timesTamp: new Date().toISOString(),
            message: 'Avaliação atualizada com sucesso!'
        });
    }

    async delete (req: Request, res: Response) {
        const id = req.params.id;
        await this.avaliacoesService.delete(id);
        res.status(204).json({
            status: 'success',
            timesTamp: new Date().toISOString(),
            message: 'Avaliação deletada com sucesso!'
        });
    }

}

