import {Tarefa } from "../../../generated/prisma/browser.js";
import { PrismaClient } from "@prisma/client/default.js";

export interface ITarefaRepository {
    salvar(tarefa: Tarefa): Promise<Tarefa>
    atualizar(id: string, tarefa: Tarefa): Promise<Tarefa>
    deletar(id: string): Promise<void>
    buscarPorId(id: string): Promise<Tarefa | null>
    buscarTodos(): Promise<Tarefa[]>
}

async function criarRepositorioTarefa(): Promise<ITarefaRepository> {
    const prisma = new PrismaClient();

    return {
        async salvar(tarefa: Tarefa): Promise<Tarefa> {
            return prisma.tarefa.create({ data: tarefa });
        },
        async atualizar(id: string, tarefa: Tarefa): Promise<Tarefa> {
            return prisma.tarefa.update({ where: { id }, data: tarefa });
        },
        async deletar(id: string): Promise<void> {
            await prisma.tarefa.delete({ where: { id } });
        },
        async buscarPorId(id: string): Promise<Tarefa | null> {
            return prisma.tarefa.findUnique({ where: { id } });
        },
        async buscarTodos(): Promise<Tarefa[]> {
            return prisma.tarefa.findMany();
        }
    };
}

export const TarefaRepository = criarRepositorioTarefa();