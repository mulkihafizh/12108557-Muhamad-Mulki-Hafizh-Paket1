<template>
  <NuxtLayout name="dashboard">
    <main class="p-6 flex flex-col gap-4">
      <header><h1 class="text-2xl">Data Peminjaman</h1></header>

      <table class="w-full border-separate border">
        <thead class="bg-gray-200 [&>*]:py-2">
          <th class="w-[50px]">No</th>
          <th>Judul</th>
          <th>Tanggal Peminjaman</th>
          <th>Tanggal Pengembalian</th>
          <th>Status</th>
        </thead>
        <tbody class="text-center [&>*:nth-child(even)]:bg-gray-200">
          <tr class="[&>*]:py-2" v-for="(i, index) in 10">
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
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
    definePageMeta({
      middleware: "is-login",
    });
  },
});
</script>

<style scoped></style>
