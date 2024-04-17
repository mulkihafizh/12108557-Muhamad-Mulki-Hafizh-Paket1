import { defineStore } from "pinia";

const useModalStore = defineStore({
  id: "modal",
  state: () => ({
    show: false,
    edit: false,
    data: {},
    oldData:{},
  }),
  actions: {
    closeModal() {
      this.show = false;
      this.data = {};
      this.edit = false;
      this.oldData = {};
    },
    setModal(data: {}, show: boolean) {
      this.data = data;
      this.show = show;
    },
    setEdit(oldData: {}, data: {}, show: boolean) {
      this.oldData = oldData;
      this.data = data;
      this.edit = true;
    }
  },
});

export default useModalStore;
