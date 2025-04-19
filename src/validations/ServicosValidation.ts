import { ValidationError } from "../errors/CustomError";
import { ServicosDTO } from "../types/ServicosDTO";

export default class ServicosValidation {

    async validate(dto: ServicosDTO) {
        const requiredFields: (keyof ServicosDTO)[] = [
            "name",
            "description",
            "price",
            "duration",
            "image",
            "barberId"
        ];

        this.validateRequiredFields(dto, requiredFields);
        this.validateName(dto.name);
        this.validateDescription(dto.description);
        this.validatePrice(dto.price);
        this.validateDuration(dto.duration);
        this.validateImage(dto.image);
        this.validateBarberId(dto.barberId);
    }

    async validateRequiredFields(dto: ServicosDTO, requiredFields: (keyof ServicosDTO)[]) {
        const missingFields = requiredFields.filter((field) => !dto[field]);
        if (missingFields.length > 0) {
            throw  new ValidationError (`Os campos ${missingFields.join(", ")} devem ser preenchidos`);
        }
    }

    validateName(name: string) {
        if (name.length < 3) {
            throw  new ValidationError ("O nome do serviço deve ter no mínimo 3 caracteres");
        }
    }

    validateDescription(description: string) {
        if (description.length < 10) {
            throw  new ValidationError ("A descrição do serviço deve ter no mínimo 10 caracteres");
        }
    }

    validatePrice(price: number) {
        if (price <= 0) {
            throw  new ValidationError ("O preço do serviço deve ser maior que zero");
        }
    }

    validateDuration(duration: number) {
        if (duration <= 0) {
            throw  new ValidationError ("A duração do serviço deve ser maior que zero");
        }
    }

    validateImage(image: string) {

        if (!image || image.trim() === "") {
            throw  new ValidationError ("Informe o link da imagem do serviço");
        }
    }

    validateBarberId(barberId: string) {
        if (!barberId) {
            throw new ValidationError("O ID do barbeiro deve ser preenchido");
        }
        if (barberId.length !== 36) {
            throw new ValidationError("O ID do barbeiro deve ter 36 caracteres (UUID)");
        }
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(barberId)) {
            throw new ValidationError("O ID do barbeiro deve ser um UUID válido");
        }
    }



}
