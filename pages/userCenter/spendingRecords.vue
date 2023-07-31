<template>
    <section class="w-full min-h-[calc(100vh-60px)] rounded-[12px] md:rounded-[20px] lg:rounded-[34px] bg-linear flex flex-wrap xl:flex-nowrap overflow-hidden">
       <div class="w-full h-[100%] flex flex-col">
            <div class="flex justify-between items-end p-[16px] md:p-[24px]">
                <div class="flex items-end">
                    <h2 class="flex items-center pt-6">
                        <font-awesome-icon :icon="['fas', 'clock']" />
                        <span class="mx-2 md:mx-4 text-center font-extrabold transition-all duration-300 lg:text-2xl">
                            {{ monthToName(dayjs(originalRecord[0].date).month(), 3) }} Amount
                        </span>
                    </h2>
                    <p class="text-secondary mb-0">
                        <span class="text-2xl font-extrabold">$</span>
                        <span class="text-3xl md:text-4xl lg:text-5xl font-extrabold ">
                            {{ toCommas(amountData) }}
                        </span>
                    </p>
                </div>
                <div class="flex">
                    <div v-for="({ month }, index) in recordsMonths" :key="index"
                        class="w-[30px] h-[30px] mx-1 rounded-full  text-xl font-bold flex justify-center items-center cursor-pointer transition-all duration-200"
                        :class="[
                            currentMonth === month
                                ? 'bg-black text-white' : 'border-[3px] border-secondary text-secondary hover:bg-secondary hover:text-white'
                        ]"
                        @click="currentMonth = month">{{ month }}</div>
                </div>
            </div>
            <article class="w-full flex-auto bg-[#eee] overflow-x-auto" style="flex: 0 1 auto">
                <div class="bg-primary min-w-[calc(120px*3+180px*2+94px)] drop-shadow-lg px-[10px] sticky top-0 left-0 z-[6]">
                    <section class="w-full md:w-[calc(100%-60px)] md:mx-auto h-[58px] z-[5] flex py-3 bg-primary">
                        <div class="w-[16%] min-w-[180px] h-full flex items-center text-sm text-black font-bold justify-center px-4">
                            shop
                        </div>
                        <div class="w-[24%] min-w-[180px] h-full flex items-center text-sm text-black font-bold justify-center px-4">
                            Item
                        </div>
                        <div class="w-[18%] min-w-[120px] h-full flex items-center justify-center text-sm font-bold text-black border-l-[1px] border-transparent">
                            Date<font-awesome-icon class="ml-2" :icon="['fas', 'sort']" />
                        </div>
                        <div class="w-[18%] min-w-[120px] h-full flex items-center justify-center text-sm font-bold text-black border-l-[1px] border-transparent text-center">
                            Created Time<font-awesome-icon class="ml-2" :icon="['fas', 'sort']" />
                        </div>
                        <div class="w-[20%] min-w-[120px] h-full flex items-center justify-center text-sm font-bold px-4 border-l-[1px] border-transparent">
                            Amount<font-awesome-icon class="ml-2" :icon="['fas', 'sort']" />
                        </div>
                        <div class="w-[4%] min-w-[50px] h-full flex items-center justify-center text-sm font-bold px-4">
                            <!-- <font-awesome-icon :icon="['fas', 'caret-down']"  :class="[ isOpen ? 'rotate-180' : '' ]" /> -->
                        </div>
                    </section>
                </div>
               
               <section class="flex-auto bg-[#eee] min-w-[calc(120px*3+180px*2+94px)] px-[10px]">
                    <div v-for="({
                            id,
                            shop,
                            item,
                            date,
                            createdDate,
                            category,
                            selfDefinedCategory,
                            amount,
                            memo,
                            isOpen,
                            isEdit
                        }, index) in originalRecord"
                        :key="index"
                        class="relative md:w-[calc(100%-60px)] rounded-[30px] mx-auto flex mt-6 mb-3 min-w-[calc(120px*3+180px*2+94px)] overflow-hidden"
                        :class="[ originalRecord[index].isOpen ? 'h-[150px] bg-transparent' : 'h-[58px] bg-white' ]">
                        <article class="memo absolute w-full bg-linear rounded-[30px] top-0 left-0 transition-all duration-300 flex items-end"
                            :class="[ isOpen ? 'h-[150px]' : 'h-0' ]">
                            <div class="w-full h-[92px] flex flex-wrap justify-start items-center"
                                :class="[ isOpen ? 'h-[30px] opacity-100' : 'h-0 hidden opacity-0' ]">
                                
                                <section class="w-[calc(100%-70px)]">
                                    <div class="flex mb-2">
                                        <div class="w-[100px] text-xs md:text-sm flex justify-end items-center font-bold text-[#aaa]">
                                            item
                                        </div>
                                        <h4 class="pl-4 text-xs text-bold">{{ item || '' }}</h4>
                                    </div>
                                    <div class="flex ">
                                        <div class="w-[100px] text-sm flex justify-end items-center font-bold text-[#aaa]">
                                            memo
                                        </div>
                                        <h4 v-if="!isEdit || !isOpen" class="pl-4 text-xs text-bold">{{ memo || '' }}</h4>
                                        <input v-if="isEdit && isOpen"
                                            class="mx-2 text-[#999] bg-white w-[70%] px-2 text-xs" type="text" v-model="modifiedRecord[index].memo" @keyup="validInputMsg(index, 'memo')">
                                    </div>
                                </section>
                                <div class="w-[50px] relative text-lg z-[1] cursor-pointer">
                                    <font-awesome-icon v-if="!isEdit" class="mr-4 hover:text-secondary hover:scale-125 " :icon="['fas', 'pen-to-square']"
                                        @click.stop="switchEditState(index)"/>
                                    <font-awesome-icon v-if="isEdit" class="mr-4 hover:text-secondary hover:scale-125" :icon="['fas', 'clipboard-check']" 
                                        @click.stop="editRecord(index, id)"/>
                                    <font-awesome-icon class="hover:text-secondary hover:scale-125" :icon="['fas', 'trash']" @click="deleteRecord(id)"/>
                                </div>
                                
                            </div>

                        </article>
                        <div class="w-full h-[58px] z-[5] flex py-3 rounded-[30px] border-2"
                            :class="[
                                isOpen ? 'bg-linear' : 'border-transparent hover:border-[#ccc]',
                                modifiedRecord[index].valid ? 'border-black' : 'border-pink-600'
                            ]">
                            <div class="w-[16%] min-w-[180px] h-full flex items-center text-sm font-bold px-4">
                                <font-awesome-icon class="text-[#ccc] text-base md:text-xl" :icon="['fas', 'store']" />
                                <h4 v-if="!isEdit || !isOpen" class="pl-3 truncate">{{ shop }} </h4>
                                <input v-if="isEdit && isOpen" class="mx-2 text-[#999] bg-whitee w-full px-2" type="text"  v-model="modifiedRecord[index].shop" @keyup="validInputMsg(index, 'shop')">
                            </div>
                            <div class="w-[24%] min-w-[180px] h-full flex items-center text-sm font-bold px-4 border-l-[1px] border-[#ccc]">
                                <font-awesome-icon class="text-secondary text-base md:text-xl" :icon="getIconForCategory(category)" />
                                <h4 v-if="!isEdit || !isOpen" class="pl-3 truncate">{{ item }}</h4>
                                <input v-if="isEdit && isOpen" class="mx-2 text-[#999] bg-whitee w-full px-2" type="text"  v-model="modifiedRecord[index].item" @keyup="validInputMsg(index, 'item')">
                            </div>
                            <div class="w-[18%] min-w-[120px] h-full flex items-center justify-center text-sm font-bold text-[#888] border-l-[1px] border-[#ccc]">
                                <h4 v-if="!isEdit || !isOpen">{{ date }}</h4>
                                <input v-if="isEdit && isOpen" class="mx-2 text-[#999] bg-whitee w-full px-2" type="text"  v-model="modifiedRecord[index].date" :pattern="regexMap.date.regex"  @keyup="validInputMsg(index, 'date')">
                            </div>
                            <div class="w-[18%] min-w-[120px] h-full flex items-center justify-center text-sm font-bold text-[#888] border-l-[1px] border-[#ccc] text-center">
                               {{ createdDate || '0000/00/00' }}
                            </div>
                            <div class="w-[20%] min-w-[120px] h-full flex items-center justify-between text-sm font-bold px-4 border-l-[1px] border-[#ccc]">
                                <span class="font-extrabold text-secondary text-xl">$</span>
                                <h4 v-if="!isEdit || !isOpen">
                                    <span class="font-extrabold text-secondary text-xl">
                                        {{ toCommas(amount) }}
                                    </span>
                                </h4>
                                <input v-if="isEdit && isOpen" v-model="modifiedRecord[index].amount" class="ml-4 text-[#999] bg-white w-full px-2 text-right focus:outline-none"
                                 type="text" @keyup="validInputMsg(index, 'amount')">
                            </div>
                            <div class="w-[4%] min-w-[50px] h-full flex items-center justify-center text-sm font-bold px-4 border-l-[1px] border-[#ccc] cursor-pointer group"
                            @click="toggleBorderClass($event, index)">
                                <font-awesome-icon class="group-hover:text-secondary group-hover:scale-125"
                                    :icon="!isEdit || !isOpen ? ['fas', 'caret-down'] : ['fas', 'circle-xmark']"
                                    :class="[ isOpen ? 'rotate-180' : '' ]" />
                            </div>
                        </div>
                    </div>
                </section>
                
           </article>
       </div>
       <dialog v-if="showModal" class="fixed w-[90%] sm:w-[300px] h-[150px] top-[2vh] sm:top-[calc(50%-75px)] drop-shadow-lg rounded-[10px] z-10 bg-white flex flex-col md:flex-row p-0 transition-all duration-200">
            <font-awesome-icon class="text-secondary absolute left-[10px] top-[5px] text-4xl cursor-pointer hover:scale-125 hover:text-black transition-all duration-200" :icon="['fas', 'xmark']" 
            @click="showModal = false"/>
            <p class="w-full h-[100% flex justify-center items-center text-pink-600 text-extrabold">
                {{ invalidInputMsg }}
            </p>
       </dialog>
       <div v-if="showModal" class="w-full h-[100vh] bg-[rgba(95,57,47,.6)] fixed sm:z-[9] top-0 left-0 transition-all duration-200"></div>
   </section>
