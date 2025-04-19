import { Router } from "express";
import usuarioRoutes from "./UsuarioRoutes";
import barbeariaRoutes from "./BarbeariaRoutes";
import servicosRoutes from './ServicosRoutes'

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/barbearias', barbeariaRoutes);
router.use('/servicos', servicosRoutes);

export default router;
