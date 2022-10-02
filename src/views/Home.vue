<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Feed from "../components/Feed.vue";
import { FeedServices } from "@/services/FeedServices";

const feedServices = new FeedServices();

export default defineComponent({
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    try {
      const resultado = await feedServices.getFeedPrincipal();

      if (resultado && resultado.data) {
        this.posts = resultado.data;
      }
    } catch (err) {
      console.log(err);
    }
  },
  components: { Header, Footer, Feed },
});
</script>

<template>
  <Header />
  <Feed :posts="posts" />
  <Footer />
</template>
