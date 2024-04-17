<template>
  <NuxtLayout name="dashboard">
    <main class="p-6">
      <div class="grid grid-cols-5 gap-4">
        <Book v-for="i in data" @changeData="changeData" :book="i" />
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
      middleware: ["is-login","is-user"],

    })

    const data = ref((await getBooks()) as any);
    return { data };
  },
  methods: {
    async changeData() {
      this.data = await getBooks();
    },
  },
});
</script>

<style scoped></style>
