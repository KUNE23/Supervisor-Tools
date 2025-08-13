<script setup>
import Footer from "./components/Footers.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="my-30">
    <Navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>
