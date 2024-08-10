<script setup>
import LoginCard from '../components/login-page/LoginCard.vue'
import BlurryBg from '../assets/blurry-gradient-haikei2.svg'
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen overflow-hidden relative">
    <LoginCard />
    <img :src="BlurryBg" class="absolute top-0 left-0 right-0 w-full -z-10 blur-2xl scale-125"></img>
  </div>
</template>

<style scoped></style>