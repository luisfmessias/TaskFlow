import { Categoria } from "../../../generated/prisma/browser.js";
import { PrismaClient } from "@prisma/client/default.js";

export interface ICategoriaRepository {
    salvar(categoria: Categoria): Promise<Categoria>
    atualizar(id: string, categoria: Categoria): Promise<Categoria>
    deletar(id: string): Promise<void>
    buscarPorId(id: string): Promise<Categoria | null>
    buscarTodos(): Promise<Categoria[]>
}

async function criarRepositorioCategoria(): Promise<ICategoriaRepository> {
    const prisma = new PrismaClient();

    return {
        async salvar(categoria: Categoria): Promise<Categoria> {
            return prisma.categoria.create({ data: categoria });
        },
        async atualizar(id: string, categoria: Categoria): Promise<Categoria> {
            return prisma.categoria.update({ where: { id }, data: categoria });
        },
        async deletar(id: string): Promise<void> {
            await prisma.categoria.delete({ where: { id } });
        },
        async buscarPorId(id: string): Promise<Categoria | null> {
            return prisma.categoria.findUnique({ where: { id } });
        },
        async buscarTodos(): Promise<Categoria[]> {
            return prisma.categoria.findMany();
        }
    };
}

export const CategoriaRepository = criarRepositorioCategoria();