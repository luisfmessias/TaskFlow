import { Response } from "express";
import { CategoriaService } from "./service.js";
import { RequestComUsuario } from "@root/middleware/autentica.js";

export const CategoriaComController = {
    async criar(req: RequestComUsuario, res: Response) {
        const { nome } = req.body;
        const categoria = await CategoriaService.criar(nome, req.usuarioId!);
        res.status(201).json(categoria);
    },

    async buscarTodos(req: RequestComUsuario, res: Response) {
        const categorias = await CategoriaService.buscarTodos(req.usuarioId!);
        res.status(200).json(categorias);
    },

    async buscarPorId(req: RequestComUsuario, res: Response) {
        const categoria = await CategoriaService.buscarPorId(req.params.id as string, req.usuarioId!);
        res.status(200).json(categoria);
    },

    async atualizar(req: RequestComUsuario, res: Response) {
        const categoria = await CategoriaService.atualizar(req.params.id as string, req.usuarioId!, req.body);
        res.status(200).json(categoria);
    },

    async deletar(req: RequestComUsuario, res: Response) {
        await CategoriaService.deletar(req.params.id as string, req.usuarioId!);
        res.status(204).send();
    }
}