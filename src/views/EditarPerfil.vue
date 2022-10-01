<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Feed from "../components/Feed.vue";
import { FeedServices } from "@/services/FeedServices";
import HeaderPerfil from "../components/HeaderPerfil.vue";
import { UsuarioServices } from "@/services/UsuarioServices";
import HeaderAcoes from "../components/HeaderAcoes.vue";

const feedServices = new FeedServices();
const userServices = new UsuarioServices();

export default defineComponent({
  data() {
    return {
      posts: [],
      usuario: {} as any,
    };
  },
  components: { Header, Footer, Feed, HeaderPerfil, HeaderAcoes },
});
</script>

<template>
  <Header :hide="true" />
  <HeaderAcoes :isRightIcon="true" :showRight="true" title="Editar perfil" />
  <Feed :posts="posts" :temCabecalho="true" />
  <Footer />
</template>
