import { Router } from "express";
import usuarioRoutes from "./UsuarioRoutes";

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/barbearias', usuarioRoutes);

export default router;
