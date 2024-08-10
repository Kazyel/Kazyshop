<script setup>
import { RouterLink } from 'vue-router';
import ContentPhoto from "../../../assets/content-photo-1.jpeg"
</script>

<template>
  <div class="grid grid-cols-1 grid-rows-1 col-span-2 border-r border-white/30">

    <!-- Background Image -->
    <div class="grid grid-cols-1 grid-rows-1 col-span-full row-span-full overflow-hidden">
      <img :src="ContentPhoto" alt="" class="col-span-full row-span-full opacity-30 object-cover h-full w-full" />
      <div class="backdrop-blur-[5px] backdrop-brightness-50 col-span-full row-span-full z-10"></div>
    </div>

    <!-- Left Side Content -->
    <div class="row-span-full col-span-full flex flex-col justify-around gap-14 z-10 text-white px-10 py-6">
      <!-- Title -->
      <div>
        <h2 class="text-6xl font-bold drop-shadow font-noto-serif">
          We're thrilled to <br>have <span class="text-violet-700 underline">you</span> here.
        </h2>
      </div>

      <!-- Description -->
      <div class="text-2xl font-light text-neutral-200 drop-shadow font-merriweather flex flex-col gap-12">
        <p>
          Whether you're looking for the latest fashion trends, timeless classics, or something <i>uniquely
            you,</i>
          our
          collection has it all!
        </p>

        <p class="drop-shadow"> Take your time exploring <span class="font-semibold text-violet-300">our wide
            range of
            clothing
            and accessories, carefully curated</span> to bring out <span class="font-extrabold">the best
            in your
            style.</span>
        </p>

        <p class="drop-shadow">Dive into our selection and find your new favorite wardrobe staples <span
            class="font-semibold text-violet-300 italic">right now.</span>
        </p>
      </div>

      <!-- Call to Action -->
      <div class="flex flex-col gap-4 items-center font-noto-serif">
        <p class="text-3xl font-medium">Can't wait anymore?</p>
        <router-link :to="{ name: 'Login' }"
          class="text-4xl font-extrabold cursor-pointer text-violet-200 hover:underline hover:text-violet-400 transition-all duration-200 drop-shadow-[0px_0px_35px_rgba(196,181,253,1)]">
          We
          got your back.</router-link>
      </div>
    </div>
  </div>
</template>