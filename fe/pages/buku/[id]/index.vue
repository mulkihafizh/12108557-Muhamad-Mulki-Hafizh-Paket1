<template>
  <div class="h-screen flex flex-col">
    <main class="col-span-2 flex flex-col">
      <header class="border-b px-[5%] py-4 bg-white">
        <nav class="flex gap-2 items-center">
          <nuxt-link :to="redirect">
            <Icon class="text-start align-top inline-block mb-1" size="16" name="ph:house-fill" />
            |
          </nuxt-link>
          <p>BUKU | {{ book.title.toUpperCase() }}</p>
        </nav>
      </header>
      <div class="content rounded-lg shadow-lg bg-white mx-[10%] grow mt-12 p-14 flex gap-4">
        <NuxtImg class="rounded-lg shadow-lg min-h-[300px] max-h-[300px] object-cover" height="300" width="200"
          :src="`http://localhost:5000/uploads/${book.cover}`" />
        <div class="details">
          <h3 class="text-gray-500 font-semi text-xl">{{ book.author }}</h3>
          <h1 class="text-2xl font-semibold">{{ book.title }}</h1>
          <h3 class="text-gray-500 font-semi">
            <span class="text-black">Diterbitkan Oleh:</span>
            {{ book.publisher }}
          </h3>
          <div class="rating">
            <Icon size="24px" v-for="i in 5" :class="i - 1 < avgRating ? 'text-yellow-400' : ''" class="text-gray-400"
              name="material-symbols:star-rounded" />
          </div>
          <div class="ratings pt-4 flex flex-col gap-2">
            <h3 class="text-xl">Ulasan Pembaca</h3>
            <div class="items grid gap-2 grid-cols-4">
              <div v-for="i in book.reviews" class="item border rounded-lg flex flex-col gap-2 p-4">
                <div class="flex gap-2 items-center text-lg">
                  <NuxtImg class="avatar rounded-full" placeholder height="30" width="30"
                    :src="`https://ui-avatars.com/api/?name=${i.User.name}`" />
                  {{ i.User.name }}
                </div>
                <div class="rating flex">
                  <Icon v-for="e in i.rating" size="14px" class="text-yellow-400"
                    name="material-symbols:star-rounded" />
                </div>
                <div class="truncate-lines-2 text-sm">{{ i.review }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();

export default defineComponent({
  async setup() {
    definePageMeta({
      middleware: ["is-login"],
    });
    let redirect = "/dashboard-admin";
    if (useCookie("role").value == "user") {
      redirect = "/dashboard";
    }
    const params = useRoute().params.id
    const book = await getBookById(params as any) as any;
    const avgRating = book.reviews.reduce((a: any, b: any) => a + b.rating, 0) / book.reviews.length;
    console.log(avgRating)
    return {
      avgRating,
      book,
      redirect,
    }
  }
});
</script>

<style scoped></style>
