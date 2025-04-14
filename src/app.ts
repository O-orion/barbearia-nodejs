import express from 'express';
import { AppDataSource } from './database/dataSource';

const app = express();
const PORT = 9000;

// Habilitando o JSON
app.use(express.json());


AppDataSource.initialize()
    .then(
        () => {
            console.log('Conectado ao postgres');
            // Startando Servidor
            app.listen(PORT, () => {
                console.log(`Servidor on port: ${PORT}`)
            })

        })
        .catch((error) => console.error('Erro ao conectar-se ao banco',  error))

export default app;
