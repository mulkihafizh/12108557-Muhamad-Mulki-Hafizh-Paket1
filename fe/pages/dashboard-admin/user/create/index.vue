<template>
  <NuxtLayout name="form">
    <div
      class="card shadow-sm bg-gradient-to-tr from-white from-40% to-purple-300 rounded-lg p-8"
    >
      <h1 class="text-2xl mb-4">Create staff Form</h1>
      <form @submit.prevent="staff" class="flex flex-col gap-4">
        <div class="form-group flex flex-col gap-2">
          <label for="email">Email</label>
          <input
            class="w-[450px] rounded-lg p-2 border-[0.5px] focus:outline-purple-500"
            type="email"
            id="email"
            placeholder="Masukkan Email anda"
            required
            v-model="data.email"
          />
        </div>
        <div class="form-group flex flex-col gap-2">
          <label for="username">Username</label>
          <input
            class="w-[450px] rounded-lg p-2 border-[0.5px] focus:outline-purple-500"
            type="text"
            id="username"
            placeholder="Masukkan Username anda"
            required
            v-model="data.username"
          />
        </div>
        <div class="form-group flex flex-col gap-2">
          <label for="nama_lengkap">Nama Lengkap</label>
          <input
            class="w-[450px] rounded-lg p-2 border-[0.5px] focus:outline-purple-500"
            type="text"
            id="nama_lengkap"
            placeholder="Masukkan Nama Lengkap anda"
            required
            v-model="data.name"
          />
        </div>
        <div class="form-group flex flex-col gap-2">
          <label for="password">Password</label>
          <input
            class="w-[450px] rounded-lg p-2 border-[0.5px] focus:outline-purple-500"
            type="password"
            id="password"
            placeholder="Masukkan Password anda"
            required
            v-model="data.password"
          />
        </div>
        <div class="form-group flex flex-col gap-2">
          <label for="alamat">Alamat</label>
          <textarea
            class="w-[450px] rounded-lg p-2 border-[0.5px] focus:outline-purple-500"
            id="alamat"
            placeholder="Masukkan Alamat anda"
            cols="5"
            v-model="data.address"
          ></textarea>
        </div>
        <div class="form-submit flex gap-2">
          <button
            class="text-lg bg-purple-500 bgHover text-white px-4 py-1 rounded-lg"
          >
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
  setup() {
    definePageMeta({
      middleware:["is-admin","is-login","not-staff"]
    })
    const data = ref({
      email: "",
      username: "",
      name: "",
      password: "",
      address: "",
    });
    return {
      data,
    };
  },
  methods: {
    async staff() {
      await $fetch("http://localhost:5000/api/user/staff", {
        method: "POST",
        body: JSON.stringify(this.data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res: any) => {
          toast.success("Berhasil menambah staff");
          this.$router.push("/dashboard-admin/user");
        })
        .catch((err: any) => {
          toast.error("Gagal menambah staff");
        });
    },
  },
});
</script>

<style scoped></style>
