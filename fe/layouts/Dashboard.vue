<template>
  <div class="bg-slate-100 min-h-screen">
    <Sidebar />
    <div class="ml-[300px]">
      <header
        class="flex justify-between items-center border-b py-4 px-6 text-sm"
      >
        <nav class="flex gap-2">DASHBOARD</nav>
        <NuxtImg
          class="avatar rounded-full"
          placeholder
          height="30"
          width="30"
          :src="`https://ui-avatars.com/api/?name=username`"
        />
      </header>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();

export default defineComponent({
  async setup() {},
});
</script>

<style scoped></style>
