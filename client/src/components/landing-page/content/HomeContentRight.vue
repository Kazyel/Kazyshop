<script setup>
import { useQuery } from '@tanstack/vue-query'
import HomeContentCard from './HomeContentCard.vue';

const fetchClothes = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

const { data: trendingData, error: trendingError, isPending: trendingIsPending } = useQuery({
  queryKey: ['trending'],
  queryFn: async () => {
    const data = await fetchClothes('http://localhost:3000/api/clothes/trending/3')
    return data
  }
})

const { data: newArrivalsData, error: newArrivalsError, isPending: newArrivalsIsPending } = useQuery({
  queryKey: ['newArrivals'],
  queryFn: async () => {
    const data = await fetchClothes('http://localhost:3000/api/clothes/news/3')
    return data
  }
})
</script>

<template>
  <div
    class="flex flex-col h-full w-full text-white col-start-3 col-span-full py-[4.5rem] z-10 px-16 font-merriweather gap-16">

    <!-- Trending Now -->
    <div class="flex flex-col h-full w-full gap-9">

      <h2 class="text-white text-5xl font-extrabold flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class="stroke-violet-500 fill-violet-600 size-14">
          <path fill-rule="evenodd"
            d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
            clip-rule="evenodd" />
        </svg>
        Trending Now
      </h2>

      <div class="flex flex-wrap gap-6 justify-center">
        <HomeContentCard v-for="item in trendingData" :key="item.id" :item="item"></HomeContentCard>
      </div>
    </div>

    <!-- New Arrivals -->
    <div class="flex flex-col h-full w-full gap-9">

      <h2 class="text-white text-5xl font-extrabold flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class="stroke-violet-500 fill-violet-600 size-14">
          <path fill-rule="evenodd"
            d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
            clip-rule="evenodd" />
        </svg>
        New Arrivals
      </h2>

      <div class="flex flex-wrap gap-6 justify-center">
        <HomeContentCard v-for="item in newArrivalsData" :key="item.id" :item="item"></HomeContentCard>
      </div>
    </div>

  </div>
</template>