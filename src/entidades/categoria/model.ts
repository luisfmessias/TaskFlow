import { ErroValidacao } from "@root/erros/erroValidacao.js";

export class Categorias {
    id?: string
    nome?: string
    usuarioId?: number
    dataCriacao?: Date
    dataAlteracao?: Date

    validar() {
        const erros = []

        if (!this.nome || /\d/g.test(this.nome)) {
            erros.push('O campo NOME não pode ser nulo ou conter digitos!')
        }

        if (erros.length > 0) {
            return new ErroValidacao(`Erros encontrados: ${erros.join('\n')}`)
        }
    }
}