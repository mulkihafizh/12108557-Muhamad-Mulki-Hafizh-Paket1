<template>
  <NuxtLayout name="dashboard">
    <h1 class="text-2xl p-6">Selamat datang di dashboard Admin</h1>
  </NuxtLayout>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
