<template>
  <NuxtLayout name="dashboard">
    <main class="p-6 flex flex-col gap-4">
      <header><h1 class="text-2xl">Data Kategori</h1></header>
      <div class="createAction flex justify-end gap-2">
        <button
          @click="exportExcel(kategories, 'kategori')"
          class="bg-purple-500 px-4 py-2 rounded-lg text-white bgHover"
        >
          Export
        </button>
        <nuxt-link
          to="/dashboard-admin/kategori/create"
          class="bg-purple-500 px-4 py-2 rounded-lg text-white bgHover"
          >Tambah Kategori</nuxt-link
        >
      </div>
      <table class="w-full border-separate border">
        <thead class="bg-gray-200 [&>*]:py-2">
          <th class="w-[50px]">No</th>
          <th>Nama</th>
          <th class="w-[200px]">Aksi</th>
        </thead>
        <tbody class="text-center [&>*:nth-child(even)]:bg-gray-200">
          <tr class="[&>*]:py-2" v-for="(i, index) in kategories">
            <td>{{ index + 1 }}</td>
            <td>{{ i.name }}</td>
            <td>1</td>
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
    const kategories = ref((await getKategori()) as any);
    return { kategories };
  },
});
</script>

<style scoped></style>
