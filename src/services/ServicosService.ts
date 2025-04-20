import { QueryFailedError, Repository } from "typeorm";
import { AppDataSource } from "../database/dataSource";
import Servicos from "../models/Servicos";
import { ServicosDTO } from "../types/ServicosDTO";
import ServicosValidation from "../validations/ServicosValidation";
import { InternalServerError, ValidationError } from "../errors/CustomError";
import { Barberia } from "../models/Barberia";

export default class ServicoService {

    private servicoRepository: Repository<Servicos>;
    private servicoValidations: ServicosValidation;
    private barberiaRepository: Repository<Barberia>;

    constructor() {
        this.servicoRepository = AppDataSource.getRepository(Servicos);
        this.barberiaRepository = AppDataSource.getRepository(Barberia);
        this.servicoValidations = new ServicosValidation();
    }

    async create(dto: ServicosDTO): Promise<Servicos> {
        try {
            this.servicoValidations.validate(dto);

            const servicoExists = await this.servicoRepository.findOneBy({ name: dto.name, barberId: dto.barberId });
            const barbearia = await this.barberiaRepository.findOneBy({ id: dto.barberId });

            if (!barbearia) {
                throw new ValidationError("Barbearia não encontrada com este ID");
            }

            if (servicoExists) {
                throw new ValidationError("Esse serviço já existe para está barbearia.");
            }

            const newServico = new Servicos(
                dto.name,
                dto.description,
                dto.price,
                dto.duration,
                dto.image,
                dto.barberId);

            newServico.barberia = barbearia; // Associa a barbearia ao serviço
            const createdServico = await this.servicoRepository.save(newServico);
            return createdServico;

        } catch (error) {

            console.error("Erro ao criar serviço:", error);

            if (error instanceof QueryFailedError) {
                throw new InternalServerError("Erro ao criar serviço: " + error.message);
            }

            if (error instanceof ValidationError) {
                throw error;
            }
            throw new InternalServerError("Erro interno ao criar serviço ");
        }
    }

    async findAll(): Promise<Servicos[]> {
        try {

            const servicos = await this.servicoRepository.find({
                relations: {
                    barberia: true,
                },
            });

            return servicos;

        } catch (error) {
         console.log("Erro ao buscar serviços:", error);

            if (error instanceof QueryFailedError) {
                throw new InternalServerError("Erro ao buscar serviços: " + error.message);
            }

            throw new InternalServerError("Erro interno ao buscar serviços ");
        }
    }

    async findById(id: string): Promise<Servicos | null> {
        try {

            const trimmedId: string = id.trim();


            if (!trimmedId) {
                throw new ValidationError("O ID do serviço deve ser preenchido");
            }

            const servico = await this.servicoRepository.findOne({
                where: {id: trimmedId},
                relations: {
                    barberia: true,
                },
            })

            if (!servico) {
                throw new ValidationError("Serviço não encontrado com este ID");
            }

            return servico;

        } catch (error) {

            console.log("Erro ao buscar serviço:", error);

            if (error instanceof QueryFailedError) {
                throw new InternalServerError("Erro ao buscar serviço: " + error.message);
            }

            if (error instanceof ValidationError) {
                throw error;
            }

            throw new InternalServerError("Erro interno ao buscar serviço ");
        }
    }

    async update(id: string, dto: ServicosDTO): Promise<Servicos | null> {
        try {

            const trimmedId: string = id.trim();


            if (!trimmedId) {
                throw new ValidationError("O ID do serviço deve ser preenchido");
            }

            this.servicoValidations.validate(dto);

            const servico = await this.servicoRepository.findOneBy({ id: trimmedId });

            if (!servico) {
                throw new ValidationError("Serviço não encontrado com este ID");
            }

            const updatedServico = await this.servicoRepository.save({
                ...servico,
                ...dto,
            });

            return updatedServico;

        } catch (error) {

            console.log("Erro ao atualizar serviço:", error);

            if (error instanceof QueryFailedError) {
                throw new InternalServerError("Erro ao atualizar serviço: " + error.message);
            }

            if (error instanceof ValidationError) {
                throw error;
            }

            throw new InternalServerError("Erro interno ao atualizar serviço ");
        }
    }

    async delete(id: string): Promise<void> {

        try {
            const trimmedId: string = id.trim();

            if (!trimmedId) {
                throw new ValidationError("O ID do serviço deve ser preenchido");
            }

            const servico = await this.servicoRepository.findOneBy({ id });

            if(!servico) {
                throw new ValidationError("Serviço não encontrado com este ID");
            }

            await this.servicoRepository.delete({ id });


        } catch (error) {
            console.log("Erro ao deletar serviço:", error);

            if (error instanceof QueryFailedError) {
                throw new InternalServerError("Erro ao deletar serviço: " + error.message);
            }

            if (error instanceof ValidationError) {
                throw error;
            }

            throw new InternalServerError("Erro interno ao deletar serviço ");
        }

    }

}
