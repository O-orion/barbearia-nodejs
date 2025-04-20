import { QueryFailedError, Repository } from "typeorm";
import Avaliacoes from "../models/Avaliacoes";
import { AppDataSource } from "../database/dataSource";
import { AvaliacoesDTO } from "../types/AvaliacoesDTO";
import AvaliacoesValidation from "../validations/AvaliacoesValidation";
import { InternalServerError, ValidationError } from "../errors/CustomError";
import { Usuario } from "../models/Usuario";
import { Barberia } from "../models/Barberia";

export default class AvaliacoesService {

    private avaliacoesRepository: Repository<Avaliacoes>;
    private usuarioRepository: Repository<Usuario>;
    private barbeariaRepository: Repository<Barberia>;

    private avaliacoesValidation: AvaliacoesValidation;

    constructor() {
        this.avaliacoesRepository = AppDataSource.getRepository(Avaliacoes);
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
        this.barbeariaRepository = AppDataSource.getRepository(Barberia);

        this.avaliacoesValidation = new AvaliacoesValidation();
    }

    async create(dto: AvaliacoesDTO): Promise<Avaliacoes> {

        try {

            await this.avaliacoesValidation.validate(dto);

            const avaliacaoExistente = await this.avaliacoesRepository.findOne({
                where: {
                    userId: dto.userId,
                    barberId: dto.barberId,
                },
            });

            if (avaliacaoExistente) {
                throw new ValidationError("Você já avaliou está barbearia.");
            }

            const usuario = await this.usuarioRepository.findOne({
                where: {
                    id: dto.userId,
                },
            });

            if (!usuario) {
                throw new ValidationError("Usuário não encontrado.");
            }
            const barbearia = await this.barbeariaRepository.findOne({
                where: {
                    id: dto.barberId,
                },
            });

            if (!barbearia) {
                throw new ValidationError("Barbearia não encontrada.");
            }

            const avaliacoes = new Avaliacoes(
                dto.rating,
                dto.comment,
                dto.userId,
                dto.barberId,
            );

            avaliacoes.usuario = usuario;
            avaliacoes.barberia = barbearia;

            const createdAvaliacoes = await this.avaliacoesRepository.save(avaliacoes);
            return createdAvaliacoes;

        } catch (error) {

            console.error("Erro ao criar avaliação:", error);

            if (error instanceof ValidationError) {
                throw error;

            } else if (error instanceof QueryFailedError) {

                throw new InternalServerError("Erro ao criar avaliação: " + error.message);
            }

            throw new InternalServerError("Erro interno ao criar avaliação: ");

        }

    }

    async findAll(): Promise<Avaliacoes[]> {
        try {
            const avaliacoes = await this.avaliacoesRepository.find({
                relations: ['usuario', 'barberia'],
            });

            return avaliacoes;

        } catch (error) {
            console.log("Erro ao buscar avaliações:", error);

            if (error instanceof QueryFailedError) {
                throw new InternalServerError("Erro ao buscar avaliações: " + error.message);
            }

            throw new InternalServerError("Erro interno ao buscar avaliações: " );
        }
    }

    async findById(id: string): Promise<Avaliacoes | null> {
        try {
            const avaliacao = await this.avaliacoesRepository.findOne({
                where: {
                    id,
                },
                relations: ['usuario', 'barberia'],
            });

            if (!avaliacao) {
                throw new ValidationError("Avaliação não encontrada.");
            }

            return avaliacao;

        } catch (error) {
            console.log("Erro ao buscar avaliação:", error);

            if (error instanceof QueryFailedError) {
                throw new InternalServerError("Erro ao buscar avaliação: " + error.message);
            }

            throw new InternalServerError("Erro interno ao buscar avaliação: " );

        }
    }

    async update(id: string, dto: AvaliacoesDTO): Promise<Avaliacoes | null> {

        try {
            await this.avaliacoesValidation.validate(dto);

            const avaliacao = await this.avaliacoesRepository.findOne({
                where: { id },
                relations: ['usuario', 'barberia'],
            });

            if (!avaliacao) {
                throw new ValidationError("Avaliação não encontrada.");
            }

            if (avaliacao.userId !== dto.userId) {
                const usuario = await this.usuarioRepository.findOne({
                    where: { id: dto.userId },
                });

                if (!usuario) {
                    throw new ValidationError("Usuário não encontrado.");
                }

                avaliacao.usuario = usuario;
            }

            if (avaliacao.barberId !== dto.barberId) {
                const barbearia = await this.barbeariaRepository.findOne({
                    where: { id: dto.barberId },
                });

                if (!barbearia) {
                    throw new ValidationError("Barbearia não encontrada.");
                }

                avaliacao.barberia = barbearia;
            }

            await this.avaliacoesRepository.merge(avaliacao, dto);
            const updatedAvaliacoes = await this.avaliacoesRepository.save(avaliacao);
            return updatedAvaliacoes;

        } catch (error) {
            console.log("Erro ao atualizar avaliação:", error);

            if (error instanceof ValidationError) {
                throw error;
            } else if (error instanceof QueryFailedError) {
                throw new InternalServerError("Erro ao atualizar avaliação: " + error.message);
            }
            throw new InternalServerError("Erro interno ao atualizar avaliação: " );

        }

    }

    async delete(id: string): Promise<void> {


        try {
            const avaliacao = await this.avaliacoesRepository.findOne({
                where: { id },
                relations: ['usuario', 'barberia'],
            });

            if (!avaliacao) {
                throw new ValidationError("Avaliação não encontrada.");
            }

            await this.avaliacoesRepository.delete(id);
            console.log("Avaliação deletada com sucesso.");

        } catch (error) {
            console.log("Erro ao deletar avaliação:", error);

            if (error instanceof ValidationError) {

                throw error;
            }
            else if (error instanceof QueryFailedError) {

                throw new InternalServerError("Erro ao deletar avaliação: " + error.message);
            }

            throw new InternalServerError("Erro interno ao deletar avaliação" );
        }

    }

}
