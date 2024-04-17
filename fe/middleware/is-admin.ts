export default defineNuxtRouteMiddleware((context) => {
  if (process.client) {
    return;
  }
  if (useCookie("role").value === "user") {
    return navigateTo("/dashboard");
  }
});
