<template>
  <NuxtLayout name="dashboard">
    <main class="p-6 flex flex-col gap-4">
      <header>
        <h1 class="text-2xl">Data User</h1>
      </header>
      <div class="data flex gap-2 text-xl">
        <span>Total Data: {{ data.length }}</span>| <span>User: {{ data.filter((i: any) => i.role == "user").length
          }}</span>|
        <span>Staff: {{ data.filter((i: any) => i.role == "staff").length }}</span>|
        <span>Admin: {{ data.filter((i: any) => i.role == "admin").length }}</span>
      </div>
      <div class="createAction flex justify-end gap-2">
        <button @click="exportToExcel()" class="bg-purple-500 px-4 py-2 rounded-lg text-white bgHover">
          Export
        </button>
        <nuxt-link to="/dashboard-admin/user/create"
          class="bg-purple-500 px-4 py-2 rounded-lg text-white bgHover">Tambah Staff</nuxt-link>
      </div>
      <table class="w-full border-separate border">
        <thead class="bg-gray-200 [&>*]:py-2">
          <th class="w-[50px]">No</th>
          <th>Nama</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th class="w-[200px]">Aksi</th>
        </thead>
        <tbody class="text-center [&>*:nth-child(even)]:bg-gray-200">
          <tr class="[&>*]:py-2" v-for="(i, index) in data">
            <td>{{ index + 1 }}</td>
            <td>{{ i.name }}</td>
            <td>{{ i.username }}</td>
            <td>{{ i.email }}</td>
            <td>{{ i.role }}</td>
            <td class="grid grid-cols-2 gap-2">
              <button @click="deleteUser(i.id)" class="px-2 py-1 rounded-lg bg-red-500">
                Delete
              </button>
              <nuxt-link :to="`/dashboard-admin/user/edit/${i.id}`"
                class="px-2 py-1 rounded-lg bg-yellow-500">Edit</nuxt-link>
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
  async setup() {
    definePageMeta({
      middleware: ["is-admin", "is-login", "not-staff"]
    })
    const user = await getUsers() as any;
    const pagination = ref({
      page: 1,
      perPage: 5,
      maxPage: Math.ceil(user.length / 5)
    })

    const paginate = (data: any, page: number, perPage: number) => {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      return data.slice(start, end);
    }

    const data = ref(paginate(user, pagination.value.page, pagination.value.perPage))

    return { data, pagination, user, paginate };
  },

  methods: {
    exportToExcel() {
      const data = this.data.map((i: any) => {
        delete i.createdAt;
        delete i.updatedAt;
        return i;
      });
      exportExcel(data, "User");
    },
    nextPage() {
      this.pagination.page++
      this.data = this.paginate(this.user, this.pagination.page, this.pagination.perPage)
    },
    previousPage() {
      this.pagination.page--
      this.data = this.paginate(this.user, this.pagination.page, this.pagination.perPage)
    },

    async deleteUser(id: any) {
      await $fetch(`http://localhost:5000/api/user/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          cookie: `token=${useCookie("token").value}`,
        },
      })
        .then(() => {
          toast.success("Berhasil menghapus user");
        })
        .catch(() => {
          toast.error("Gagal menghapus user");
        });
      this.data = (await getUsers()) as any;
    },
  },
});
</script>

<style scoped></style>
