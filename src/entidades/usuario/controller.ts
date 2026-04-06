import {Request, Response} from 'express';
import { UsuarioService } from './service.js';
import { RequestComUsuario } from '@root/middleware/autentica.js';

export const UsuarioController = {
    async cadastrar(req: Request, res: Response){
        const {nome, email, senha} = req.body
        const usuario = await UsuarioService.cadastrar(nome, email, senha)
        res.status(201).json(usuario)
    },

    async login(req: Request, res: Response){
        const {email, senha} = req.body
        const resultado = await UsuarioService.login(email, senha)
        res.status(200).json(resultado)
    },

    async buscarTodos(req: Request, res: Response){
        const usuarios = await UsuarioService.buscarTodos()
        res.status(200).json(usuarios)
    },


    async buscarPorId(req: Request, res: Response){
        const usuario = await UsuarioService.buscarPorId(req.params.id as string)
        res.status(200).json(usuario)
    },

    async atualizar(req: RequestComUsuario, res: Response){
        const usuario = await UsuarioService.atualizar(req.params.id as string, req.usuarioId as string, req.body)
        res.status(200).json(usuario)
    },

    async deletar(req: RequestComUsuario, res: Response){
        await UsuarioService.deletar(req.params.id as string, req.usuarioId as string)
        res.status(204).send()
    }
}