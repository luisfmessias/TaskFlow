import { ErroNaoEncontrado } from "@root/erros/erroNaoEncontrado.js";
import prisma from '@root/lib/prisma.js'

export interface IUsuarioRepository {
    salvar(dados: { nome: string; email: string; senha: string }): Promise<any>
    atualizar(id: string, dados: { nome?: string; email?: string; senha?: string }): Promise<any>
    deletar(id: string): Promise<void>
    buscarPorId(id: string): Promise<any>
    buscarPorEmail(email: string): Promise<any>
    buscarTodos(): Promise<any[]>
}

export const UsuarioRepository: IUsuarioRepository = {
    async salvar(dados) {
        return prisma.usuario.create({ data: dados })
    },
    async atualizar(id, dados) {
        const usuario = await prisma.usuario.findUnique({ where: { id } })
        if (!usuario) {
            throw new ErroNaoEncontrado('Usuario não encontrado')
        }
        return prisma.usuario.update({ where: { id }, data: dados })
    },
    async deletar(id) {
        const usuario = await prisma.usuario.findUnique({ where: { id } })
        if (!usuario) {
            throw new ErroNaoEncontrado('Usuario não encontrado')
        }
        await prisma.usuario.delete({ where: { id } })
    },
    async buscarPorId(id) {
        return prisma.usuario.findUnique({ where: { id } })
    },

    async buscarPorEmail(email) {
        return prisma.usuario.findUnique({ where: { email } })
    },
    
    async buscarTodos() {
        return prisma.usuario.findMany()
    }
}

