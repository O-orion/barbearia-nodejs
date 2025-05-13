import routes from './routes/index';
import express from 'express';
import { AppDataSource } from './database/dataSource';
import { errorHandler } from './middlewares/ErrorHandle';
import { Request, Response, NextFunction } from 'express';

import { config } from 'dotenv';

config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const PORT = 9000;

// Habilitando o JSON
app.use(express.json());

// Habilitando o CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}
);

// Rotas
app.use('/api', routes);

// Middleware de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

AppDataSource.initialize()
    .then(
        () => {
            console.log('Conectado ao postgres');

            // Start serve;
            app.listen(PORT, () => {
                console.log(`Servidor on port: ${PORT}`)
            })

        })
        .catch((error) => console.error('Erro ao conectar-se ao banco',  error))

export default app;
