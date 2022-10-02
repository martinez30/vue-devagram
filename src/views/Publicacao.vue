<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Feed from "../components/Feed.vue";
import HeaderPerfil from "../components/HeaderPerfil.vue";
import HeaderAcoes from "../components/HeaderAcoes.vue";
import { PublicacaoServices } from "@/services/PublicacaoServices";
import Loading from "vue3-loading-overlay";

const publicacaoServices = new PublicacaoServices();

export default defineComponent({
  data() {
    return {
      image: {} as any,
      descricao: "",
      mobile: window.innerWidth <= 992,
      avancar: false,
      loading: false,
    };
  },
  components: { Header, Footer, Feed, HeaderPerfil, HeaderAcoes, Loading },
  methods: {
    abrirSeletor() {
      const input = this.$refs.referenciaInput as HTMLElement;
      input.click();
    },
    setImage(event: any) {
      if (!event.target.files || !event.target.files[0]) return;

      const arquivo = event.target.files[0];
      this.obterPreview(arquivo);
    },
    dropImage(event: any) {
      if (!event.dataTransfer.files || !event.dataTransfer.files[0]) return;

      const arquivo = event.dataTransfer.files[0];
      this.obterPreview(arquivo);
    },
    obterPreview(arquivo: any) {
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
    doAvancar() {
      this.avancar = true;
    },
    async compartilhar() {
      try {
        this.loading = true;
        if (!this.descricao && !this.image.arquivo) {
          return;
        }

        const requisicaoBody = new FormData();
        if (this.descricao) {
          requisicaoBody.append("descricao", this.descricao);
        }

        if (this.image?.arquivo) {
          requisicaoBody.append("file", this.image.arquivo);
        }

        await publicacaoServices.publicar(requisicaoBody);
        return this.$router.push({ name: "home" });
      } catch (e: any) {
        console.log(e);
        if (e?.response?.data?.erro) {
          console.log(e?.response?.data?.erro);
        } else {
          console.log("Nao foi possivel efetuar o login, tente novamente");
        }
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    getTitulo() {
      return this.mobile ? "Nova publicação" : "Criar nova publicação";
    },
    getRightLabel() {
      return this.avancar ? "Compartilhar" : "Avançar";
    },
    getButtonText() {
      return this.mobile ? "Selecionar foto" : "Selecionar do computador";
    },
  },
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
  <div
    class="container-publicacao"
    :class="{ 'not-preview': mobile && image.preview }"
    v-if="!loading"
  >
    <HeaderAcoes
      @acoesCallback="avancar ? compartilhar() : doAvancar()"
      :title="getTitulo"
      :showLeft="mobile"
      :showRight="image?.preview"
      :rightLabel="getRightLabel"
    />
    <div
      class="form"
      v-if="!image?.preview"
      @dragover.prevent
      @drop.prevent="dropImage"
    >
      <img src="@/assets/images/publicacao.svg" alt="Icone publicacao" />
      <span>Arrate sua foto aqui</span>
      <button @click="abrirSeletor">{{ getButtonText }}</button>
      <input
        type="file"
        class="oculto"
        accept="image/*"
        ref="referenciaInput"
        @input="setImage"
      />
    </div>

    <img
      :src="image.preview"
      alt="Publicacao"
      v-if="image?.preview && !avancar"
    />

    <div class="concluir" v-if="image.preview && avancar">
      <img :src="image.preview" alt="Publicacao" />
      <textarea
        name="descricao"
        placeholder="Escreva uma legenda"
        v-model="descricao"
      ></textarea>
    </div>
  </div>
  <Footer />
</template>

<style lang="scss" src="@/assets/styles/publicacao.scss" />
