
import { createPinia, defineStore } from 'pinia'
// import Please from 'pleasejs'
import { groupBy } from 'lodash';
import chroma from 'chroma-js';
// export const pinia = createPinia();
export const userCenterStore = defineStore('userCenter', {
    state: () => ({
      toggleMenu: true,
      spendingRecords: [],
      latestMonthRecords: [],
      latestMonthMergedRecords: [],
      latestMonth: null,
      recordsMonths: [],
      openCounter: 0,
      openIndex: [],
      amountDatas: {
        latestMonth: 0
      },
      categoryPieConsist: {
        latestMonth: null
      }
    }),
    getters: {
      getToggleMenu: (state) => state.toggleMenu,
      getSpendingRecords: (state) => state.spendingRecords,
      getAmountDatas: (state) => state.amountDatas
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

          // function filterDatesByMonth(dates, year, month) {
          //   const startDate = dayjs(`${year}-${month}-01`);
          //   const endDate = startDate.endOf('month');
          
          //   return dates.filter(date => {
          //     const currentDate = dayjs(date);
          //     return currentDate.isSameOrAfter(startDate) && currentDate.isSameOrBefore(endDate);
          //   });
          // }
          this.latestMonth = this.spendingRecords[0].date.split('/')[1];
          const months = this.spendingRecords.map(({ date }) => date.split('/')[1]);
          this.recordsMonths = [...new Set(months)]
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
        
          this.latestMonthMergedRecords = this.latestMonthRecords.reduce((accumulator, currentSpending) => {
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

          const latestMonthCaterotyDic = groupBy(this.latestMonthRecords, 'category');

          const colors = chroma.scale(['#FBA47E', '#FAE57A', '#91D48F'])
            .mode('lch').colors(Object.keys(latestMonthCaterotyDic).length);

          this.categoryPieConsist.latestMonth = Object.keys(latestMonthCaterotyDic)
            .map((category, index) => {
              const categorySum = latestMonthCaterotyDic[category]
                .reduce((sum, { amount }) => sum + Number(amount), 0);

              return {
                name: category,
                value: categorySum,
                color: colors[index],
                rate: ((categorySum / this.amountDatas.latestMonth) * 100).toFixed(2)
              }
            });
          
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