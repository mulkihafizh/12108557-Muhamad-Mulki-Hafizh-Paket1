import VueCookies from "vue-cookies";

//add vue-cookies library
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueCookies);
});
