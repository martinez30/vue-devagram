<script lang="ts">
import router from "@/router";
import { UsuarioServices } from "@/services/UsuarioServices";
import { defineComponent } from "vue";
import Navegacao from "./Navegacao.vue";
import ResultadoBusca from "./ResultadoBusca.vue";

const usuarioService = new UsuarioServices();

export default defineComponent({
  props: {
    hide: Boolean,
  },
  data() {
    return {
      resultado: [] as any,
      inputFocus: false,
      pesquisa: "",
    };
  },
  methods: {
    setFocus(v: boolean) {
      this.inputFocus = v;
    },
    goPrincpal() {
      if (this.$route.name == "home") return;
      console.log("redirect");
      router.push({ name: "home" });
    },
    async buscarUsuario(event: any) {
      try {
        if (!event.target.value) {
          this.resultado = [];
          this.pesquisa = "";
          return;
        }

        this.pesquisa = event.target.value;

        if (!this.pesquisa || this.pesquisa.trim().length < 2) {
          return;
        }

        const resposta = await usuarioService.pesquisar(this.pesquisa);

        if (resposta && resposta.data) {
          this.resultado = resposta.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: { Navegacao, ResultadoBusca },
});
</script>

<template>
  <header class="container-header" :class="{ hide: hide }">
    <div class="principal">
      <img
        src="@/assets/images/logo_horizontal.svg"
        alt="Logo Devagram"
        @click="goPrincpal"
      />
      <div class="group">
        <div class="pesquisa" :class="{ focus: inputFocus }">
          <img
            src="@/assets/images/navbar/search.svg"
            alt="pesquisa"
            layout="fill"
            class="icon"
          />
          <input
            type="text"
            placeholder="Pesquisar"
            :value="pesquisa"
            @input="buscarUsuario"
            @focus="setFocus(true)"
            @blur="setFocus(false)"
          />
        </div>
      </div>
      <Navegacao />
    </div>
    <div class="resultado" v-if="resultado.length > 0">
      <ResultadoBusca
        v-for="user in resultado"
        :key="user._id"
        :id="user._id"
        :nome="user.nome"
        :email="user.email"
        :avatar="user.avatar"
      />
    </div>
  </header>
</template>

<style lang="scss" src="@/assets/styles/header.scss" />
