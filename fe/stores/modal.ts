import { defineStore } from "pinia";

const useModalStore = defineStore({
  id: "modal",
  state: () => ({
    show: false,
    data: {},
  }),
  actions: {
    toggle() {
      this.show = !this.show;
    },
    setModal(data: {}, show: boolean) {
      this.data = data;
      this.show = show;
    },
  },
});

export default useModalStore;
