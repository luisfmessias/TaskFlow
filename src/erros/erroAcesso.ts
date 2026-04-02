import { ErroRequisicao } from "./erro.js";

export class ErroAcesso extends ErroRequisicao{
    constructor(message: string) {
    super(message, 403);
  }
}
