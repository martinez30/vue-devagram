import { HttpApiServices } from "./HttpApiServices";

export class UsuarioServices extends HttpApiServices {
  async pesquisar(filtro: string) {
    return this.get(`/pesquisa?filtro=${filtro}`);
  }

  async buscarDadosPorId(id?: string) {
    if (id) {
      return this.get(`pesquisa?id=${id}`);
    }

    return await this.get("/usuario");
  }

  async toggleFollow(id: string) {
    return this.put(`/seguir?id=${id}`);
  }
}
