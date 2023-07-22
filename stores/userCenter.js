
import { createPinia, defineStore } from 'pinia'

// export const pinia = createPinia();
export const userCenterStore = defineStore('userCenter', {
    state: () => ({
      toggleMenu: true,
      spendingRecords: [],
      openCounter: 0,
      openIndex: []
    }),
    getters: {
      getToggleMenu: (state) => state.toggleMenu,
      getSpendingRecords: (state) => state.spendingRecords
    },
    actions: {
      setToggleMenu (boolean) {
        this.toggleMenu = boolean;
      },
      setSpendingRecords (list) {
        this.spendingRecords = list
          .map((item) => (
            {
              ...item,
              isOpen: false,
              openCounter: 0,
              isEdit: false
            }
          ))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      },
      setIsOpenToSpendingRecords (index) {
        const switchIsOpen = (targetIndex) => {
          this.spendingRecords[targetIndex].isOpen = this.spendingRecords[targetIndex].openCounter % 2 === 1;
        }

        if (!this.spendingRecords[index].isOpen) this.spendingRecords[index].isEdit = false;

        this.openIndex.push(index);

        if(this.openIndex.length > 2) this.openIndex.splice(0, 1);
        if(this.openIndex.length > 1) {
          const [prev, next] = this.openIndex;
          if (prev !== next) this.spendingRecords[prev].openCounter = 0;
          switchIsOpen(prev);
        }
        
        this.spendingRecords[index].openCounter ++;
        switchIsOpen(index);
      }
    },
  })

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(userCenterStore, import.meta.hot))
  }