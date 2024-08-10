<script setup lang="ts">
import { computed, PropType, reactive } from 'vue'

type Item = {
  id: number
  data: {
    name: string
    description: string
    price: number
    imageUrl: string
  }
}

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true
  }
})

const item = reactive(props.item)

const itemNameLimit = computed(() => {
  return item.data.name.length > 24 ? item.data.name.substring(0, 24) + '...' : item.data.name
})

const itemDescriptionLimit = computed(() => {
  return item.data.description.length > 25 ? item.data.description.substring(0, 25) + '...' : item.data.description
})
</script>

<template>
  <div
    class="group grid grid-cols-1 grid-rows-1 h-[326px] w-[226px] from-white to-neutral-300 rounded overflow-hidden drop-shadow-[0_0px_1px_rgba(255,255,255,1)]">

    <!-- Item Images -->
    <img
      class="col-span-full row-span-full -z-50
    h-full w-full object-cover scale-110 object-[0px_-40px] group-hover:scale-125 group-hover:rotate-1 transition-all ease-in-out duration-300"
      :src="item.data.imageUrl" :alt="item.data.description">

    <!-- Item Description -->
    <div class="col-span-full row-span-full flex flex-col justify-end p-4 h-full w-full gap-3">
      <!-- Item Price -->
      <p class="font-bold text-white text-2xl">{{ item.data.price }}<span
          class="text-violet-400 text-base pl-1">$</span>
      </p>

      <div class="flex flex-col gap-1">
        <!-- Item Name -->
        <h2
          class="drop-shadow-[0_1px_1px_rgba(0,_0,_0,1)] text-md font-bold z-10 hover:text-violet-300 hover:underline hover:underline-offset-4 cursor-pointer">
          {{ itemNameLimit }}</h2>

        <!-- Item Description -->
        <p class="drop-shadow-[0_1px_1px_rgba(0,_0,_0,1)] text-sm text-neutral-300 z-10">{{ itemDescriptionLimit }}</p>
      </div>
    </div>

    <span
      class="col-span-full row-span-full bg-gradient-to-t from-black via-black/25 to-transparent h-full w-full -z-10"></span>
    <span
      class="col-span-full row-span-full bg-gradient-to-br from-violet-400/35 via-black/25 to-transparent h-full w-full -z-10"></span>
  </div>
</template>