<script setup lang="ts">
import { ref } from "vue";
import { useMutation } from '@tanstack/vue-query'
// @ts-ignore
import LoginBg from "../../assets/login-bg.jpg"

type Login = {
  message: string,
  token: string
}

type User = {
  email: string,
  password: string
}

const email = ref("")
const password = ref("")

const fetchLogin = async (user: User): Promise<Login> => {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (!response.ok) {
    console.log(response)
    throw new Error('Network response was not ok')
  }

  return await response.json()
}

const { mutate: login, isError: loginError } = useMutation({
  mutationFn: (user: User) => {
    return fetchLogin(user)
  }, onSuccess(data) {
    console.log(data)
  },
  onError(error) {
    console.log(error)
  }
})

const handleLogin = async () => {
  login({ email: password.value, password: password.value })
}
</script>

<template>
  <div
    class="grid grid-cols-8 grid-rows-1 relative w-[968px] aspect-video bg-violet-500 rounded-lg overflow-hidden font-merriweather drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">

    <!-- Left Grid -->
    <div class="col-start-1 col-end-5 text-white row-span-full z-10 px-14 w-full">
      <div class="flex flex-col justify-center items-center h-full gap-4">

        <!-- Title -->
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            class="size-24 fill-kazy-purple-dark">
            <path fill-rule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clip-rule="evenodd" />
          </svg>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="flex flex-col gap-9 p-6 w-full">
          <!-- Inputs -->
          <div class="flex flex-col gap-10">
            <input type="text" placeholder="Enter your email..." v-model="email"
              class="w-full bg-violet-100 rounded border-2 border-violet-800 px-3 py-2 text-violet-900 placeholder:text-violet-900">

            <input type="password" placeholder="Enter your password..." v-model="password"
              class="w-full rounded border-2 border-violet-800 bg-violet-100 px-3 py-2 text-violet-900 placeholder:text-violet-900">

            <div v-if="loginError">
              <p class="text-black">Invalid email or password</p>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            class="w-full rounded border-2 bg-violet-900 hover:bg-violet-700 transition-all duration-150 py-2 text-white font-semibold flex items-center justify-center gap-4">Login
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
              <path fill-rule="evenodd"
                d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
                clip-rule="evenodd" />
              <path fill-rule="evenodd"
                d="M1 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H1.75A.75.75 0 0 1 1 10Z"
                clip-rule="evenodd" />
            </svg>

          </button>

        </form>

        <div class="flex flex-col gap-2">
          <p class="text-black font-light text-lg italic"> - Don't have an account?</p>
          <a href="/"
            class="text-normal hover:text-violet-900 duration-200 transition-all font-extrabold text-black flex items-center gap-2 justify-center">
            Sign Up
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4 mb-1">
              <path fill-rule="evenodd"
                d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
                clip-rule="evenodd" />
              <path fill-rule="evenodd"
                d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
                clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Right Grid -->
    <div
      class="col-start-5 col-span-full row-span-full z-20 flex flex-col justify-center rounded-tr-lg rounder-br-lg items-center overflow-hidden bg-kazy-purple-dark/85">

      <!-- Image Background -->
      <img :src="LoginBg" alt="Login Background" class="w-full h-full object-cover brightness-[.3] blur-lg scale-110">
    </div>

    <!-- Background Gradient -->
    <div
      class="absolute bottom-0 left-0 z-[1] w-full h-full from-violet-400 via-violet-200 via-35% bg-gradient-to-br" />
  </div>
</template>

<style></style>