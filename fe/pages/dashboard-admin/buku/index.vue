<template>
  <NuxtLayout name="dashboard">
    <main class="p-6 flex flex-col gap-4">
      <header><h1 class="text-2xl">Data Buku</h1></header>
      <div class="createAction flex justify-end gap-2">
        <button class="bg-purple-500 px-4 py-2 rounded-lg text-white bgHover">
          Export
        </button>
        <nuxt-link
          to="/dashboard-admin/buku/create"
          class="bg-purple-500 px-4 py-2 rounded-lg text-white bgHover"
          >Tambah Buku</nuxt-link
        >
      </div>
      <table class="w-full border-separate border">
        <thead class="bg-gray-200 [&>*]:py-2">
          <th class="w-[50px]">No</th>
          <th>Judul</th>
          <th>Penulis</th>
          <th>Penerbit</th>
          <th>Tahun Terbit</th>
          <th class="w-[200px]">Aksi</th>
        </thead>
        <tbody class="text-center [&>*:nth-child(even)]:bg-gray-200">
          <tr class="[&>*]:py-2" v-for="(i, index) in data">
            <td>{{ index + 1 }}</td>
            <td>{{ i.title }}</td>
            <td>{{ i.author }}</td>
            <td>{{ i.publisher }}</td>
            <td>{{ i.publication_year }}</td>
            <td>{{ i.title }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </NuxtLayout>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();

export default defineComponent({
  async setup() {
    const data = ref((await getBooks()) as any);

    return { data };
  },
});
</script>

<style scoped></style>
