import { ErroNaoEncontrado } from "@root/erros/erroNaoEncontrado.js";
import prisma from '@root/lib/prisma.js'

export interface ITarefaRepository {
    salvar(dados: { titulo: string; descricao?: string; status?: string; dataLimite?: Date; categoriaId?: string; usuarioId: string }): Promise<any>
    atualizar(id: string, dados: { titulo?: string; descricao?: string; status?: string; dataLimite?: Date; categoriaId?: string }): Promise<any>
    deletar(id: string): Promise<void>
    buscarPorId(id: string): Promise<any | null>
    buscarTodos(usuarioId: string, filtros?: { status?: string; categoriaId?: string }): Promise<any[]>
}

export const TarefaRepository: ITarefaRepository = {
    async salvar(dados) {
        return prisma.tarefa.create({ data: dados })
    },
    async atualizar(id, dados) {
        const tarefa = await prisma.tarefa.findUnique({ where: { id } })
        if (!tarefa) {
            throw new ErroNaoEncontrado('Tarefa não encontrada')
        }
        return prisma.tarefa.update({ where: { id }, data: dados })
    },
    async deletar(id) {
        const tarefa = await prisma.tarefa.findUnique({ where: { id } })
        if (!tarefa) {
            throw new ErroNaoEncontrado('Tarefa não encontrada')
        }
        await prisma.tarefa.delete({ where: { id } })
    },
    async buscarPorId(id) {
        return prisma.tarefa.findUnique({ where: { id } })
    },
    async buscarTodos(usuarioId, filtros = {}) {
        return prisma.tarefa.findMany({
            where: {
                usuarioId,
                ...(filtros.status && { status: filtros.status as any }),
                ...(filtros.categoriaId && { categoriaId: filtros.categoriaId })
            }
        })
    }
}
