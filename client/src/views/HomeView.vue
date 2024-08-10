<script setup>
import NavbarHome from '../components/landing-page/NavbarHome.vue'
import HomeContent from '../components/landing-page/content/HomeContent.vue'
import KazyshopLogo from "../assets/kazyshop-logo.png"
import MainBackground from "../assets/main-bg.jpeg"
</script>

<template>
  <section class="h-screen flex flex-col">
    <!-- Layout Grid -->
    <div class="relative grid grid-cols-1 grid-rows-1 flex-1 overflow-hidden">
      <div class="flex flex-col gap-6 items-center justify-center h-full col-span-full row-span-full z-50">
        <!-- Navbar -->
        <NavbarHome class="mb-6" />

        <div class="flex-1 flex flex-col items-center justify-around h-full">
          <!-- Main Title -->
          <div class="font-merriweather">
            <!-- Logo -->
            <img :src="KazyshopLogo" alt="Logo da Kazyshop"
              class="h-24 sm:h-44 mb-24 m-auto drop-shadow-[0_0px_35px_rgba(255,255,255,.85)]">

            <div class="text-neutral-300 px-6 font-light text-center flex flex-col gap-4 mb-14 leading-10">
              <p class="text-3xl">
                Step into a
                <span class="text-violet-400 font-semibold ">new world</span>
                where
                <i>fashion</i>
                meets
                <i>innovation</i>.
              </p>

              <p class="drop-shadow-[0px_0px_30px_rgba(255,255,255,1)] text-white text-[2.5rem] mt-4 font-extrabold">
                Your
                style
                journey
                begins now.</p>
            </div>
          </div>

          <!-- Learn More -->
          <div class="flex flex-col items-center group">
            <a class="text-white rounded font-bold cursor-pointer text-lg group-hover:text-violet-400 transition duration-300"
              href="#content">Learn more</a>

            <a href="#content">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor"
                class="size-6 stroke-white mt-2 cursor-pointer group-hover:translate-y-1 transition-all duration-300 group-hover:stroke-violet-400">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Background -->
      <img :src="MainBackground" alt="Main Background"
        class="-z-10 w-full h-full object-cover col-span-full brightness-[1.2] row-span-full scale-110 blur-[4px] opacity-25" />

      <div class="absolute top-0 left-0 w-full h-full z-10 from-black via-black/15 bg-gradient-to-t" />
    </div>
  </section>

  <!-- Content Section -->
  <HomeContent />

  <!-- Footer -->
  <footer class="w-full px-16 pt-16 pb-9 bg-black flex items-center justify-between">
    <div class="flex">
      <p class="text-white pr-4 border-r border-white font-thin"><span class="font-semibold">© Kazyshop &middot;
          2024</span>
      </p>
      <a href="/" class="text-white pl-4 pr-4 border-r border-white font-thin hover:underline">Privacy Policy</a>
      <a href="/" class="text-white pl-4 font-thin hover:underline">Terms of Service</a>
    </div>
    <div class="flex gap-8 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24"
        class="fill-white cursor-pointer hover:fill-violet-300 transition-all duration-200">
        <path
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24"
        class="fill-white cursor-pointer hover:fill-violet-300 transition-all duration-200">
        <path
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1"
        width="26px" height="26px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"
        class="fill-white cursor-pointer hover:fill-violet-300 transition-all duration-200">
        <path
          d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24"
        class="fill-white cursor-pointer hover:fill-violet-300 transition-all duration-200">
        <path
          d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
      </svg>
    </div>
  </footer>
</template>

<style>
body {
  background-color: #100d10;
}
</style>