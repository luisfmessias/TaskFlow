import {Response} from 'express'
import { TarefaService } from './service.js'
import { RequestComUsuario } from '@root/middleware/autentica.js'

export const TarefaController = {

    async criar(req: RequestComUsuario, res: Response ){
        const tarefa = await TarefaService.criar(req.body, req.usuarioId!)
        res.status(201).json(tarefa)
    },

    async buscarTodos(req: RequestComUsuario, res: Response){
        const tarefas = await TarefaService.buscarTodos(req.usuarioId!, {
            status: req.query.status as string | undefined,
            categoriaId: req.query.categoriaId as string | undefined
        })
        res.status(200).json(tarefas)
    },

    async buscarPorId(req: RequestComUsuario, res: Response){
        const tarefa = await TarefaService.buscarPorId(req.params.id as string, req.usuarioId!)
        res.status(200).json(tarefa)
    },

    async atualizar(req: RequestComUsuario, res: Response){
        const tarefa = await TarefaService.atualizar(req.params.id as string, req.usuarioId!, req.body)
        res.status(200).json(tarefa)
    },

    async atualizarStatus(req: RequestComUsuario, res: Response){
        const tarefa = await TarefaService.atualizarStatus(req.params.id as string, req.usuarioId!, req.body.status as string)
        res.status(200).json(tarefa)
    },

    async deletar(req: RequestComUsuario, res: Response){
        await TarefaService.deletar(req.params.id as string, req.usuarioId!)
        res.status(204).send()
    }
}