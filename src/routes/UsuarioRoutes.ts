import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

const router = Router();
const usuarioControllerInstance = new UsuarioController();

router.post('/', async(req, res) => await usuarioControllerInstance.create(req, res) )
router.get('/', async(req, res) => await usuarioControllerInstance.getAll(req, res) )
router.get('/:id', async(req, res) => await usuarioControllerInstance.getById(req, res) )
router.put('/:id', async(req, res) => await usuarioControllerInstance.update(req, res) )
router.delete('/:id', async(req, res) => await usuarioControllerInstance.delete(req, res) )

export default router;
