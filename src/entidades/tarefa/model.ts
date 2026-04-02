import { ErroValidacao } from "@root/erros/erroValidacao.js"

export class Tarefas{
    id?: string
    titulo?: string
    descricao?: string
    status?: string
    dataLimite?: Date
    categoriaId?: Date
    usuarioId?: number
    dataCriacao?: Date
    dataAlteracao?: Date

    validar() {
        const erros = []

        if (!this.titulo || this.titulo.trim().length<=2){
            erros.push('O campo TÍTULO não deve ser vazio e menor que 3 caracteres!')
        }

        if (!this.descricao || this.descricao.trim().length<10){
            erros.push('O campo DESCRIÇÃO não deve ser vazio e menor que 10 caracteres!')
        }

        if (erros.length > 0){
            return new ErroValidacao(`Erros encontrados: ${erros.join('\n')}`)
        }
    }
}