</template>
<style lang="scss" scoped>
.active.memo {
        @apply h-[120px];
    
}
</style>
<script setup>
    import dayjs from 'dayjs'
    import Cookies from 'js-cookie'
    import { storeToRefs } from 'pinia'
    import { userCenterStore } from '~/stores/userCenter.js';
    import { categoryDefaultList, regexMap, regexTester, validInput } from '~/globalDatas';
    import { getIconForCategory, monthToName, toCommas } from '~/utility';
    import { orderBy } from 'lodash';

    const { $db } = useNuxtApp();
    const { spendingRecords, recordsMonths, latestMonth } = storeToRefs(userCenterStore());
    // const { setIsOpenToSpendingRecords } = userCenterStore();
    const deviceWidth = ref(0);
    let originalRecord = ref([]);
    let modifiedRecord = reactive([]);
    let openCounter = ref(0);
    let openIndex = reactive([]);
    const invalidInputMsg = ref('');
    let showModal = ref(false);
    let currentMonth = ref('');
    let amountData = ref(0);
    let sortMap = reactive({
        date: 'desc',
        createdTime: 'asc',
        amount: 'asc',
    });
    let sortType = ref('date');

    function resetSpendingRecords () {
        // const { spendingRecords } = storeToRefs(userCenterStore());
        const [list] = recordsMonths.value
            .filter(({ month }) => month === currentMonth.value)
            .map(({ list }) => list);

        originalRecord.value = JSON.parse(JSON.stringify(list));
        modifiedRecord = JSON.parse(JSON.stringify(list))
            .map((item) => (
                {
                    ...item,
                    valid: true
                }
            ));

        if (sortType.value === 'date') {
            originalRecord.value = orderBy(originalRecord.value, ['date'], [sortMap[sortType.value]]);
            modifiedRecord = orderBy(modifiedRecord, ['date'], [sortMap[sortType.value]]);
        }

        amountData.value = calculateSum ();
        
    }

    currentMonth.value = latestMonth.value;
    resetSpendingRecords ();

    onMounted(() => {
        deviceWidth.value = window.innerWidth;
        window.addEventListener('resize', () => {
            deviceWidth.value = window.innerWidth;
        })
    })

   function toggleBorderClass ($event, index) {
        // isOpen.value = !isOpen.value;
        // resetSpendingRecords ();
        // setIsOpenToSpendingRecords(index);
        switchOpenStatus(index);
   }

   async function deleteRecord (deleteId) {
        await deleteUserSpendingRecord($db, Cookies.get('userId'), deleteId)
        await loadUserSpendingRecord($db, Cookies.get('userId'));
   }
   
   function switchEditState (index) {
    originalRecord.value[index].isEdit = !originalRecord.value[index].isEdit
   }

   function loopInvalidInput (index) {
        const modifiedData = modifiedRecord[index];
        const {
            id,
            item,
            category,
            selfDefinedCategory,
            date,
            amount,
            memo
        } = modifiedData;

        const newData = {
            id,
            item,
            category,
            selfDefinedCategory,
            date,
            amount,
            memo
        };

        const valid = Object.keys(newData)
            .filter((key) => key !== 'id')
            .filter((key) => {
                if (selfDefinedCategory === '') return key !== 'selfDefinedCategory';
                if (memo === '') return key !== 'memo';
            })
            .every((key) => {
                // console.log('key', key)
                if (newData[key] === '') return false;
                if (newData[key]) {
                    console.log('validKey', key)
                    const regex = regexMap[key].regex;
                    return regexTester(regex, newData[key]);
                } 
            })
        
        return valid;
   }

   async function editRecord(index, editId) {
        const valid = loopInvalidInput (index);
        showModal.value = !valid;
        const modifiedData = modifiedRecord[index];
        const {
            id,
            shop,
            item,
            category,
            selfDefinedCategory,
            date,
            amount,
            memo
        } = modifiedData;

        if (valid) {
            await editUserSpendingRecord(
                $db, Cookies.get('userId'), editId,
                {
                    id,
                    shop,
                    item,
                    category,
                    selfDefinedCategory,
                    date,
                    amount,
                    memo
                });
            await loadUserSpendingRecord($db, Cookies.get('userId'));
            await resetSpendingRecords ();
        }
   }

   function cancelEditRecord (index) {
        originalRecord[index].isEdit = false;
   }

   function switchOpenStatus (index) {
        const switchIsOpen = (targetIndex) => {
          originalRecord.value[targetIndex].isOpen = originalRecord.value[targetIndex].openCounter % 2 === 1;
        }

        if (!originalRecord.value[index].isOpen) originalRecord.value[index].isEdit = false;

        openIndex.push(index);

        if(openIndex.length > 2) openIndex.splice(0, 1);
        if(openIndex.length > 1) {
          const [prev, next] = openIndex;
          if (prev !== next) originalRecord.value[prev].openCounter = 0;
          switchIsOpen(prev);
        }
        
        originalRecord.value[index].openCounter ++;
        originalRecord.value = JSON.parse(JSON.stringify(originalRecord.value));
        switchIsOpen(index);
   }
   
    function validInputMsg (index, type) {
        invalidInputMsg.value = validInput (modifiedRecord[index], type);
        modifiedRecord[index].valid = loopInvalidInput (index);
    }

    function calculateSum () {
        return modifiedRecord
            .reduce((sum, { amount }) => sum + Number(amount), 0);
    }

    watch(currentMonth, (val, oldVal) => {
        resetSpendingRecords ();
        amountData.value = calculateSum ();
    })

    watch(sortType, (val, oldVal) => {
        
    })
</script>