
import { createPinia, defineStore } from 'pinia'

// export const pinia = createPinia();
export const userCenterStore = defineStore('userCenter', {
    state: () => ({
      toggleMenu: true,
      spendingRecords: []
    }),
    getters: {
      getToggleMenu: (state) => state.toggleMenu,
      getSpendingRecords: (state) => state.spendingRecords
    },
    actions: {
      setToggleMenu (boolean) {
        this.toggleMenu = boolean;
        console.log('boolean',  boolean, 'toggleMenu', this.toggleMenu);
      },
      setSpendingRecords (list) {
        this.spendingRecords = list.map((item) => (
          {
            ...item,
            isOpen: false
          }
        ));
      },
      setIsOpenToSpendingRecords (index) {

        this.spendingRecords.forEach((item) => item.isOpen = false);
        this.spendingRecords[index].isOpen = true;
      }
    },
  })

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(userCenterStore, import.meta.hot))
  }