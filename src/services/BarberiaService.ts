import { DeepPartial, QueryFailedError, Repository } from "typeorm";
import { AppDataSource } from "../database/dataSource";
import { Barberia } from "../models/Barberia";
import { BarberiaDto } from "../types/BarberiaDTO";
import { BarberiaValidation } from "../validations/BarbeariaValidation";
import { InternalServerError, ValidationError } from "../errors/CustomError";

class BarberiaService {

    private readonly barberiaRepository: Repository<Barberia>;
    private readonly barberiaValidations: BarberiaValidation;

    constructor() {
        this.barberiaRepository = AppDataSource.getRepository(Barberia);
        this.barberiaValidations = new BarberiaValidation();
    }

    async create(dto: BarberiaDto): Promise<Barberia> {
        try {

            this.barberiaValidations.validate(dto);

            // Verifica se a barbearia já existe
            const barbearia = await this.barberiaRepository.findOne({ where: { email: dto.email } });

            if (barbearia) throw new ValidationError("Barbearia já cadastrada com este email!");

            // Cria a barbearia com os dados fornecidos
            const newBarberia = new Barberia(
                dto.name,
                dto.email,
                dto.phone,
                dto.address,
                dto.website ?? "" ,
                dto.description,
                dto.rating ?? 0,
                dto.openingHours,
                dto.closingHours,
                dto.location ?? { lat: 0, lng: 0 },
                dto.images,
                dto.owner
            );

            // Salva a barbearia no banco de dados
            const savedBarberia = await this.barberiaRepository.save(newBarberia);
            return savedBarberia;

        } catch (error) {
            console.log(error);

            if (error instanceof ValidationError) {
                throw error;
            }

            if (error instanceof QueryFailedError) {
                throw new ValidationError("Erro na consulta ao banco de dados");
            }

            throw new InternalServerError("Erro interno ao criar barbearia");
        }
    }

    async getAll(): Promise<Barberia[]> {
        try {

            const barbearias = await this.barberiaRepository.find({
                relations: ['owner', 'servicos'],
            })
            return barbearias;

        } catch (error) {
            console.log(error);

            throw new InternalServerError("Erro interno ao buscar barbearias");
        }

    }

    async getById(id: string): Promise<Barberia | null> {

        try {

            const barbearia = await this.barberiaRepository.findOne({
                where: { id },
            });

            if(!barbearia) throw new ValidationError("Barbearia não encontrada!");

            return barbearia;

        } catch (error) {
            console.log(error);

            if (error instanceof QueryFailedError) {
                throw new ValidationError("Erro ao consultar a barbearia no banco de dados");
            }

            throw new InternalServerError("Erro interno ao buscar barbearia");

        }

    }

    async update(id: string, dto: BarberiaDto): Promise<Barberia | null> {

        try {

            this.barberiaValidations.validate(dto);

            const barbearia = await this.barberiaRepository.findOne({ where: { id } });

            if (!barbearia) throw new ValidationError("Barbearia não encontrada!");

                        // Transform DTO to match DeepPartial<Barberia>
            const updatedData: DeepPartial<Barberia> = {
                ...dto,
                owner: { id: dto.owner }, // Convert owner string to partial Usuario object
            };

            await this.barberiaRepository.merge(barbearia, updatedData);

            const savedBarberia = await this.barberiaRepository.save(barbearia);

            return savedBarberia;

        } catch (error) {
            console.log(error);

            if (error instanceof ValidationError) {
                throw error;
            }

            if (error instanceof QueryFailedError) {
                throw new ValidationError("Erro na consulta ao banco de dados");
            }

            throw new InternalServerError("Erro interno ao atualizar barbearia");
        }

    }

    async delete(id: string): Promise<void> {

        try {
            const barbearia = await this.barberiaRepository.findOne({ where: { id} })

            if(!barbearia) throw new ValidationError("Barbearia não encontrada!");

            await this.barberiaRepository.delete({ id });
            return;

        } catch (error) {

            console.log(error);

            if (error instanceof ValidationError) {
                throw error;
            }

            if( error instanceof QueryFailedError) {
                throw new ValidationError("Erro na consulta ao banco de dados");
            }

            throw new InternalServerError("Erro interno ao deletar barbearia");

        }

    }

}

export default BarberiaService;
