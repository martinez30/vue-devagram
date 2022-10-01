<script lang="ts">
import { defineComponent } from "vue";
import HeaderAcoes from "./HeaderAcoes.vue";
import Avatar from "./Avatar.vue";
import { UsuarioServices } from "@/services/UsuarioServices";
import router from "@/router";

const userService = new UsuarioServices();

export default defineComponent({
  setup() {
    return {
      loggedId: localStorage.getItem("_id"),
    };
  },
  props: {
    usuario: {} as any,
    title: String,
    rightLabel: String,
    showLeft: Boolean,
    isLeftIcon: Boolean,
    showRight: Boolean,
    isRightIcon: Boolean,
  },
  computed: {
    obterTextoBotaoPrincipal() {
      if (this.usuario?._id === this.loggedId) {
        return "Editar Perfil";
      } else {
        return !this.usuario.segueEsseUsuario ? "Deixar de seguir" : "Seguindo";
      }
    },
  },
  methods: {
    async acaoBotao() {
      if (this.usuario?._id === this.loggedId) {
        return router.push({ name: "editar" });
      }

      try {
        await userService.toggleFollow(this.usuario?._id);
        this.usuario.segueEsseUsuario = !this.usuario.segueEsseUsuario
        this.usuario.seguidores += this.usuario?.segueEsseUsuario ? 1 : -1
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: { HeaderAcoes, Avatar },
});
</script>
<template>
  <div class="container-header-perfil">
    <HeaderAcoes
      :title="title"
      :rightLabel="rightLabel"
      :showLeft="showLeft"
      :isLeftIcon="isLeftIcon"
      :showRight="showRight"
      :isRightIcon="isRightIcon"
    />
    <div class="perfil">
      <Avatar :image="usuario?.avatar" class="avatar" />
      <div class="infos">
        <idv class="dados">
          <div class="status">
            <strong>{{ usuario?.publicacoes }}</strong>
            <span>Publicações</span>
          </div>
          <div class="status">
            <strong>{{ usuario?.seguidores }}</strong>
            <span>Seguidores</span>
          </div>
          <div class="status">
            <strong>{{ usuario?.seguindo }}</strong>
            <span>Seguindo</span>
          </div>
        </idv>
        <button :class="{ principal: usuario.segueEsseUsuario }" @click="acaoBotao">
          {{ obterTextoBotaoPrincipal }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="@/assets/styles/headerPerfil.scss" />
