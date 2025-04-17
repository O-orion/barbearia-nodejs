import { Router } from "express";
import BarbeariaController from "../controllers/BarbeariaController";

const router = Router();
const barbeariaControllerInstance = new BarbeariaController();

router.post('/', async(req, res) => await barbeariaControllerInstance.create(req, res) )
router.get('/', async(req, res) => await barbeariaControllerInstance.getAll(req, res) )
router.get('/:id', async(req, res) => await barbeariaControllerInstance.getById(req, res) )
router.put('/:id', async(req, res) => await barbeariaControllerInstance.update(req, res) )
router.delete('/:id', async(req, res) => await barbeariaControllerInstance.delete(req, res) )

export default router;
