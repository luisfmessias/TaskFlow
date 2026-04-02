import { ErroRequisicao } from "./erro.js";

export class ErroAutenticacao extends ErroRequisicao{
    constructor(message: string) {
    super(message, 401);
  }
}
