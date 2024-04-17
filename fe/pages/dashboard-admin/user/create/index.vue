<template>
  <NuxtLayout name="form">
    <div
      class="card bg-gradient-to-tr rounded-b-lg shadow-sm from-white from-40% to-purple-300 p-8"
    >
      <h1 class="text-2xl">Form Tambah Buku</h1>
      <form class="grid grid-cols-2 gap-4">
        <div class="left flex flex-col gap-4">
          <div class="form-group flex flex-col gap-2">
            <label for="judul">Judul</label>
            <input
              class="w-[300px] rounded-lg p-2 border"
              type="text"
              id="judul"
              placeholder="Masukkan Judul Buku"
              required
            />
          </div>
          <div class="form-group flex flex-col gap-2">
            <label for="penulis">Penulis</label>
            <input
              class="w-[300px] rounded-lg p-2 border"
              type="text"
              id="penulis"
              placeholder="Masukkan Penulis Buku"
              required
            />
          </div>
          <div class="form-group flex flex-col gap-2">
            <label for="penerbit">Penerbit</label>
            <input
              class="w-[300px] rounded-lg p-2 border"
              type="text"
              id="penerbit"
              placeholder="Masukkan penerbit Buku"
              required
            />
          </div>
        </div>
        <div class="right flex flex-col gap-4">
          <div class="form-group flex flex-col gap-2">
            <label for="penerbit">Kategori</label>
            <select class="w-[300px] rounded-lg p-2 border">
              <option value="" selected hidden>-- Pilih Kategori --</option>
            </select>
          </div>
          <div class="right flex flex-col gap-4">
            <div class="form-group flex flex-col gap-2">
              <label for="tahun_terbit">Tahun Terbit</label>
              <input
                class="w-[300px] rounded-lg p-2 border"
                type="date"
                id="tahun_terbit"
                required
              />
            </div>
          </div>
          <div class="right flex flex-col gap-4">
            <div class="form-group flex flex-col gap-2">
              <label for="cover">Cover Buku</label>
              <input
                class="w-[300px] rounded-lg p-2 border"
                type="file"
                id="cover"
                required
              />
            </div>
          </div>
        </div>
        <div class="form-submit flex gap-4">
          <button class="bg-purple-500 bgHover px-4 py-1 text-white rounded-lg">
            Submit
          </button>
          <nuxt-link
            to="/dashboard-admin/buku"
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

export default defineComponent({});
</script>

<style scoped></style>
