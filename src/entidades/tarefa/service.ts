import { TarefaRepository } from "./repository.js";
import { CategoriaRepository } from "../categoria/repository.js";
import { Tarefas } from "./model.js";
import { ErroNaoEncontrado } from "@root/erros/erroNaoEncontrado.js";
import { ErroAcesso } from "@root/erros/erroAcesso.js";
import { ErroValidacao } from "@root/erros/erroValidacao.js";

const STATUS = ['pendente', 'em_andamento', 'concluida']

export const TarefaService = {
    async criar(dados: { titulo: string, descricao?: string, dataLimite?: Date, status: string, categoriaId: string }, usuarioId: string) {
        const tarefa = new Tarefas()
        tarefa.titulo = dados.titulo
        tarefa.descricao = dados.descricao
        tarefa.dataLimite = dados.dataLimite
        tarefa.status = dados.status
        tarefa.validar()

        if (dados.categoriaId) {
            const categoria = await CategoriaRepository.buscarPorId(dados.categoriaId)
            if (!categoria) {
                throw new ErroNaoEncontrado('Categoria não encontrada')
            }
            if (categoria.usuarioId !== usuarioId) {
                throw new ErroAcesso('Acesso negado para categoria')
            }
        }

        return TarefaRepository.salvar({
            titulo: dados.titulo,
            descricao: dados.descricao,
            dataLimite: dados.dataLimite,
            categoriaId: dados.categoriaId,
            usuarioId: usuarioId,
            status: dados.status
        })
    },

    async buscarTodos(usuarioId: string, filtros: { status?: string, categoriaId?: string }) {
        if (filtros.status && !STATUS.includes(filtros.status)) {
            throw new ErroValidacao('Status invalido')
        }
         return TarefaRepository.buscarTodos(usuarioId, filtros)
    },

    async buscarPorId(id: string, usuarioId: string) {
        const tarefa = await TarefaRepository.buscarPorId(id)
        if (!tarefa) {
            throw new ErroNaoEncontrado('Tarefa não encontrada')
        }
        if (tarefa.usuarioId !== usuarioId) {
            throw new ErroAcesso('Acesso negado para tarefa')
        }
        return tarefa
    },

    async atualizar(id: string, usuarioId: string, dados: { titulo?: string, descricao?: string, status?: string, categoriaId?: string }) {
        const tarefa = await TarefaRepository.buscarPorId(id)
        if (!tarefa) {
            throw new ErroNaoEncontrado('Tarefa não encontrada')
        }
        if (tarefa.usuarioId !== usuarioId) {
            throw new ErroAcesso('Acesso negado para tarefa')
        }
        if (dados.status && !STATUS.includes(dados.status)) {
            throw new ErroValidacao('Status invalido, use: pendente, em_andamento ou concluida')
        }

        if (dados.categoriaId) {
            const categoria = await CategoriaRepository.buscarPorId(dados.categoriaId)
            if (!categoria) {
                throw new ErroNaoEncontrado('Categoria não encontrada')
            }
            if (categoria.usuarioId !== usuarioId) {
                throw new ErroAcesso('Acesso negado para categoria')
            }
        }
        const tarefaParaValidar = new Tarefas()
        tarefaParaValidar.titulo = dados.titulo || tarefa.titulo
        tarefaParaValidar.descricao = dados.descricao
        tarefaParaValidar.validar()

        return TarefaRepository.atualizar(id, dados)
    },

    async atualizarStatus(id: string, usuarioId: string, status: string) {
        const tarefa = await TarefaRepository.buscarPorId(id)
        if (!tarefa) {
            throw new ErroNaoEncontrado('Tarefa não encontrada')
        }
        if (tarefa.usuarioId !== usuarioId) {
            throw new ErroAcesso('Acesso negado para tarefa')
        }
        if (!STATUS.includes(status)) {
            throw new ErroValidacao('Status invalido, use: pendente, em_andamento ou concluida')
        }

        return TarefaRepository.atualizar(id, { status })
    },

    async deletar(id: string, usuarioId: string) {
        const tarefa = await TarefaRepository.buscarPorId(id)
        if (!tarefa) {
            throw new ErroNaoEncontrado('Tarefa não encontrada')
        }
        if (tarefa.usuarioId !== usuarioId) {
            throw new ErroAcesso('Acesso negado para tarefa')
        }
        await TarefaRepository.deletar(id)
    }
}
