import { HttpApiServices } from "./HttpApiServices";

export class FeedServices extends HttpApiServices {
  async getFeedPrincipal() {
    return await this.get("/feed");
  }

  async getFeedById(id: string) {
    return await this.get(`/feed?id=${id}`);
  }
}
