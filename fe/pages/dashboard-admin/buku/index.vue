<template>
  <NuxtLayout name="dashboard">
    <main class="p-6 flex flex-col gap-4">
      <header>
        <h1 class="text-2xl">Data Buku</h1>
      </header>
      <div class="data flex gap-2 text-xl">
        <span>Total Data: {{ data.length }}</span> 

      </div>
      <div class="createAction flex justify-end gap-2">
        <button @click="exportExcel(data, 'Buku')" class="bg-purple-500 px-4 py-2 rounded-lg text-white bgHover">
          Export
        </button>
        <nuxt-link to="/dashboard-admin/buku/create"
          class="bg-purple-500 px-4 py-2 rounded-lg text-white bgHover">Tambah Buku</nuxt-link>
      </div>
      <table class="w-full border-separate border">
        <thead class="bg-gray-200 [&>*]:py-2">
          <th class="w-[50px]">No</th>
          <th>Judul</th>
          <th>Penulis</th>
          <th>Penerbit</th>
          <th>Stock</th>
          <th>Tahun Terbit</th>
          <th>Kategori</th>
          <th class="w-[200px]">Aksi</th>
        </thead>
        <tbody class="text-center [&>*:nth-child(even)]:bg-gray-200">
          <tr class="[&>*]:py-2" v-for="(i, index) in data">
            <td>{{ index + 1 }}</td>
            <td>{{ i.title }}</td>
            <td>{{ i.author }}</td>
            <td>{{ i.publisher }}</td>
            <td>{{ i.stock }}</td>
            <td>{{ i.publication_year }}</td>
            <td>{{ i.categories[0].name }}</td>
            <td class="grid grid-cols-2 gap-2 p-2">
              <button @click="deleteBook(i.id)" class="px-2 py-1 rounded-lg bg-red-500">
                Delete
              </button>
              <nuxt-link :to="`/dashboard-admin/buku/edit/${i.id}`"
                class="px-2 py-1 rounded-lg bg-yellow-500">Edit</nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex  gap-2">
        <button :disabled="pagination.page <= 1" @click="previousPage"
          class="bg-purple-500 bgHover cursor-pointer px-2 py-1 disabled:bg-opacity-50  rounded-lg text-white">Previous</button>
        <span  class="w-[30px] bg-slate-100 text-center" >
          {{ pagination.page }}
        </span>
        <button 
        :disabled="pagination.page >= pagination.maxPage"
        @click="nextPage"
          class="bg-purple-500 bgHover cursor-pointer px-2 py-1 disabled:bg-opacity-50  rounded-lg text-white">Next</button>
      </div>
    </main>
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
    const book = await getBooks() as any;
    const pagination = ref({
      page: 1,
      perPage: 5,
      maxPage: Math.ceil(book.length / 5)
    })

    const paginate = (data: any, page: number, perPage: number) => {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      return data.slice(start, end);
    }

    const data = ref(paginate(book, pagination.value.page, pagination.value.perPage))

    return { data,pagination,book,paginate };
  },
  methods: {
    nextPage() {
      this.pagination.page++
      this.data = this.paginate(this.book, this.pagination.page, this.pagination.perPage)
    },
    previousPage() {
      this.pagination.page--
      this.data = this.paginate(this.book, this.pagination.page, this.pagination.perPage)
    },
    async deleteBook(id: any) {
      await $fetch(`http://localhost:5000/api/book/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          cookie: `token=${useCookie("token").value}`,
        },
      })
        .then(() => {
          toast.success("Berhasil menghapus buku");
        })
        .catch(() => {
          toast.error("Gagal menghapus buku");
        });
      this.data = (await getBooks()) as any;
    },
  },
});
</script>

<style scoped></style>
