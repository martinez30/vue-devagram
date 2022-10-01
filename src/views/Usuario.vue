<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Feed from "../components/Feed.vue";
import { FeedServices } from "@/services/FeedServices";
import { UsuarioServices } from "@/services/UsuarioServices";
import router from "@/router";
import HeaderPerfil from "../components/HeaderPerfil.vue";

const feedServices = new FeedServices();
const userServices = new UsuarioServices();

export default defineComponent({
  data() {
    return {
      posts: [],
      usuario: {} as any,
      mobile: window.innerWidth <= 992,
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

      this.usuario = usuarioResult.data;

      const resultado = await feedServices.getFeedById(id);

      if (resultado && resultado.data) {
        const postsFinal = resultado.data.map((p: any) => {
          p.usuario = usuarioResult.data;
          return p;
        });
        this.posts = resultado.data;
      }
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    getShowLeft() {
      return this.mobile;
    },
  },
  components: { Header, Footer, Feed, HeaderPerfil },
});
</script>

<template>
  <Header :hide="true" />
  <HeaderPerfil
    v-if="usuario?._id"
    :usuario="usuario"
    :title="usuario?.nome"
    :showLeft="getShowLeft"
    :isLeftIcon="true"
    :showRight="false"
    :isRightIcon="false"
  />
  <Feed :posts="posts" :temCabecalho="true" />
  <Footer />
</template>
