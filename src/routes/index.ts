import { Router } from "express";
import usuarioRoutes from "./UsuarioRoutes";
import barbeariaRoutes from "./BarbeariaRoutes";
import servicosRoutes from './ServicosRoutes'
import avaliacoesRoutes from "./AvaliacoesRoute";
import authRoutes from "./AuthRoutes";

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/barbearias', barbeariaRoutes);
router.use('/servicos', servicosRoutes);
router.use('/avaliacoes', avaliacoesRoutes);
router.use('/auth', authRoutes);

export default router;
