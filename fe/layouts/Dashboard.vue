<template>
  <div class="bg-slate-100 min-h-screen">
    <RateModal v-if="modal.show" />
    <EditModal v-if="modal.edit" />
    <Sidebar />
    <div class="ml-[300px]">
      <header
        class="flex justify-between items-center border-b py-4 px-6 text-sm"
      >
        <nav class="flex gap-2">
          <span v-for="(i, index) in splitPath">
            {{ i.toUpperCase() }}
            <span v-if="index + 1 < splitPath.length">|</span>
          </span>
        </nav>
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
import useModalStore from "~/stores/modal";
const toast = useToast();

export default defineComponent({
  async setup() {
    const route = useRoute();
    const path = route.fullPath;
    const splitPath = path.split("/").filter((item) => item !== "");
    const modal = useModalStore();
    return {
      splitPath,
      modal,
    };
  },
});
</script>

<style scoped></style>
