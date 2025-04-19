import { Router } from "express";
import ServicosController from "../controllers/ServicosController";

const router = Router();
const servicosController = new ServicosController();

// Rota para criar um serviço
router.post("/", async(req, res) => await servicosController.create(req, res) );
router.get("/", async(req, res) => await servicosController.getAll(req, res) );
router.get("/:id", async(req, res) => await servicosController.getById(req, res) );
router.put("/:id", async(req, res) => await servicosController.update(req, res) );
router.delete("/:id", async(req, res) => await servicosController.delete(req, res) );

export default router;
