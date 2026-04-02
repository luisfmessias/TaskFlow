import { ErroRequisicao } from "./erro.js";

export class ErroValidacao extends ErroRequisicao {
  constructor(message: string) {
    super(message, 400);
  }
}

