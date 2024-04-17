import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

//add vue-toastification library
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: true,
    rtl: false,
  });
});
