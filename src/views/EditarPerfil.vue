<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Feed from "../components/Feed.vue";
import Avatar from "../components/Avatar.vue";
import avatarXCicle from "@/assets/images/x-circle.svg";
import HeaderAcoes from "../components/HeaderAcoes.vue";

export default defineComponent({
  data() {
    return {
      nome: localStorage.getItem("nome") as string,
      avatar: localStorage.getItem("avatar") as string,
      imagem: {} as any,
    };
  },
  setup() {
    return {
      avatarXCicle,
    };
  },
  computed: {
    getImagem() {
      return this.imagem?.preview ? this.imagem?.preview : this.avatar;
    },
  },
  components: { Header, Footer, Feed, Avatar, HeaderAcoes },
});
</script>

<template>
  <Header :hide="true" />
  <div class="container-editar">
    <HeaderAcoes
      :showLeft="true"
      :showRight="true"
      rightLabel="Confirmar"
      title="Editar perfil"
    />
    <Avatar :image="getImagem" />
    <button>Alterar Foto de perfil</button>
    <input type="text" class="oculto" accept="image/*" ref="referenciaInput" />
    <div class="input">
      <span>Nome</span>
      <input type="text" v-model="nome" placeholder="Nome" />
      <img :src="avatarXCicle" alt="Limpar" />
    </div>
  </div>
  <Footer />
</template>

<style lang="scss" src="@/assets/styles/editar.scss" />