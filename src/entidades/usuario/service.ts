import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsuarioRepository } from './repository.js';
import { Usuarios } from './model.js';
import { ErroNaoEncontrado } from '@root/erros/erroNaoEncontrado.js';
import { ErroValidacao } from '@root/erros/erroValidacao.js';
import { ErroAutenticacao } from '@root/erros/erroAutenticacao.js';

export const UsuarioService = {
    async cadastrar (nome: string, email: string, senha: string){
        const usuario = new Usuarios()
        usuario.nome = nome
        usuario.email = email
        usuario.senha = senha
        usuario.validar()
        
        const jaUsaOEmail = await UsuarioRepository.buscarPorEmail(email)
        if (jaUsaOEmail){
            throw new ErroValidacao('Esse email já ta cadastrado')
        }

        const senhaComHash = await bcrypt.hash(senha, 10)

        const userNovo = await UsuarioRepository.salvar({nome, email, senha: senhaComHash})

        const { senha: _, ...usuarioSemSenha } = userNovo

        return usuarioSemSenha
    },

    async login(email: string, senha: string){
        if (!email || !senha){
            throw new ErroValidacao('Email e senha sao obrigatórios')
        }

        const usuario = await UsuarioRepository.buscarPorEmail(email)
        if (!usuario){
            throw new ErroAutenticacao('Email ou senha inválidos')
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha!)
        if (!senhaCorreta){
            throw new ErroAutenticacao('Email ou senha inválidos')
        }

        const secret = process.env.JWT_SECRET || 'manja_muito_2'
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            secret,
            { expiresIn: '7d' }
        )

        const {senha: _, ...usuarioSemSenha } = usuario

        return { usuario: usuarioSemSenha, token }
    },

    async buscarTodos(){
        const usuarios = await UsuarioRepository.buscarTodos()

        return usuarios.map(({senha, ...resto}) => resto)
    },

    async buscarPorId(id: string){
        const usuario = await UsuarioRepository.buscarPorId(id)
        if (!usuario){
            throw new ErroNaoEncontrado('Usuário não encontrado')
        }
        const {senha, ...usuarioSemSenha} = usuario
        return usuarioSemSenha
    },

    async atualizar(id: string, idDoToken: string, dados: { nome?: string; email?: string; senha?: string }) {
        if (id !== idDoToken){
            throw new ErroAutenticacao('Voce não tem permissao para atualizar esse usuario')
        }

        const usuario = await UsuarioRepository.buscarPorId(id)
        if (!usuario){
            throw new ErroNaoEncontrado('Usuario não encontrado')
        }

        if (dados.email && dados.email !== usuario.email){
            const jaUsaOEmail = await UsuarioRepository.buscarPorEmail(dados.email)
            if (jaUsaOEmail){
                throw new ErroValidacao('Esse email já está cadastrado')
            }
        }

        if (dados.senha){
            dados.senha = await bcrypt.hash(dados.senha, 10)
        }

        const attUser = await UsuarioRepository.atualizar(id, dados)
        const {senha, ...usuarioSemSenha} = attUser
        return usuarioSemSenha
    },

    async deletar(id: string, idDoToken: string){
        if (id !== idDoToken){
            throw new ErroAutenticacao('Você não tem permissão para deletar esse usuário')
        }
        const usuario = await UsuarioRepository.buscarPorId(id)
        if (!usuario){
            throw new ErroNaoEncontrado('Usuário não encontrado')
        }
        await UsuarioRepository.deletar(id)
    }
}