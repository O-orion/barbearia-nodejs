import { Router } from "express";
import AvaliacaoController from "../controllers/AvaliacaoController";

const router = Router();
const avaliacaoControllerInstance = new AvaliacaoController();

router.post('/', (req, res) => avaliacaoControllerInstance.create(req, res));
router.get('/', (req, res) => avaliacaoControllerInstance.getAll(req, res));
router.get('/:id', (req, res) => avaliacaoControllerInstance.getById(req, res));
router.put('/:id', (req, res) => avaliacaoControllerInstance.update(req, res));
router.delete('/:id', (req, res) => avaliacaoControllerInstance.delete(req, res));

export default router;
