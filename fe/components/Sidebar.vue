<template>
  <aside
    class="w-[300px] fixed flex flex-col bg-white shadow-[rgba(0,0,0,0.1)_5px_0px_4px_0px] from-white from-70% via-purple-200 to-[#a955f7bd] h-screen">
    <header class="flex justify-center gap-2 px-8 py-4 items-center border-b">
      <NuxtImg src="/logo.png" height="50" />
      <h1 class="font-semibold text-2xl">Librify</h1>
    </header>
    <main class="py-20 text-lg">
      <nav class="flex flex-col gap-4 p-8">
        <NuxtLink v-for="(item, index) in items" :to="item.path" active-class="bg-gray-200"
          v-if="items.map((i) => i.path == '/dashboard-admin/user')"
          class="item flex gap-2 items-center text-purple-500 hover:bg-gray-200 duration-300 rounded-lg p-2">
          <Icon name="ic:round-dashboard" size="28" />
          <p>{{ item.name }}</p>
        </NuxtLink>
      </nav>
    </main>
    <div class="logout text-lg justify-end flex flex-col pb-12 grow px-8 text-red-500">
      <div @click="logoutHandle" class="item cursor-pointer flex gap-4 hover:bg-gray-200 duration-300 rounded-lg p-2">
        <Icon name="ic:round-logout" size="28" />
        <p>Logout</p>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();

export default defineComponent({
  setup() {
    const route = useRoute();
    const path = route.fullPath;
    let items = [
      {
        name: "Dashboard",
        path: "/dashboard",
      },
      {
        name: "Koleksi",
        path: "/dashboard/koleksi",
      },
      {
        name: "Peminjaman",
        path: "/dashboard/peminjaman",
      },
    ];
      if (useCookie("role").value == "admin") {
        items = [
          {
            name: "Dashboard",
            path: "/dashboard-admin",
          },
          {
            name: "User",
            path: "/dashboard-admin/user",
          },
          {
            name: "Buku",
            path: "/dashboard-admin/buku",
          },
          {
            name: "Peminjaman",
            path: "/dashboard-admin/peminjaman",
          },
          {
            name: "Kategori",
            path: "/dashboard-admin/kategori",
          },
        ];
      }else if(useCookie("role").value == "staff"){
        items = [
          {
            name: "Dashboard",
            path: "/dashboard-admin",
          },
          {
            name: "Buku",
            path: "/dashboard-admin/buku",
          },
          {
            name: "Peminjaman",
            path: "/dashboard-admin/peminjaman",
          },
          {
            name: "Kategori",
            path: "/dashboard-admin/kategori",
          },
        ];
      }
    return {
      items,
    };
  },

  methods: {

    async logoutHandle() {
      try {
        await logout();
        toast.success("Berhasil logout");
        this.$cookies.remove("role")
        this.$router.push("/");
      } catch (error) {
        toast.error("Gagal logout");
      }
    }
  }
});
</script>

<style scoped></style>
