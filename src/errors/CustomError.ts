
export class CustomError extends Error {
  constructor(public readonly message: string, public readonly statusCode: number) {
    super(message);
    this.name = this.constructor.name;
  }
}
export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

export  class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}
