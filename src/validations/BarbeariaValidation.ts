import { ValidationError } from "../errors/CustomError";
import { BarberiaDto } from "../types/BarberiaDTO";

export class BarberiaValidation  {
    private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    private static readonly TIME_REGEX = /^\d{2}:\d{2}$/;

    public validate(dto: BarberiaDto): void {
        const requiredFields: (keyof BarberiaDto)[] = [
            "name",
             "phone",
             "address",
             "email",
             "closingHours",
             "openingHours",
             "description",

            ];

        this.validateRequiredFields(dto, requiredFields);
        this.validatePhone(dto.phone);
        this.validateEmail(dto.email);
        this.validateAdress(dto.address);
        this.validationDescription(dto.description);
        this.validatesClosingHours(dto.closingHours);
        this.validateOpeningHours(dto.openingHours);
        this.validateName(dto.name);
        this.validateImages(dto.images);

    }

    private validateRequiredFields(dto: BarberiaDto, requiredFields: (keyof BarberiaDto)[]): void {
        const missingFields = requiredFields.filter((field) => !dto[field]);
        if (missingFields.length > 0) {
            throw new ValidationError(`Os campos ${missingFields.join(", ")} devem ser preenchidos`);
        }
    }

    private validateName(name: string): void {
        if (name.length < 3) {
            throw new ValidationError("O nome deve ter no mínimo 3 caracteres");
        }
    }

    private validatePhone(phone: string): void {
        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/; // Exemplo: (12) 34567-8901
        if (!phoneRegex.test(phone)) {
            throw new ValidationError("O telefone deve estar no formato (XX) XXXXX-XXXX");
        }
    }

    private validateEmail(email: string): void {
        if (!BarberiaValidation.EMAIL_REGEX.test(email)) {
        throw new ValidationError("Informe um e-mail válido!");
        }
    }

    private validatesClosingHours(closingHours: string): void {

        if (!BarberiaValidation.TIME_REGEX.test(closingHours)) {
            throw new ValidationError("O horário de fechamento deve estar no formato HH:mm-HH:mm");
        }
    }

    private validateOpeningHours(openingHours: string): void {

        if (!BarberiaValidation.TIME_REGEX.test(openingHours)) {
            throw new ValidationError("O horário de abertura deve estar no formato HH:mm-HH:mm");
        }
    }

    private validateServices(services: string[]): void {
        if (!Array.isArray(services) || services.length === 0) {
            throw new ValidationError("Os serviços devem ser um array e não podem estar vazios");
        }
    }

    private validateAdress(address: string): void {
        if (address.length < 5) {
            throw new ValidationError("O endereço deve ter no mínimo 5 caracteres");
        }
    }

    private validationDescription(description: string): void {
        if (description.length < 10) {
            throw new ValidationError("A descrição deve ter no mínimo 10 caracteres");
        }
    }

    private validateImages(images: string[]): void {
        if (images) {
            if (!Array.isArray(images) || images.length === 0) {
                throw new ValidationError("As imagens devem ser um array e não podem estar vazios");
            }
        }
    }

}


