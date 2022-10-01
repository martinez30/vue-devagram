import { HttpApiServices } from "./HttpApiServices";

export class UsuarioServices extends HttpApiServices {
  async pesquisar(filtro: string) {
    return this.get(`/pesquisa?filtro=${filtro}`);
  }
}
