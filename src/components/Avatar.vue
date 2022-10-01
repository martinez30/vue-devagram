<script lang="ts">
import { defineComponent } from "vue";
import avatarImg from "../assets/images/avatar.svg";

export default defineComponent({
  props: {
    image: String,
  },
  computed: {
    escolherAvatar(): string {
      return this.image ? this.image : avatarImg;
    },
  },
});
</script>
<template>
  <img :src="escolherAvatar" alt="Foto do usuario" class="avatar">
</template>
