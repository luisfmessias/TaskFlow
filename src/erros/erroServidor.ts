import { ErroRequisicao } from "./erro.js";

export class ErroServidor extends ErroRequisicao {
  constructor(message: string) {
    super(message, 500);
  }
}