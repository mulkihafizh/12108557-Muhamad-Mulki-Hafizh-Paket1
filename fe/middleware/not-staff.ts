export default defineNuxtRouteMiddleware((context) => {
    if (process.client) {
      return;
    }
    if (useCookie("role").value === "staff") {
      return navigateTo("/dashboard-admin");
    }
  });
  