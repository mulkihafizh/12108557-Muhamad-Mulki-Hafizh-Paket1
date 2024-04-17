<template>
  <div class="flex h-screen bg-slate-100 items-center justify-center">
    <div class="bg-purple-500 pt-1 rounded-lg">
      <div class="bg-gray-100 shadow-xl rounded-lg">
        <slot />
      </div>
    </div>
  </div>
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
