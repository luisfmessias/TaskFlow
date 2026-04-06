import express, { NextFunction } from 'express'
import usuarioRotas from './rotas/usuario.js'
import categoriaRotas from './rotas/categoria.js'
import tarefaRotas from './rotas/tarefa.js'
import { ErroRequisicao } from './erros/erro.js'

export const app = express()

app.use(express.json())

app.use('/api/v1/usuarios', usuarioRotas)
app.use('/api/v1/categorias', categoriaRotas)
app.use('/api/v1/tarefas', tarefaRotas)


app.use((erro: any, req: express.Request, res: express.Response, next: NextFunction) => {
    if (erro instanceof ErroRequisicao) {
        res.status(erro.statusCode).json({ erro: erro.message })
        return
    }
    res.status(500).json({ erro: 'Erro interno do servidor' })
})

export default app