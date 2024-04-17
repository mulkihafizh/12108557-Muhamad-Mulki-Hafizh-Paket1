export default defineNuxtRouteMiddleware((context) => {
  if (process.client) {
    return;
  }
});
