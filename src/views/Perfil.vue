<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Feed from "../components/Feed.vue";
import { FeedServices } from "@/services/FeedServices";
import HeaderPerfil from "../components/HeaderPerfil.vue";
import { UsuarioServices } from "@/services/UsuarioServices";
import Loading from "vue3-loading-overlay";

const feedServices = new FeedServices();
const userServices = new UsuarioServices();

export default defineComponent({
  data() {
    return {
      posts: [],
      usuario: {} as any,
      loading: false,
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const loggedUserId = localStorage.getItem("_id") as string;

      const resultadoUsuario = await userServices.buscarDadosPorId();

      if (!resultadoUsuario || !resultadoUsuario.data) {
        return;
      }

      this.usuario = resultadoUsuario.data;

      const resultado = await feedServices.getFeedById(loggedUserId);

      if (resultado && resultado.data) {
        resultado.data.forEach((p: any) => {
          p.usuario = resultadoUsuario.data;
          return p;
        });
        this.posts = resultado.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  },
  components: { Header, Footer, Feed, HeaderPerfil, Loading },
});
</script>

<template>
  <Loading
    :active="loading"
    :can-cancel="false"
    color="#5E49FF"
    :is-full-page="true"
  />
  <Header :hide="true" />
  <HeaderPerfil
    :usuario="usuario"
    :title="usuario?.nome"
    :showLeft="false"
    :showRight="true"
    :isRightIcon="true"
    v-if="usuario?._id && !loading"
  />
  <Feed :posts="posts" :temCabecalho="true" v-if="!loading" />
  <Footer />
</template>
