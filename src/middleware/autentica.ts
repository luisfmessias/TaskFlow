import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { ErroAutenticacao } from '@root/erros/erroAutenticacao.js';


export interface RequestComUsuario extends Request {
    usuarioId?: string
    usuarioEmail?: string
}

export function autenticar(req: RequestComUsuario, res: Response, next: NextFunction){
    const token = req.headers.authorization

    if(!token || !token.startsWith('Bearer ')){
        throw new ErroAutenticacao('Token nao informado')
    }
    const tokenSemBearer = token.split(' ')[1]

    try{
        const secret = process.env.JWT_SECRET || 'manja_muito_2'
        const dadosDoToken = jwt.verify(tokenSemBearer, secret) as {id: string, email: string}
        req.usuarioId = dadosDoToken.id
        req.usuarioEmail = dadosDoToken.email
        next()
    } catch{
        throw new ErroAutenticacao('Token invalido')
    }
}