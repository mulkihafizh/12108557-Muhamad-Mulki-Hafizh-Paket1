export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    return;
  }
  if (useCookie("token").value) {
    if (useCookie("role").value === "user") {
      return navigateTo("/dashboard");
    } else {
      return navigateTo("/dashboard-admin");
    }
  }
});
