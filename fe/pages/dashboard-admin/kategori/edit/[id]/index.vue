<template>
  <NuxtLayout name="form">
    <div
      class="card bg-gradient-to-tr rounded-b-lg shadow-sm from-white from-40% to-purple-300 p-8"
    >
      <h1 class="text-2xl">Form Tambah Buku</h1>
      <form @submit.prevent="submit" class="flex flex-col gap-4">
        <div class="form-group flex flex-col gap-2">
          <label for="name">Nama Kategori</label>
          <input
            class="w-[300px] rounded-lg p-2 border"
            type="text"
            id="kategori"
            placeholder="Masukkan nama kategori"
            required
            v-model="data.name"
          />
        </div>

        <div class="form-submit flex gap-4">
          <button class="bg-purple-500 bgHover px-4 py-1 text-white rounded-lg">
            Submit
          </button>
          <nuxt-link
            to="/dashboard-admin/kategori"
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
      middleware:["is-admin","is-login"]
    })
    const params = useRoute().params.id;
    const category = ref(await getCategoryById(params as any)) as any;
    const data = ref({ name: category.value.name });
    return { data, params };
  },
  methods: {
    async submit() {
      try {
        await $fetch("http://localhost:5000/api/category/" + this.params, {
          method: "PUT",
          body: JSON.stringify(this.data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Kategori berhasil ditambahkan");
        this.$router.push("/dashboard-admin/kategori");
      } catch (error) {
        toast.error("Gagal menambahkan kategori");
      }
    },
  },
});
</script>

<style scoped></style>
