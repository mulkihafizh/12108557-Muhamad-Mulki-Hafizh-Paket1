<template>
  <div class="bg-slate-100 min-h-screen">
    <NuxtPage />
  </div>
</template>

<style>
.bgHover:hover {
  @apply duration-300;
  @apply bg-opacity-80;
  @apply text-opacity-80;
}

.truncate-lines-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>
