<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Feed from "../components/Feed.vue";
import { FeedServices } from "@/services/FeedServices";

const feedServices = new FeedServices();

const data = Array.from({ length: 5 }, (n) => ({
  _id: "dfkjgndfkgjdffng",
  foto: "https://github.com/martinez30.png",
  descricao: "Postagem Postagem Postagem Postagem Postagem Postagem Postagem Postagem Postagem Postagem Postagem Postagem Postagem Postagem Postagem Postagem",
  likes: [],
  usuario: {
    avatar: "https://github.com/martinez30.png",
    nome: "Paulo",
  },
  comentarios: [
    {
      nome: "Zezin",
      comentario: "Legal",
    },
  ],
}));

export default defineComponent({
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    try {
      // const resultado = await feedServices.getFeedPrincipal();

      // if (resultado && resultado.data) {
      //   this.posts = resultado.data;
      // }

      this.posts = data;
    } catch (err) {
      console.log(err);
    }
  },
  components: { Header, Footer, Feed },
});
</script>

<template>
  <Header />
  <Feed :posts="posts" />
  <Footer />
</template>
