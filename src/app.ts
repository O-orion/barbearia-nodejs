import express from 'express';

const app = express();
const PORT = 9000;

// Habilitando o JSON
app.use(express.json());

// Startando Servidor
app.listen(PORT, () => {
    console.log(`Servidor on port: ${PORT}`)
})
