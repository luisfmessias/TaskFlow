import { Usuario } from "../../../generated/prisma/browser.js";
import { PrismaClient } from "@prisma/client/default.js";

export interface IUsuarioRepository {
    salvar(usuario: Usuario): Promise<Usuario>
    atualizar(id: string, usuario: Usuario): Promise<Usuario>
    deletar(id: string): Promise<void>
    buscarPorId(id: string): Promise<Usuario | null>
    buscarTodos(): Promise<Usuario[]>
}

async function criarRepositorioUsuario(): Promise<IUsuarioRepository> {
    const prisma = new PrismaClient();

    return {
        async salvar(usuario: Usuario): Promise<Usuario> {
            return prisma.usuario.create({ data: usuario });
        },
        async atualizar(id: string, usuario: Usuario): Promise<Usuario> {
            return prisma.usuario.update({ where: { id }, data: usuario });
        },
        async deletar(id: string): Promise<void> {
            await prisma.usuario.delete({ where: { id } });
        },
        async buscarPorId(id: string): Promise<Usuario | null> {
            return prisma.usuario.findUnique({ where: { id } });
        },
        async buscarTodos(): Promise<Usuario[]> {
            return prisma.usuario.findMany();
        }
    };
}

export const UsuarioRepository = criarRepositorioUsuario();