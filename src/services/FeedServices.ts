import { HttpApiServices } from "./HttpApiServices";

export class FeedServices extends HttpApiServices {
  async getFeedPrincipal() {
    return await this.get("/feed");
  }

  async getFeedById(id: string) {
    return await this.get(`/feed?id=${id}`);
  }

  async toggleCurtir(id: string) {
    return await this.put(`/like?id=${id}`);
  }

  async enviarComentario(id: string, comentario: string) {
    return await this.post(`/comment?id=${id}`, { comentario });
  }
}
