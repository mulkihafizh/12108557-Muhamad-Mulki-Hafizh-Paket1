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
          <tr class="[&>*]:py-2" v-for="(i, index) in data">
            <td>{{ index + 1 }}</td>
            <td>{{ i.Book.title }}</td>
            <td>{{ formatDate(i.lending_date) }}</td>
            <td>{{ formatDate(i.return_date) }}</td>
            <td>
              <span v-if="i.lending_status == false">Dikembalikan</span>
              <button
                v-else
                class="bg-red-500 rounded-lg bgHover px-2 py-1"
                @click="kembalikan(i.Book)"
              >
                Kembalikan
              </button>
            </td>
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
      middleware: ["is-login","is-user"],

    });
    const data = ref((await getUserLending()) as any);
    return {
      data,
    };
  },
  methods: {
    async kembalikan(book: any) {
      try {
        await $fetch("http://localhost:5000/api/lending/return/" + book.id, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(book),
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.data = (await getUserLending()) as any;
        toast.success("Buku berhasil dikembalikan");
      } catch (error) {
        toast.error("Gagal mengembalikan buku");
      }
    },
  },
});
</script>

<style scoped></style>
