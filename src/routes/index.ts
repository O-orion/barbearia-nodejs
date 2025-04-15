import { Router } from "express";
import usuarioRoutes from "./UsuarioRoutes";

const router = Router();

router.use('/usuarios', usuarioRoutes);

export default router;
