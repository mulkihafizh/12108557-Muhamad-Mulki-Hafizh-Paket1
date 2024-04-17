<template>
  <div
    class="fixed flex flex-col items-center justify-center bg-opacity-60 top-0 right-0 z-[100] min-h-screen max-h-screen w-full bg-black"
  >
    <div class="card bg-white w-[500px] rounded-lg">
      <header class="border-b p-4">Rating Buku</header>
      <main class="p-4 flex flex-wrap gap-4">
        <NuxtImg
          class="object-cover min-h-[200px] min-w-[130px] max-h-[200px] max-w-[130px] rounded-lg"
        />
        <div class="content flex flex-col gap-1">
          <h1 class="text-lg">Hitam</h1>
          <div class="rate">
            <Icon
              size="24px"
              class="text-gray-400 duration-300"
              name="material-symbols:star-rounded"
            />
          </div>
          <div class="ulasan">
            <p>Ulasan</p>
            <textarea
              class="bg-slate-200 rounded-lg p-2"
              name=""
              id=""
              cols="35"
              rows="4"
            ></textarea>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="bg-purple-500 text-white bgHover rounded-lg px-2 py-1">
            Submit
          </button>
          <button
            class="text-purple-500 border border-purple-500 rounded-lg px-2 py-1"
          >
            Batal
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();

export default defineComponent({});
</script>

<style scoped></style>
