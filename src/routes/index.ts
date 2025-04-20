import { Router } from "express";
import usuarioRoutes from "./UsuarioRoutes";
import barbeariaRoutes from "./BarbeariaRoutes";
import servicosRoutes from './ServicosRoutes'
import avaliacoesRoutes from "./AvaliacoesRoute";

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/barbearias', barbeariaRoutes);
router.use('/servicos', servicosRoutes);
router.use('/avaliacoes', avaliacoesRoutes);

export default router;
