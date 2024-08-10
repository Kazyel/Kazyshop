<script setup>
import LogoOnly from "../../assets/logo-only.png"
</script>

<template>
  <nav class="w-full h-24 flex justify-around items-center p-4 font-noto-serif">
    <a href="/"><img :src="LogoOnly" alt="Logo da Kazyshop" class="size-10 mr-4 cursor-pointer"></a>

    <ul class="flex items-center text-lg">
      <li class="text-white font-medium cursor-pointer border-r pr-4">
        <a class="flex gap-2 items-center group hover:text-violet-300 transition-all duration-300" href="">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            class="size-5 group-hover:text-violet-300 transition-all duration-300">
            <path fill-rule="evenodd"
              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
              clip-rule="evenodd" />
          </svg>

          Store
        </a>
      </li>

      <li class="text-white font-medium cursor-pointer pl-4">
        <router-link :to="{ name: 'Login' }"
          class="flex gap-2 items-center group hover:text-violet-300 transition-all duration-300" href="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clip-rule="evenodd" />
          </svg>
          Login
        </router-link>
      </li>
    </ul>
  </nav>
</template>


<style></style>