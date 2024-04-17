<template>
  <NuxtLayout name="dashboard">
    <main class="p-6 flex flex-col gap-4">
      <header>
        <h1 class="text-2xl">Data Peminjaman</h1>
      </header>
      <div class="data flex gap-2 text-xl">
        <span>Total Data: {{ lending.length }}</span> |
        <span>Dikembalikan: {{ lending.filter((i: any) => i.lending_status == false).length }}</span> |
        <span>Dipinjam: {{ lending.filter((i: any) => i.lending_status == true).length }}</span>
      </div>
      <div class="createAction flex justify-end gap-2">
        <button @click="exportExcel(data, 'Peminjaman')" class="bg-purple-500 px-4 py-2 rounded-lg text-white bgHover">
          Export
        </button>
      </div>
      <table class="w-full border-separate border">
        <thead class="bg-gray-200 [&>*]:py-2">
          <th class="w-[50px]">No</th>
          <th>Judul</th>
          <th>Peminjam</th>
          <th>Tanggal Peminjaman</th>
          <th>Tanggal Pengembalian</th>
          <th>Status</th>
        </thead>
        <tbody class="text-center [&>*:nth-child(even)]:bg-gray-200">
          <tr class="[&>*]:py-2" v-for="i, index in data">
            <td>{{ index + 1 }}</td>
            <td>{{ i.Book.title }}</td>
            <td>{{ i.User.username }}</td>
            <td>{{ formatDate(i.lending_date) }}</td>
            <td>{{ formatDate(i.return_date) }}</td>
            <td>
              <span v-if="i.lending_status == false">Dikembalikan</span>
              <span v-else>
                Belum dikembalikan`
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex  gap-2">
        <button :disabled="pagination.page <= 1" @click="previousPage"
          class="bg-purple-500 bgHover cursor-pointer px-2 py-1 disabled:bg-opacity-50  rounded-lg text-white">Previous</button>
        <span class="w-[30px] bg-slate-100 text-center">
          {{ pagination.page }}
        </span>
        <button :disabled="pagination.page >= pagination.maxPage" @click="nextPage"
          class="bg-purple-500 bgHover cursor-pointer px-2 py-1 disabled:bg-opacity-50  rounded-lg text-white">Next</button>
      </div>
    </main>
  </NuxtLayout>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();

export default defineComponent({

  async setup(props, ctx) {
    definePageMeta({
      middleware:["is-admin","is-login"]
    })
    const lending = await getLending() as any
    const pagination = ref({
      page: 1,
      perPage: 5,
      maxPage: Math.ceil(lending.length / 5)
    })

    const paginate = (data: any, page: number, perPage: number) => {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      return data.slice(start, end);
    }

    const data = ref(paginate(lending, pagination.value.page, pagination.value.perPage))

    return {
      pagination,
      data,
      paginate,
      lending
    }
  },

  methods: {
    nextPage() {
      this.pagination.page++
      this.data = this.paginate(this.lending, this.pagination.page, this.pagination.perPage)
    },
    previousPage() {
      this.pagination.page--
      this.data = this.paginate(this.lending, this.pagination.page, this.pagination.perPage)
    }
  }
});
</script>

<style scoped></style>
