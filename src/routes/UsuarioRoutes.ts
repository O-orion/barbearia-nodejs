import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

const router = Router();

router.post('/', async(req, res) => await UsuarioController.create(req, res) )
