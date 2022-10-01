<script lang="ts">
import { defineComponent } from "vue";
import Avatar from "./Avatar.vue";
import imgCurtir from "@/assets/images/curtir.svg";
import imgCurtiu from "@/assets/images/curtir_cheio.svg";
import imgComentario from "@/assets/images/comentario.svg";
import imgComentarioAtivo from "@/assets/images/comentario_ativo.svg";
import { FeedServices } from "@/services/FeedServices";

const feedServices = new FeedServices();
const MAX_DESCRICAO = 40;

export default defineComponent({
  setup() {
    return {
      loggedUserId: localStorage.getItem("_id"),
      loggedAvatar: localStorage.getItem("avatar"),
      loggedName: localStorage.getItem("nome"),
      MAX_DESCRICAO,
    };
  },
  props: {
    post: null,
  },
  methods: {
    navegarParaPerfil() {},
    toggleIconComentario() {
      this.showComentario = !this.showComentario;
    },
    toggleDescricaoFull() {
      this.showDescricaoFull = !this.showDescricaoFull;
    },
    async enviarComentario() {
      try {
        if (!this.comentario || !this.comentario.trim()) {
          return;
        }

        // await feedServices.enviarComentario(this.post._id, this.comentario);

        this.post?.comentarios?.push({
          usuarioId: this.loggedUserId,
          nome: this.loggedName,
          comentario: this.comentario,
        });

        this.comentario = "";
        this.showComentario = false;
      } catch (e) {
        console.log(e);
      }
    },
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
  data() {
    return {
      showComentario: false,
      comentario: "",
      showDescricaoFull: false,
    };
  },
  computed: {
    obterIconCurtir() {
      return this.post?.likes &&
        this.post?.likes?.findIndex((e: string) => e === this.loggedUserId) != 1
        ? imgCurtiu
        : imgCurtir;
    },
    obterIconeComentario() {
      return this.showComentario ? imgComentarioAtivo : imgComentario;
    },
    exibirDescricao() {
      if (this.showDescricaoFull) {
        return this.post?.descricao;
      }

      return this.post?.descricao?.length > MAX_DESCRICAO
        ? this.post?.descricao?.substring(0, MAX_DESCRICAO)
        : this.post?.descricao;
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
          :src="obterIconeComentario"
          alt="Icone comentario"
          class="feedIcone"
          @click="toggleIconComentario"
        />
        <span class="curtidas">
          Curtido por <strong>{{ post?.likes?.length }}</strong> pessoa{{
            post?.likes?.length == 1 ? "" : "s"
          }}
        </span>
      </div>

      <div class="descricao">
        <strong>{{ post?.usuario.nome }}</strong>
        <p>
          {{ exibirDescricao }}
          <span
            v-if="post.descricao.length > MAX_DESCRICAO && !showDescricaoFull"
            @click="toggleDescricaoFull"
            >mais
          </span>
        </p>
      </div>

      <div class="comentarios">
        <div v-for="(comentario, index) in post?.comentarios" :key="index">
          <strong>{{ comentario.nome }}</strong>
          <p>{{ comentario.comentario }}</p>
        </div>
      </div>

      <div class="container-comentario" v-if="showComentario">
        <Avatar alt="imagem do usuario logado" :image="loggedAvatar ?? ''" />
        <input
          type="text"
          placeholder="Adicione um comentário..."
          name="comentario"
          v-model="comentario"
          @keyup.enter="enviarComentario"
        />
        <button @click="enviarComentario">Publicar</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="@/assets/styles/postagem.scss"></style>
