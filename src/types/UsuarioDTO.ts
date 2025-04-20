export interface CreateUsuarioDto {
    email: string;
    password: string;
    name: string;
    bio?: string;
    dataNasc: string;
    genero: string;
    googleId?: string
  }
