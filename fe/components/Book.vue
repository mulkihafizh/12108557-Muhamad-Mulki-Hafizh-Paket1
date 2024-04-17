<template>
  <div class="card flex flex-col gap-2">
    <NuxtImg
      class="rounded-lg h-[340px] object-cover"
      :src="`http://localhost:5000/uploads/${book.cover}`"
    />
    <h1 class="font-semibold text-lg truncate">{{ book.title }}</h1>
    <div class="actions flex gap-2 flex-wrap">
      <button
        @click="pinjam"
        class="bg-purple-500 rounded-lg bgHover text-white px-2"
        v-if="
          book.lendings.length === 0 ||
          book.lendings[0].lending_status === false
        "
      >
        Pinjam
      </button>
      <button
        @click="kembalikan"
        class="bg-purple-500 rounded-lg bgHover text-white px-2"
        v-else
      >
        Kembalikan
      </button>
      <nuxt-link
        :to="`/buku/${book.id}`"
        class="rounded-lg border text-purple-500 border-purple-500 px-2"
      >
        Detail
      </nuxt-link>
      <button class="grow justify-end flex">
        <Icon
          @click="collection"
          v-if="book.collections.length === 0"
          class="text-purple-500"
          name="ic:outline-bookmark-add"
          size="24"
        />
        <Icon
          @click="collection"
          v-else
          class="text-purple-500"
          name="ic:round-bookmark-remove"
          size="24"
        />
      </button>
      <button
        @click="review"
        v-if="
          book.reviews.length !== 0 ||
          (book.lendings.length > book.reviews.length &&
            book.lendings[0].lending_status === false)
        "
        class="basis-full text-center rounded-lg border text-purple-500 border-purple-500 px-2"
      >
        Ulas Buku
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
import useModalStore from "~/stores/modal";
const toast = useToast();

export default defineComponent({
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  setup(props, ctx) {
    const book = ref(props.book);
    watch(
      () => props.book,
      (value) => {
        book.value = value;
      }
    );
    return {
      book,
    };
  },
  methods: {
    async pinjam() {
      try {
        await $fetch("http://localhost:5000/api/lending/lend/" + this.book.id, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(this.book),
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Buku berhasil dipinjam");
        this.$emit("changeData");
      } catch (error) {
        toast.error("Gagal meminjam buku");
      }
    },
    review() {
      const store = useModalStore();
      store.setModal(this.book, true);
    },
    async collection() {
      try {
        await $fetch("http://localhost:5000/api/collection/" + this.book.id, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(this.book),
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Berhasil menambah ke koleksi");
        this.$emit("changeData");
      } catch (error) {
        toast.error("Gagal menambah ke koleksi");
      }
    },
    async kembalikan() {
      try {
        await $fetch(
          "http://localhost:5000/api/lending/return/" + this.book.id,
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(this.book),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.$emit("changeData");
        toast.success("Buku berhasil dikembalikan");
      } catch (error) {
        toast.error("Gagal mengembalikan buku");
      }
    },
  },
});
</script>

<style scoped></style>
