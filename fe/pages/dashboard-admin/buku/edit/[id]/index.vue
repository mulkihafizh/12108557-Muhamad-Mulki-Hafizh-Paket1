<template>
  <NuxtLayout name="form">
    <div
      class="card bg-gradient-to-tr rounded-b-lg shadow-sm from-white from-40% to-purple-300 p-8"
    >
      <h1 class="text-2xl">Form Edit Buku</h1>
      <form @submit.prevent="submit" class="grid grid-cols-2 gap-4">
        <div class="left flex flex-col gap-4">
          <div class="form-group flex flex-col gap-2">
            <label for="judul">Judul</label>
            <input
              class="w-[300px] rounded-lg p-2 border"
              type="text"
              id="judul"
              placeholder="Masukkan Judul Buku"
              required
              v-model="data.title"
            />
          </div>
          <div class="form-group flex flex-col gap-2">
            <label for="penulis">Penulis</label>
            <input
              class="w-[300px] rounded-lg p-2 border"
              type="text"
              id="penulis"
              placeholder="Masukkan Penulis Buku"
              required
              v-model="data.author"
            />
          </div>
          <div class="form-group flex flex-col gap-2">
            <label for="stock">Stock</label>
            <input
              class="w-[300px] rounded-lg p-2 border"
              type="integer"
              id="stock"
              placeholder="Masukkan Stock Buku"
              required
              v-model="data.stock"
            />
          </div>
          <div class="form-group flex flex-col gap-2">
            <label for="penerbit">Penerbit</label>
            <input
              class="w-[300px] rounded-lg p-2 border"
              type="text"
              id="penerbit"
              placeholder="Masukkan penerbit Buku"
              required
              v-model="data.publisher"
            />
          </div>
        </div>
        <div class="right flex flex-col gap-4">
          <div class="form-group flex flex-col gap-2">
            <label for="penerbit">Kategori</label>
            <select
              class="w-[300px] rounded-lg p-2 border"
              v-model="data.category_id"
            >
              <option value="" selected hidden>-- Pilih Kategori --</option>
              <option v-for="i in categories" :value="i.id">
                {{ i.name }}
              </option>
            </select>
          </div>
          <div class="right flex flex-col gap-4">
            <div class="form-group flex flex-col gap-2">
              <label for="tahun_terbit">Tahun Terbit</label>
              <input
                class="w-[300px] rounded-lg p-2 border"
                type="number"
                id="tahun_terbit"
                required
                v-model="data.publication_year"
              />
            </div>
          </div>
          <div class="right flex flex-col gap-4">
            <div class="form-group flex flex-col gap-2">
              <label for="cover">Cover Buku</label>
              <input
                class="w-[300px] rounded-lg p-2 border"
                type="file"
                id="cover"
                required
                @change="changeCover($event)"
              />
            </div>
          </div>
        </div>
        <div class="form-submit flex gap-4">
          <button class="bg-purple-500 bgHover px-4 py-1 text-white rounded-lg">
            Submit
          </button>
          <nuxt-link
            to="/dashboard-admin/buku"
            class="border border-purple-500 px-4 py-1 text-purple-500 rounded-lg"
          >
            Kembali
          </nuxt-link>
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();

export default defineComponent({
  async setup() {
    definePageMeta({
      middleware: ["is-admin", "is-login"],
    });
    const params = useRoute().params.id;
    const buku = ref((await getBookById(params as any)) as any);
    const categories = ref((await getCategory()) as any);

    const data = ref({
      category_id: "",
      title: buku.value.title,
      publisher: buku.value.publisher,
      author: buku.value.author,
      publication_year: buku.value.publication_year,
      cover: "",
      stock: buku.value.stock,
    });
    return {
      data,
      categories,
      params,
    };
  },
  methods: {
    changeCover(e: any) {
      this.data.cover = e.target.files[0];
    },
    async submit() {
      let formData = new FormData();
      formData.append("title", this.data.title);
      formData.append("publisher", this.data.publisher);
      formData.append("author", this.data.author);
      formData.append("publication_year", this.data.publication_year);
      formData.append("category_id", this.data.category_id);
      formData.append("cover", this.data.cover);
      formData.append("stock", this.data.stock.toString());

      await $fetch("http://localhost:5000/api/book/" + this.params, {
        method: "PUT",
        body: formData,
      })
        .then(() => {
          toast.success("Berhasil edit buku");
          this.$router.push("/dashboard-admin/buku");
        })
        .catch(() => {
          toast.error("Gagal edit buku");
        });
    },
  },
});
</script>

<style scoped></style>
