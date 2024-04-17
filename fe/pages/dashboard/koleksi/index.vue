<template>
  <NuxtLayout name="dashboard">
    <main class="p-6">
      <div class="grid grid-cols-5 gap-4"></div>
    </main>
  </NuxtLayout>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();

export default defineComponent({
  setup() {
    definePageMeta({
      middleware: "is-login",
    });
  },
});
</script>

<style scoped></style>
