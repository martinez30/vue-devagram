<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import Avatar from "./Avatar.vue";

export default defineComponent({
  props: {
    nome: String,
    email: String,
    avatar: String,
    id: String,
  },
  methods: {
    onClick() {
      router.push(`/usuario/${this.id}`);
    },
  },
  components: { Avatar },
});
</script>
<template>
  <footer class="container-resultado">
    <Avatar :image="avatar" />
    <div class="info">
      <strong>{{ nome }}</strong>
      <span>{{ email }}</span>
    </div>
  </footer>
</template>

<style lang="scss" src="@/assets/styles/resultadoBusca.scss" />
