<template>
    <section class="w-full min-h-[calc(100vh-60px)] rounded-[12px] md:rounded-[20px] lg:rounded-[34px] bg-linear flex flex-wrap xl:flex-nowrap overflow-hidden">
       <div class="w-full lg:h-[100%]">
            <div class="flex items-end p-[16px] md:p-[24px]">
                <h2 class="flex items-center pt-6">
                    <font-awesome-icon :icon="['fas', 'clock']" />
                    <span class="mx-2 md:mx-4 text-center font-extrabold transition-all duration-300">
                        July Amount
                    </span>
                </h2>
                <p class="text-secondary mb-0">
                    <span class="text-2xl font-extrabold">$</span>
                    <span class="text-3xl md:text-4xl font-extrabold ">12,345</span>
                </p>
            </div>
            <article class="text-xl md:text-2xl h-[100%] flex flex-col overflow-y-auto">
              
               <div class="w-full h-[52px] bg-primary drop-shadow-md flex md:px-[30px] min-w-[calc(120px*3+180px+74px)]">
                    <div class="w-[40%] h-full flex items-center justify-center text-sm font-bold min-w-[180px]">Item</div>
                    <div class="w-[18%] h-full flex items-center justify-center text-sm font-bold min-w-[120px]">
                        Date <font-awesome-icon class="ml-2" :icon="['fas', 'sort']" />
                    </div>
                    <div class="w-[18%] h-full flex items-center justify-center text-sm font-bold min-w-[120px]">
                        Created date <font-awesome-icon class="ml-2" :icon="['fas', 'sort']" />
                    </div>
                    <div class="w-[34%] h-full flex items-center justify-center text-sm font-bold min-w-[120px]">
                        Amount <font-awesome-icon class="ml-2" :icon="['fas', 'sort']" />
                    </div>
               </div>
               <section class="w-full flex-auto bg-[#eee] px-3 min-w-[calc(120px*3+180px+74px)]">
                    <div v-for="({ id, item, date, createdDate, amount, memo, isOpen }, index) in spendingRecords"
                        class="relative md:w-[calc(100%-60px)] rounded-[30px] mx-auto flex mt-6 mb-3 min-w-[calc(120px*3+180px+50px)] cursor-pointer overflow-hidden"
                        :class="[ isOpen ? 'h-[130px] bg-transparent' : ' h-[58px] bg-white' ]"
                        @click="toggleBorderClass($event, index)">
                        <article class="memo absolute w-full bg-linear rounded-[30px] top-0 left-0 transition-all duration-300 flex items-end"
                            :class="[ isOpen ? 'h-[130px]' : 'h-0' ]">
                            <div class="h-[30px] flex justify-center my-6"
                                :class="[ isOpen ? 'h-[30px] opacity-100' : 'h-0 hidden opacity-0' ]">
                                <div class="w-40 sm:w-20 text-sm flex justify-center items-center font-bold border-r-[1px] border-[#ccc]">memo</div>
                                <div class="w-60 sm:w-80 text-sm flex items-center px-4">{{ memo }}</div>
                            </div>
                        </article>
                        <div class="w-full h-[58px] z-[5] flex py-3 rounded-[30px] border-2"
                            :class="[ isOpen ? 'border-black bg-linear' : 'border-transparent hover:border-[#ccc]' ]">
                            <div class="w-[40%] min-w-[180px] h-full flex items-center text-sm font-bold px-4">
                                <font-awesome-icon class="text-secondary text-xl" :icon="['fas', 'burger']" />
                                <h4 class="pl-4">{{ item }}</h4>
                            </div>
                            <div class="w-[18%] min-w-[120px] h-full flex items-center justify-center text-sm font-bold text-[#888] border-l-[1px] border-[#ccc]">
                                {{ date }}
                            </div>
                            <div class="w-[18%] min-w-[120px] h-full flex items-center justify-center text-sm font-bold text-[#888] border-l-[1px] border-[#ccc] text-center">
                               {{ createdDate || '----/--/--' }}
                            </div>
                            <div class="w-[30%] min-w-[120px] h-full flex items-center justify-between text-sm font-bold px-4 border-l-[1px] border-[#ccc]">
                                <span class="font-extrabold text-secondary text-xl">$</span>
                                <span class="font-extrabold text-secondary text-xl">{{ amount }}</span>
                            </div>
                            <div class="w-[4%] min-w-[50px] h-full flex items-center justify-center text-sm font-bold px-4 border-l-[1px] border-[#ccc]">
                                <font-awesome-icon :icon="['fas', 'caret-down']"  :class="[ isOpen ? 'rotate-180' : '' ]" />
                            </div>
                        </div>
                    </div>
                </section>
           </article>
       </div>
       
   </section>
</template>
<style lang="scss" scoped>
.active.memo {
        @apply h-[120px];
    
}
</style>
<script setup>
   import dayjs from 'dayjs'
   import { storeToRefs } from 'pinia'
   import { userCenterStore } from '~/stores/userCenter.js';

   const { toggleMenu, spendingRecords } = storeToRefs(userCenterStore());
    const { setSpendingRecords, setIsOpenToSpendingRecords } = userCenterStore();

   
   const deviceWidth = ref(0);
   const isOpen = ref(false);
   const list = reactive([])
//    spendingRecords = spendingRecords.length && spendingRecords.map((item) => item.isOpen = false)
   onMounted(() => {
       deviceWidth.value = window.innerWidth;

       window.addEventListener('resize', () => {
           deviceWidth.value = window.innerWidth;
       })
   })

   function toggleBorderClass ($event, index) {
        // isOpen.value = !isOpen.value;
        setIsOpenToSpendingRecords(index);
   }
 
</script>