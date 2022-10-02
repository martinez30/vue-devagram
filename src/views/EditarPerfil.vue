<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Feed from "../components/Feed.vue";
import Avatar from "../components/Avatar.vue";
import avatarXCicle from "@/assets/images/x-circle.svg";
import HeaderAcoes from "../components/HeaderAcoes.vue";
import { UsuarioServices } from "@/services/UsuarioServices";
import router from "@/router";
import Loading from "vue3-loading-overlay";

const userServices = new UsuarioServices();

export default defineComponent({
  data() {
    return {
      nome: localStorage.getItem("nome") as string,
      avatar: localStorage.getItem("avatar") as string,
      imagem: {} as any,
      loading: false,
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
  methods: {
    limpar() {
      this.nome = "";
    },
    abrirSeletor() {
      console.log("abrir");
      const input = this.$refs.referenciaInput as HTMLElement;
      input.click();
    },
    selecionarImagem(event: any) {
      if (event?.target?.files && event.target.files[0]) {
        const arquivo = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(arquivo);
        fileReader.onloadend = () => {
          const imagemFinal = {
            preview: fileReader.result,
            arquivo,
          };

          this.imagem = imagemFinal;
        };
      }
    },
    async concluirEdicao() {
      try {
        this.loading = true;
        if (!this.nome && !this.imagem) {
          return;
        }

        const requisicaoBody = new FormData();
        if (this.nome) {
          requisicaoBody.append("nome", this.nome);
        }

        if (this.imagem?.arquivo) {
          requisicaoBody.append("file", this.imagem.arquivo);
        }

        await userServices.atualizar(requisicaoBody);

        if (this.nome) {
          localStorage.setItem("nome", this.nome);
        }

        if (this.imagem.arquivo) {
          localStorage.setItem("avatar", this.imagem?.preview);
        }

        return router.back();
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
  components: { Header, Footer, Feed, Avatar, HeaderAcoes, Loading },
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
  <div class="container-editar" v-if="!loading">
    <HeaderAcoes
      :showLeft="true"
      :showRight="true"
      rightLabel="Confirmar"
      title="Editar perfil"
      @acoesCallback="concluirEdicao"
    />
    <Avatar :image="getImagem" />
    <button @click="abrirSeletor">Alterar Foto de perfil</button>
    <input
      type="file"
      class="oculto"
      accept="image/*"
      ref="referenciaInput"
      @input="selecionarImagem"
    />
    <div class="input">
      <span>Nome</span>
      <input type="text" v-model="nome" placeholder="Nome" />
      <img :src="avatarXCicle" alt="Limpar" @click="limpar" v-if="nome" />
    </div>
  </div>
  <Footer />
</template>

<style lang="scss" src="@/assets/styles/editar.scss" />
