import { CreateUsuarioDto } from "../types/UsuarioDTO";
import { ValidationError } from "../errors/CustomError";

enum Genero {
  MASCULINO = "masculino",
  FEMININO = "feminino",
  OUTRO = "outro",
}

export class UsuarioValidations {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static readonly DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;

  public validateDto(dto: CreateUsuarioDto): void {
    const requiredFields: (keyof CreateUsuarioDto)[] = ["email", "password", "name", "dataNasc", "genero"];
    this.validateRequiredFields(dto, requiredFields);
    this.validatePassword(dto.password);
    this.validateName(dto.name);
    this.validateEmail(dto.email);
    this.validateDateOfBirth(dto.dataNasc);
    this.validateGenero(dto.genero);
  }

  private validateRequiredFields(dto: CreateUsuarioDto, requiredFields: (keyof CreateUsuarioDto)[]): void {
    const missingFields = requiredFields.filter((field) => !dto[field]);
    if (missingFields.length > 0) {
      throw new ValidationError(`Os campos ${missingFields.join(", ")} devem ser preenchidos`);
    }
  }

  private validatePassword(password: string): void {
    if (password.length < 8) {
      throw new ValidationError("A senha deve ter no mínimo 8 caracteres");
    }
    if (!/[a-z]/.test(password)) {
      throw new ValidationError("A senha deve conter pelo menos uma letra minúscula");
    }
    if (!/[A-Z]/.test(password)) {
      throw new ValidationError("A senha deve conter pelo menos uma letra maiúscula");
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      throw new ValidationError("A senha deve conter pelo menos um caractere especial");
    }
  }

  private validateName(name: string): void {
    if (name.length < 3) {
      throw new ValidationError("O nome deve ter no mínimo 3 caracteres");
    }
  }

  private validateEmail(email: string): void {
    if (!UsuarioValidations.EMAIL_REGEX.test(email)) {
      throw new ValidationError("Informe um e-mail válido!");
    }
  }

  private validateDateOfBirth(dataNasc: string): void {
    if (!UsuarioValidations.DATE_FORMAT_REGEX.test(dataNasc)) {
      throw new ValidationError("A data de nascimento deve estar no formato YYYY-MM-DD");
    }
    const date = new Date(dataNasc);
    if (isNaN(date.getTime())) {
      throw new ValidationError("A data de nascimento fornecida não é válida");
    }
    if (date > new Date()) {
      throw new ValidationError("A data de nascimento não pode ser no futuro");
    }
  }

  private validateGenero(genero: string): void {
    const validGeneros = Object.values(Genero);
    if (!validGeneros.includes(genero as Genero)) {
      throw new ValidationError(
        `Gênero inválido. Os valores válidos são: ${validGeneros.join(", ")}`
      );
    }
  }
}
