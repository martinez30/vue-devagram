<script lang="ts">
import router from "@/router";
import { LoginServices } from "@/services/LoginServices";
import { defineComponent } from "vue";

const loginServices = new LoginServices();

export default defineComponent({
  props: {
    title: String,
    rightLabel: String,
    showLeft: Boolean,
    isLeftIcon: Boolean,
    showRight: Boolean,
    isRightIcon: Boolean,
  },
  methods: {
    goBack() {
      router.back();
    },
    logout() {
      loginServices.logout();
      router.push({ name: "login" });
    },
  },
});
</script>
<template>
  <div class="container-header-acoes">
    <img
      src="@/assets/images/voltar.svg"
      alt="voltar"
      v-if="showLeft && isLeftIcon"
      @click="goBack"
    />
    <span v-else-if="showLeft && !isLeftIcon">Cancelar</span>
    <strong>{{ title }}</strong>
    <img
      src="@/assets/images/sair.svg"
      alt="sair"
      v-if="showRight && isRightIcon"
      @click="logout"
    />
    <span v-else-if="showRight && !isRightIcon" class="principal">{{
      rightLabel
    }}</span>
  </div>
</template>

<style lang="scss" src="@/assets/styles/headerAcoes.scss" />
