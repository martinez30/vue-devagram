<script lang="ts">
import { defineComponent } from "vue";
import Avatar from "./Avatar.vue";
import imgCurtir from "@/assets/images/curtir.svg";
import imgCurtiu from "@/assets/images/curtir_cheio.svg";
import { FeedServices } from "@/services/FeedServices";

const feedServices = new FeedServices();

export default defineComponent({
  setup() {
    return {
      loggedUserId: localStorage.getItem("_id"),
    };
  },
  props: {
    post: null,
  },
  methods: {
    navegarParaPerfil() {},
    async toggleCurtir() {
      try {
        await feedServices.toggleCurtir(this.post._id);
        const index = this.post?.likes?.findIndex(
          (e: string) => e === this.loggedUserId
        );
        if (index != -1) {
          this.post?.likes?.splice(index, 1);
        } else {
          this.post?.likes.push(this.loggedUserId);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    obterIconCurtir() {
      return this.post?.likes &&
        this.post?.likes?.findIndex((e: string) => e === this.loggedUserId) != 1
        ? imgCurtiu
        : imgCurtir;
    },
  },
  components: { Avatar },
});
</script>
<template>
  <div class="container-postagem">
    <div @click="navegarParaPerfil">
      <section class="cabecalho">
        <Avatar :image="post?.usuario?.avatar" />
        <strong>{{ post?.usuario.nome }}</strong>
      </section>
    </div>

    <div class="foto">
      <img :src="post?.foto" alt="Imagem da publicacao" />
    </div>

    <div class="rodape">
      <div class="acoes">
        <img
          :src="obterIconCurtir"
          alt="Icone curtir"
          class="feedIcone"
          @click="toggleCurtir"
        />
        <img
          src="@/assets/images/comentario.svg"
          alt="Icone comentario"
          class="feedIcone"
        />
        <span class="curtidas">
          Curtido por <strong>{{ post?.likes?.length }}</strong> pessoa{{
            post?.likes?.length == 1 ? "" : "s"
          }}
        </span>
      </div>

      <div class="descricao">
        <strong>{{ post?.usuario.nome }}</strong>
        <p>{{ post?.descricao }}</p>
      </div>

      <div class="comentarios">
        <div v-for="(comentario, index) in post?.comentarios" :key="index">
          <strong>{{ comentario.nome }}</strong>
          <p>{{ comentario.comentario }}</p>
        </div>
      </div>

      <div class="container-comentario">
        <!-- implementar comentario -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="@/assets/styles/postagem.scss"></style>
