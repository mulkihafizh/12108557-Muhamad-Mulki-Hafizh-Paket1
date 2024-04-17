<template>
  <NuxtLayout name="dashboard">
    <main class="p-6">
      <div class="grid grid-cols-5 gap-4">
        <Book v-for="i in data" @changeData="changeData" :book="i.Book" />
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
    });
    const data = ref((await getCollections()) as any);
    return { data };
  },
  methods: {
    async changeData(data: any) {
      this.data = await getCollections();
    },
  },
});
</script>

<style scoped></style>
