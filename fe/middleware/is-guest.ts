export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    return;
  }
  if (useCookie("token").value) {
    return navigateTo("/dashboard");
  }
});
