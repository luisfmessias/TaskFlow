import { ErroValidacao } from "@root/erros/erroValidacao.js";

const regexValidacaoEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export class Usuarios {
    id?: string
    nome?: string
    email?: string

    private _senha?: string
    get senha(): string | undefined {
        return this._senha?.replace(/\s/g, '')
    }
    set senha(value: string) {
        this._senha = value;
    }

    dataCriacao?: Date
    dataAlteracao?: Date

    validar() {
        const erros = []
        if (!this.nome || /\d/g.test(this.nome)) {
            erros.push('O campo NOME não pode ser nulo ou conter digitos!')
        }

        if (!this.email || !regexValidacaoEmail.test(this.email)) {
            erros.push('O campo EMAIL está inválido')
        }

        if (!this.senha || this.senha.trim().length < 6) {
            erros.push('A senha deve conter pelo menos 6 caracteres')
        }

        if (erros.length > 0) {
            throw new ErroValidacao(`Erros encontrados: ${erros.join('\n')}`)
        }
    }
}