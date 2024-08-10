<script setup>
import HomeContentLeft from './HomeContentLeft.vue'
import HomeContentRight from './HomeContentRight.vue'
</script>

<template>
  <section id="content" class="relative min-h-screen grid grid-cols-8 grid-rows-1">
    <!-- Layout Grid -->
    <div class="col-start-1 col-span-full row-span-full grid grid-cols-5 grid-rows-1 overflow-hidden mt-6">

      <!-- Left Side Grid -->
      <HomeContentLeft />

      <!-- Right Side Grid -->
      <HomeContentRight />

    </div>

    <div class="absolute top-0 left-0 w-full h-full z-[1] from-black via-transparent via-25% bg-gradient-to-b" />
    <div class="absolute bottom-0 left-0 w-full h-full z-[1] from-black via-transparent via-10% bg-gradient-to-t " />

  </section>
</template>