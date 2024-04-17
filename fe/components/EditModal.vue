<template>
  <div
    class="fixed flex flex-col items-center justify-center bg-opacity-60 top-0 right-0 z-[100] min-h-screen max-h-screen w-full bg-black"
  >
    <div class="card bg-white w-[500px] rounded-lg">
      <header class="border-b p-4">Edit Ulasan Buku</header>
      <main class="p-4 flex flex-wrap gap-4">
        <NuxtImg
          class="object-cover min-h-[200px] min-w-[130px] max-h-[200px] max-w-[130px] rounded-lg"
          :src="`http://localhost:5000/uploads/${book.cover}`"
        />
        <div class="content flex flex-col gap-1">
          <h1 class="text-lg">{{ book.title }}</h1>
          <div class="rate">
            <Icon
              v-for="i in 5"
              size="24px"
              @click="setRating(i)"
              class="text-gray-400 duration-300"
              :class="
                data.rating >= i
                  ? 'text-yellow-400 animate-grow'
                  : 'text-gray-400'
              "
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
              v-model="data.review"
            ></textarea>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            @click="submit"
            class="bg-purple-500 text-white bgHover rounded-lg px-2 py-1"
          >
            Submit
          </button>
          <button
            @click="store.closeModal()"
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
import useModalStore from "~/stores/modal";
const toast = useToast();

export default defineComponent({
  setup(props, ctx) {
    const store = useModalStore();
    const book = ref(store.data as any) as any;
    const oldData = ref(store.oldData as any) as any;
    const data = ref({
      rating: oldData.value.rating ,
      review: oldData.value.review,
    });
    
    return { store, book, data };
  },
  methods: {
    setRating(i: number) {
      this.data.rating = i;
    },
    async submit() {
      try {
        await $fetch("http://localhost:5000/api/review/" + this.book.id, {
          credentials: "include",
          method: "PUT",
          body: JSON.stringify({
            book_id: this.book.id,
            rating: this.data.rating,
            review: this.data.review,
          }),
        });
        toast.success("Ulasan berhasil diedit");
        this.store.closeModal();
        window.location.reload();
      } catch (error) {
        toast.error("Gagal mengedit ulasan");
      }
    },
  },
});
</script>

<style scoped></style>
