<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Feed from "../components/Feed.vue";
import { FeedServices } from "@/services/FeedServices";
import Loading from "vue3-loading-overlay"

const feedServices = new FeedServices();

export default defineComponent({
  data() {
    return {
      posts: [],
      loading: false,
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const resultado = await feedServices.getFeedPrincipal();

      if (resultado && resultado.data) {
        this.posts = resultado.data;
      }
    } catch (err) {
      console.log(err);
    }
    finally {
      this.loading = false;
    }
  },
  components: { Header, Footer, Feed, Loading },
});
</script>

<template>
  <Loading :active="loading" :can-cancel="false" color="#5E49FF" :is-full-page="true" />
  <Header />
  <Feed :posts="posts" v-if="posts && posts.length > 0" />
  <Footer />
</template>
