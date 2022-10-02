<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Feed from "../components/Feed.vue";
import { FeedServices } from "@/services/FeedServices";
import HeaderPerfil from "../components/HeaderPerfil.vue";
import HeaderAcoes from "../components/HeaderAcoes.vue";

export default defineComponent({
  data() {
    return {
      image: {} as any,
      descricao: "",
      mobile: window.innerWidth <= 992,
      avancar: false,
    };
  },
  components: { Header, Footer, Feed, HeaderPerfil, HeaderAcoes },
  methods: {
    abrirSeletor() {
      const input = this.$refs.referenciaInput as HTMLElement;
      input.click();
    },
    setImage(event: any) {
      if (!event.target.files || !event.target.files[0]) return;

      const arquivo = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(arquivo);
      fileReader.onloadend = () => {
        const imageFinal = {
          preview: fileReader.result,
          arquivo,
        };

        this.image = imageFinal;
      };
    },
    callBackRightButton() {
      return;
    },
  },
  computed: {
    getTitulo() {
      return this.mobile ? "Nova publicação" : "Criar nova publicação";
    },
    getRightLabel() {
      return this.avancar ? "Concluir" : "Avançar";
    },
    getButtonText() {
      return this.mobile ? "Selecionar foto" : "Selecionar do computador";
    },
  },
});
</script>

<template>
  <Header :hide="true" />
  <div class="container-publicacao">
    <HeaderAcoes
      @acoesCallback="callBackRightButton"
      :title="getTitulo"
      :showLeft="mobile"
      :showRight="image?.preview"
      :rightLabel="getRightLabel"
    />
    <div class="form" v-if="!image?.preview">
      <img src="@/assets/images/publicacao.svg" alt="Icone publicacao" />
      <span>Arrate sua foto aqui</span>
      <button @click="abrirSeletor">{{ getButtonText }}</button>
      <input
        type="file"
        class="oculto"
        accept="image/*"
        ref="referenciaInput"
      />
    </div>
  </div>
  <Footer />
</template>

<style lang="scss" src="@/assets/styles/publicacao.scss" />
