<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Feed from "../components/Feed.vue";
import { FeedServices } from "@/services/FeedServices";
import { UsuarioServices } from "@/services/UsuarioServices";
import router from "@/router";

const feedServices = new FeedServices();
const userServices = new UsuarioServices();

export default defineComponent({
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    try {
      console.log("id");
      if (!this.$route.params.id) {
        return router.push({ name: "home" });
      }
      const id = this.$route.params.id as string;

      const usuarioResult = await userServices.buscarDadosPorId(id);

      if (!usuarioResult || !usuarioResult.data) {
        return;
      }

      const resultado = await feedServices.getFeedById(id);

      if (resultado && resultado.data) {
        const postsFinal = resultado.data.map((p: any) => {
          p.usuario = usuarioResult.data
          return p;
        })
        this.posts = resultado.data;
      }
    } catch (err) {
      console.log(err);
    }
  },
  components: { Header, Footer, Feed },
});
</script>

<template>
  <Header :hide="true"/>
  <Feed :posts="posts" :temCabecalho="true" />
  <Footer />
</template>
