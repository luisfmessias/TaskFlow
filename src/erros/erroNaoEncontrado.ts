import { ErroRequisicao } from "./erro.js";

export class ErroNaoEncontrado extends ErroRequisicao{
    constructor(message: string) {
    super(message, 404);
  }
}
