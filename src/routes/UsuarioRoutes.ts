import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

const router = Router();
const usuarioControllerInstance = new UsuarioController();

router.post('/', async(req, res) => await usuarioControllerInstance.create(req, res) )


export default router;
