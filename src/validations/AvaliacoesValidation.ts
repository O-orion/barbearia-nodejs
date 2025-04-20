import { ValidationError } from "../errors/CustomError";
import { AvaliacoesDTO } from "../types/AvaliacoesDTO";

export default class AvaliacoesValidation {

    async validate(dto: AvaliacoesDTO) {

        const requiredFields: (keyof AvaliacoesDTO)[] = [
            "rating",
            "comment",
            "userId",
            "barberId",
        ];

        await this.validateRequiredFields(dto, requiredFields);
        await this.validateRating(dto.rating);
        await this.validateComment(dto.comment);
        await this.validateUserId(dto.userId);
        await this.validateBarberId(dto.barberId);
    }

    async validateRequiredFields(dto: AvaliacoesDTO, requiredFields: (keyof AvaliacoesDTO)[]): Promise<void> {
        const missingFields = requiredFields.filter((field) => !dto[field]);
        if (missingFields.length > 0) {
            throw new ValidationError(`Os campos ${missingFields.join(", ")} devem ser preenchidos`);
        }
    }

    async validateRating(rating: number): Promise<void> {
        if (rating < 1 || rating > 5) {
            throw new ValidationError("A avaliação deve ser um número entre 1 e 5");
        }
    }

    async validateComment(comment: string): Promise<void> {
        if (comment.length < 10) {
            throw new ValidationError("O comentário deve ter no mínimo 10 caracteres");
        }
    }

    async validateUserId(userId: string): Promise<void> {
        if (!userId) {
            throw new ValidationError("O ID do usuário deve ser preenchido");
        }
    }

    async validateBarberId(barberId: string): Promise<void> {
        if (!barberId) {
            throw new ValidationError("O ID do barbeiro deve ser preenchido");
        }
    }

}
