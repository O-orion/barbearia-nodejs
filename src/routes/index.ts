import { Router } from "express";
import usuarioRoutes from "./UsuarioRoutes";
import barbeariaRoutes from "./BarbeariaRoutes";

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/barbearias', barbeariaRoutes);

export default router;
