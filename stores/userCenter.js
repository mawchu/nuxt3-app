
import { createPinia, defineStore } from 'pinia'
// import Please from 'pleasejs'
import { groupBy } from 'lodash-es';
import chroma from 'chroma-js';
// export const pinia = createPinia();
export const userCenterStore = defineStore('userCenter', {
    state: () => ({
      toggleMenu: true,
      spendingRecords: [],
      latestMonthRecords: [],
      overviewMergedRecords: [],
      latestMonth: null,
      recordsMonths: [],
      openCounter: 0,
      openIndex: [],
      amountDatas: {
        latestMonth: 0,
        overview: 0
      },
      categoryPieConsist: {
        latestMonth: null,
        overview: null
      },
      bankingList: []
    }),
    getters: {
      getToggleMenu: (state) => state.toggleMenu,
      getSpendingRecords: (state) => state.spendingRecords,
      getAmountDatas: (state) => state.amountDatas,
      getBankingList: (state) => state.bankingList
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
              amount: Number(item.amount),
              isOpen: false,
              openCounter: 0,
              isEdit: false
            }
          ))
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        this.latestMonth = this.spendingRecords[0].date.split('/')[1];
        const months = this.spendingRecords.map(({ date }) => date.split('/')[1]);
        this.recordsMonths = [...new Set(months)]
          .reverse()
          .map((month)=> ({
            month,
            list: this.spendingRecords
              .filter(({ date })=> date.split('/')[1] === month)
              .sort((a, b) => new Date(a.date) - new Date(b.date)),
          })
        );

        this.latestMonthRecords = this.spendingRecords
          .filter(({ date })=> date.split('/')[1] === this.latestMonth)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
        
        
      
        this.overviewMergedRecords = JSON.parse(JSON.stringify(this.spendingRecords))
          .filter((recordItem, index) => index < 31)
          .reduce((accumulator, currentSpending) => {
            if (accumulator.length) {
              const existingSpending = accumulator.find((spending) => spending.date === currentSpending.date);
              if (existingSpending) {
                existingSpending.amount = Number(existingSpending.amount) + Number(currentSpending.amount);
              } else {
                const {date, amount} = currentSpending;
                accumulator.push({
                  date, amount: Number(amount)
                });
              }
            }

            if (!accumulator.length) accumulator.push(currentSpending);
            return accumulator;
          }, []);

        this.amountDatas.latestMonth = this.latestMonthRecords
          .reduce((sum, { amount }) => sum + Number(amount), 0);

        this.amountDatas.overview = this.spendingRecords
          .filter((recordItem, index) => index < 31)
          .reduce((sum, { amount }) => sum + Number(amount), 0);

        const latestMonthCaterotyDic = groupBy(this.latestMonthRecords, 'category');
        const overviewCaterotyDic = groupBy(this.spendingRecords.filter((recordItem, index) => index < 31), 'category');

        
        function calculateCategoryRate (categoryDictionary, totalSum) {
          const colors = chroma
            .scale(['#FBA47E', '#FAE57A', '#91D48F'])
            .mode('lch')
            .colors(Object.keys(categoryDictionary).length);

          return Object.keys(categoryDictionary)
            .map((category, index) => {
              const categorySum = categoryDictionary[category]
                .reduce((sum, { amount }) => sum + Number(amount), 0);

              return {
                name: category,
                value: categorySum,
                color: colors[index],
                rate: ((categorySum / totalSum) * 100).toFixed(2)
              }
            });
        }

        this.categoryPieConsist.latestMonth = calculateCategoryRate (latestMonthCaterotyDic, this.amountDatas.latestMonth);
        this.categoryPieConsist.overview = calculateCategoryRate (overviewCaterotyDic, this.amountDatas.overview);
          
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
      },
      setBankingList (list) {
        this.bankingList = list.map((item) => (
          {
            ...item,
            isEdit: false
          }
        ));
      }
    },
  })

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(userCenterStore, import.meta.hot))
  }