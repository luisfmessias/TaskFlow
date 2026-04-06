import { CategoriaRepository } from "./repository.js";
import { Categorias } from "./model.js";
import { ErroNaoEncontrado } from "@root/erros/erroNaoEncontrado.js";
import { ErroValidacao } from "@root/erros/erroValidacao.js";
import { ErroAcesso } from "@root/erros/erroAcesso.js";


export const CategoriaService = {
    async criar(nome: string, usuarioId: string) {
        const categoria = new Categorias()
        categoria.nome = nome
        categoria.usuarioId = usuarioId
        categoria.validar()

        try{
            return await CategoriaRepository.salvar({ nome, usuarioId })
        }catch{
            throw new ErroValidacao("Ja tem categoria com esse nome")
        }
    },

    async buscarTodos(usuarioID: string) {
        return CategoriaRepository.buscarTodos(usuarioID)
    },

    async buscarPorId(id: string, usuarioId: string) {
        const categoria = await CategoriaRepository.buscarPorId(id)
        if (!categoria) {
            throw new ErroNaoEncontrado("Categoria não encontrada.")
        }
        if (categoria.usuarioId !== usuarioId) {
            throw new ErroAcesso("Acesso negado para categoria.")
        }
        return categoria
    },

    async atualizar(id: string, usuarioId: string, dados: { nome?: string }) {
        const categoria = await CategoriaRepository.buscarPorId(id)
        if (!categoria) throw new ErroNaoEncontrado('Categoria não encontrada')
        if (categoria.usuarioId !== usuarioId) throw new ErroAcesso('Acesso negado')

        return CategoriaRepository.atualizar(id, dados)
    },

    async deletar(id: string, usuarioId: string) {
        const categoria = await CategoriaRepository.buscarPorId(id)
        if (!categoria) {
            throw new ErroNaoEncontrado("Categoria não encontrada")
        }
        if (categoria.usuarioId !== usuarioId) {
            throw new ErroAcesso("Acesso negado")
        }
        await CategoriaRepository.deletar(id)
    }
}