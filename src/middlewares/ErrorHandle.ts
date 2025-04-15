import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { Timestamp } from "typeorm";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError ) {
        console.error(err); //Depugar o erro para entender o que está acontecendo

        // Se o erro for uma instância de CustomError, use o statusCode e a mensagem do erro
        return res.status(err.statusCode).json({  status: 'Error', message: err.message, timestamp: new Date().toISOString() });
    }

    res.status(500).json({
        status: 'Error',
        message: 'Internal Server Error',
        timestamp: new Date().toISOString(),
    });

    console.error(err); // Log erro interno

    next();
}
