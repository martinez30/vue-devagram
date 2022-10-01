<script lang="ts">
import { defineComponent } from "vue";
import imgHomeAtivo from "@/assets/images/navbar/home_roxa.svg";
import imgHomeInativo from "@/assets/images/navbar/home_cinza.svg";
import imgPostAtivo from "@/assets/images/navbar/plus-square_roxo.svg";
import imgPostInativo from "@/assets/images/navbar/plus-square_cinza.svg";
import imgUserAtivo from "@/assets/images/navbar/user_roxo.svg";
import imgUserInativo from "@/assets/images/navbar/user_cinza.svg";
import router from "@/router";

export default defineComponent({
  methods: {
    efetuarNavegacao(name: string) {
      router.push({ name });
    },
    getIcone(name: string) {
      switch (name) {
        case "home":
          if (router.currentRoute.value.name === "home") return imgHomeAtivo;
          else return imgHomeInativo;
        case "perfil":
          if (router.currentRoute.value.name === "perfil") return imgUserAtivo;
          else return imgUserInativo;
        case "publicacao":
          if (router.currentRoute.value.name === "publicacao") return imgPostAtivo;
          else return imgPostInativo;
        default:
          return "";
      }
    },
  },
});
</script>

<template>
  <nav class="container-navegacao">
    <ul>
      <li @click="efetuarNavegacao('home')">
        <img :src="getIcone('home')" alt="Home" class="iconeNav" />
      </li>
      <li @click="efetuarNavegacao('publicacao')">
        <img :src="getIcone('publicacao')" alt="Publicacao" class="iconeNav" />
      </li>
      <li @click="efetuarNavegacao('perfil')">
        <img :src="getIcone('perfil')" alt="Perfil" class="iconeNav" />
      </li>
    </ul>
  </nav>
</template>
