import { ErroNaoEncontrado } from "@root/erros/erroNaoEncontrado.js";
import prisma from '@root/lib/prisma.js'

export interface ICategoriaRepository {
    salvar(dados: { nome: string; usuarioId: string }): Promise<any>
    atualizar(id: string, dados: { nome?: string }): Promise<any>
    deletar(id: string): Promise<void>
    buscarPorId(id: string): Promise<any>
    buscarTodos(usuarioId: string): Promise<any[]>
}


export const CategoriaRepository: ICategoriaRepository = {
    async salvar(dados) {
        return prisma.categoria.create({ data: dados })
    },
    async atualizar(id, dados) {
        const categoria = await prisma.categoria.findUnique({ where: { id } })
        if (!categoria) {
            throw new ErroNaoEncontrado('Categoria não encontrada')
        }
        return prisma.categoria.update({ where: { id }, data: dados })
    },
    async deletar(id) {
        const categoria = await prisma.categoria.findUnique({ where: { id } })
        if (!categoria) {
            throw new ErroNaoEncontrado('Categoria não encontrada')
        }
        await prisma.categoria.delete({ where: { id } })
    },
    async buscarPorId(id) {
        return prisma.categoria.findUnique({ where: { id } })
    },

    async buscarTodos(usuarioId) {
        return prisma.categoria.findMany({ where: { usuarioId } })
    }
}
