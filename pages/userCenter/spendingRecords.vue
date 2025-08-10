<template>
    <section class="w-full min-h-[calc(100vh-60px)] rounded-[12px] md:rounded-[20px] lg:rounded-[34px] bg-linear flex flex-wrap xl:flex-nowrap overflow-hidden">
       <div class="w-full h-[100%] flex flex-col">
            <div class="flex flex-col sm:flex-row justify-between items-center sm:items-end p-[16px] md:p-[24px]">
                <div class="flex sm:items-end pb-3 sm:pb-0">
                    <h2 class="flex items-center pt-6">
                        <font-awesome-icon class="text-2xl sm:text-3xl" :icon="['fas', 'clock']" />
                        <div class="flex flex-col mx-2 md:mx-4 text-right">
                           <div class="flex items-center translate-y-[6px]">
                                <div class="flex-grow-1 h-[1px] w-[100%] bg-[#999]"></div>
                                <span class="font-bold text-[#999] sm:ml-2">{{ originalRecord[0].date.substring(0, 4) }}</span>
                           </div>
                            <span class="text-center font-extrabold transition-all duration-300 lg:text-2xl flex">
                                {{ monthToName(dayjs(originalRecord[0].date).month(), 3) }} <span class="hidden sm:inline-block ml-2">Amount</span>
                            </span>
                        </div>
                    </h2>
                    <p class="text-secondary mb-0 flex items-end">
                        <span class="text-2xl font-extrabold">$</span>
                        <span class="text-4xl lg:text-5xl font-extrabold ">
                            {{ toCommas(amountData) }}
                        </span>
                    </p>
                </div>
                <div class="flex justify-center">
                    <div v-for="({ month }, index) in recordsMonths" :key="index"
                        class="w-[30px] h-[30px] mx-1 rounded-full  text-xl font-bold flex justify-center items-center cursor-pointer transition-all duration-200"
                        :class="[
                            currentMonth === month
                                ? 'bg-black text-white' : 'border-[3px] border-secondary text-secondary hover:bg-secondary hover:text-white'
                        ]"
                        @click="currentMonth = month">{{ month }}</div>
                </div>
            </div>
            <article class="w-full flex-auto bg-[#eee] overflow-x-auto h-[100vh]" style="flex: 0 1 auto">
                <div class="bg-primary min-w-[calc(120px*3+180px*2+94px)] drop-shadow-lg px-[10px] sticky top-0 left-0 z-[6]">
                    <section class="w-full md:w-[calc(100%-60px)] md:mx-auto h-[58px] z-[5] flex py-3 bg-primary">
                        <div class="w-[16%] min-w-[180px] h-full flex items-center text-sm text-black font-bold justify-center px-4">
                            shop
                        </div>
                        <div class="w-[24%] min-w-[180px] h-full flex items-center text-sm text-black font-bold justify-center px-4">
                            Item
                        </div>
                        <div class="w-[18%] min-w-[120px] h-full flex items-center justify-center text-sm font-bold text-black border-l-[1px] border-transparent cursor-pointer group"
                            @click="sortType = 'date', isAsc.date = !isAsc.date">
                            Date<font-awesome-icon class="ml-2 transition-all duration-200 rotate-90 group-hover:scale-125" :icon="['fas', isAsc.date ? 'backward' : 'forward' ]" />
                        </div>
                        <div class="w-[18%] min-w-[120px] h-full flex items-center justify-center text-sm font-bold text-black border-l-[1px] border-transparent text-center cursor-pointer group"
                            @click="sortType = 'createdDate', isAsc.createdDate = !isAsc.createdDate">
                            Created Time<font-awesome-icon class="ml-2 transition-all duration-200 rotate-90 group-hover:scale-125" :icon="['fas', isAsc.createdDate ? 'backward' : 'forward' ]" />
                        </div>
                        <div class="w-[20%] min-w-[120px] h-full flex items-center justify-center text-sm font-bold px-4 border-l-[1px] border-transparent cursor-pointer group"
                            @click="sortType = 'amount', isAsc.amount = !isAsc.amount">
                            Amount<font-awesome-icon class="ml-2 transition-all duration-200 rotate-90 group-hover:scale-125"
                            :icon="['fas', isAsc.amount ? 'backward' : 'forward' ]" />
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
                        class="relative md:w-[calc(100%-60px)] rounded-[30px] mx-auto flex mt-6 mb-3 min-w-[calc(120px*3+180px*2+94px)] group"
                        :class="[ originalRecord[index].isOpen ? 'h-[150px] bg-transparent' : 'h-[58px] bg-white' ]">
                        <article class="memo absolute w-full bg-linear rounded-[30px] top-0 left-0 transition-all duration-300 flex items-end"
                            :class="[ isOpen ? 'h-[150px]' : 'h-0' ]">
                            <div class="w-full h-[92px] flex flex-wrap justify-start items-center overflow-hidden" 
                                :class="[ isOpen ? 'h-[30px] opacity-100' : 'h-0 hidden opacity-0' ]">
                                
                                <section class="w-[calc(100%-70px)] c">
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
                                <div class="w-[50px] absolute right-[20px] top-[50%-14px] text-lg z-[1] cursor-pointer">
                                    <font-awesome-icon v-if="!isEdit" class="mr-4 hover:text-secondary hover:scale-125 text-[#999] transition-all duration-200" :icon="['fas', 'pen-to-square']"
                                        @click.stop="switchEditState(index)"/>
                                    <font-awesome-icon v-if="isEdit" class="mr-4 hover:text-secondary hover:scale-125  text-[#999] transition-all duration-200" :icon="['fas', 'clipboard-check']" 
                                        @click.stop="editRecord(index, id)"/>
                                    <font-awesome-icon class="hover:text-secondary hover:scale-125 text-[#999] transition-all duration-200" :icon="['fas', 'trash']" @click="deleteRecord(id)"/>
                                </div>
                                
                            </div>

                        </article>
                        <div class="w-full h-[58px] z-[5] flex py-3 rounded-[30px] border-2 cursor-pointer"
                            :class="[
                                isOpen ? 'bg-linear' : 'border-transparent hover:border-[#ccc]',
                                modifiedRecord[index].valid ? 'border-black' : 'border-pink-600'
                            ]" @click="toggleBorderClass($event, index, isEdit)">
                            <div class="w-[16%] min-w-[180px] h-full flex items-center text-sm font-bold px-4">
                                <font-awesome-icon class="text-[#ccc] text-base md:text-xl" :icon="['fas', 'store']" />
                                <h4 v-if="!isEdit || !isOpen" class="pl-3 truncate">{{ shop }} </h4>
                                <input v-if="isEdit && isOpen" class="mx-2 text-[#999] bg-whitee w-full px-2" type="text"  v-model="modifiedRecord[index].shop" @keyup="validInputMsg(index, 'shop')">
                            </div>
                            <div class="w-[24%] min-w-[180px] h-full flex items-center text-sm font-bold border-l-[1px] border-[#ccc]" :class="[ isEdit ? 'px-2' : 'px-4' ]">
                                <font-awesome-icon v-if="!isEdit || !isOpen"
                                    class="text-secondary text-base md:text-xl" :icon="getIconForCategory(category)" />
                                <!-- <input v-if="isEdit && isOpen" v-model="modifiedRecord[index].category"
                                    class="text-[#999] bg-whitee w-[40%] px-1" type="text" 
                                    @keyup="validInputMsg(index, 'category')"> -->
                                <div v-if="isEdit && isOpen"
                                    class="relative w-[40px] h-[20px] rounded-lg px-1 flex justify-between items-center"
                                    :class="[
                                        modifiedRecord[index].isDropdown
                                        ? 'bg-primary' : 'bg-white'
                                    ]"
                                    @click="switchDropdownState(index)">
                                    <font-awesome-icon
                                        :class="[
                                            modifiedRecord[index].isDropdown
                                            ? 'text-white' : 'text-secondary'
                                        ]"
                                        class="text-sm" :icon="getIconForCategory(modifiedRecord[index].category)" 
                                       />
                                    <font-awesome-icon
                                        class="text-xs" :class="[
                                            modifiedRecord[index].isDropdown
                                            ? 'text-white' : ''
                                        ]"
                                        :icon="['fas', 
                                            modifiedRecord[index].isDropdown
                                            ?'caret-up' : 'caret-down'
                                        ]" />
                                    <div class="absolute top-[26px] left-0 w-[120px] bg-[#eee] rounded-lg z-10 flex flex-wrap shadow py-2 transition-all duration-200 border-solid border-2"
                                        :class="[
                                            modifiedRecord[index].isDropdown
                                                ? ' border-secondary opacity-100' : ' opacity-0 border-transparent'
                                        ]">
                                        <li v-for="({ title, value, icon }, categoryIndex) in categoryDefaultList" :key="index"
                                            class="h-[26px] w-[25%] flex items-center justify-center text-sm p-1"
                                            @click="modifiedRecord[index].category = value">
                                            <font-awesome-icon class="text-[#999] text-x p-1 hover:bg-quaternary hover:text-white rounded-full overflow-hidden" :class="[
                                            category === value
                                                ? 'bg-black text-white' : '' ]"
                                            :icon="icon">
                                        </font-awesome-icon>
                                        </li>
                                    </div>
                                </div>
                                <h4 v-if="!isEdit || !isOpen" class="pl-3 truncate">{{ item }}</h4>
                                <input v-if="isEdit && isOpen" v-model="modifiedRecord[index].item"
                                    class="text-[#999] bg-whitee w-[calc(100%-46px)] px-1 ml-[6px]" type="text" 
                                    @keyup="validInputMsg(index, 'item')">
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
                            <!-- 關閉編輯 -->
                            <div class="w-[4%] min-w-[50px] h-full flex items-center justify-center text-sm font-bold px-2 border-l-[1px] border-[#ccc] cursor-pointer">
                                <div class="transition-all duration-200 group-hover:bg-secondary rounded-full w-[30px] h-[30px] flex justify-center items-center">
                                    <font-awesome-icon class="transition-all duration-200 group-hover:text-white group-hover:scale-125"
                                    :icon="!isEdit || !isOpen ? ['fas', 'caret-down'] : ['fas', 'circle-xmark']"
                                    :class="[ isOpen ? 'rotate-180' : '' ]" 
                                    @click="isEdit = false"/>
                                </div>
                                
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
    import dayjs from 'dayjs';
    import Cookies from 'js-cookie'
    import { storeToRefs } from 'pinia'
    import { userCenterStore } from '~/stores/userCenter.js';
    import { categoryDefaultList, regexMap, regexTester, validInput } from '~/globalDatas';
    import { getIconForCategory, monthToName, toCommas } from '~/utility';
    import { orderBy } from 'lodash-es';

    const { $db } = useNuxtApp();
    const { spendingRecords, recordsMonths, latestMonth } = storeToRefs(userCenterStore());
    // const { setIsOpenToSpendingRecords } = userCenterStore();
    const deviceWidth = ref(0);
    let originalRecord = ref([]);
    let modifiedRecord = ref([]);
    let openCounter = ref(0);
    let openIndex = reactive([]);
    const invalidInputMsg = ref('');
    let showModal = ref(false);
    let currentMonth = ref('');
    let amountData = ref(0);
    const recordsMonthsGap = ref([])
    let currentGapIndex = ref(0);
    // let sortMap = reactive({
    //     date: 'desc',
    //     createdTime: 'asc',
    //     amount: 'asc',
    // });
    let sortType = ref('');
    const isAsc = reactive({
        date: ref(false),
        createdDate: ref(false),
        amount: ref(false),
    });

    function resetSpendingRecords () {
        // console.log('resetSpendingRecords')
        // const { spendingRecords } = storeToRefs(userCenterStore());
        let [list] = recordsMonths.value
            .filter(({ month }) => month === currentMonth.value)
            .map(({ list }) => list);

        currentGapIndex.value = recordsMonths.value.length;
        recordsMonthsGap.value.push(
            ...recordsMonths.value.filter((month, index) => index > (currentGapIndex.value - 4))
        )

        list = orderBy(list, ['date'], [isAsc.value ? 'asc' : 'desc']);

        originalRecord.value = JSON.parse(JSON.stringify(list));
        modifiedRecord.value = JSON.parse(JSON.stringify(list))
            .map((item) => (
                {
                    ...item,
                    valid: true,
                    isDropdown: false
                }
            ));

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

   function toggleBorderClass ($event, index, isEdit) {
        // isOpen.value = !isOpen.value;
        // resetSpendingRecords ();
        // setIsOpenToSpendingRecords(index);
        if (!isEdit) switchOpenStatus(index);
   }

   async function deleteRecord (deleteId) {
        await deleteUserSpendingRecord($db, Cookies.get('userId'), deleteId)
        await loadUserSpendingRecord($db, Cookies.get('userId'));
        await resetSpendingRecords();
   }
   
   function switchEditState (index) {
        originalRecord.value[index].isEdit = !originalRecord.value[index].isEdit
   }

   function switchDropdownState (index) {
        modifiedRecord.value[index].isDropdown = !modifiedRecord.value[index].isDropdown
   }

   function loopInvalidInput (index) {
        const modifiedData = modifiedRecord.value[index];
        console.log('modifiedData', modifiedData)
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

        const newData = {
            id,
            shop,
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
                const regex = regexMap[key].regex;
                return regexTester(regex, newData[key]) === true;
            })
        
        return valid;
   }

   async function editRecord(index, editId) {
        const valid = loopInvalidInput (index);
        showModal.value = !valid;
        const modifiedData = modifiedRecord.value[index];
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
        originalRecord.value[index].isEdit = false;
        modifiedRecord.value[index].isEdit = false;
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
        invalidInputMsg.value = validInput (modifiedRecord.value[index], type, regexMap);
        modifiedRecord.value[index].valid = loopInvalidInput (index);
    }

    function calculateSum () {
        return modifiedRecord.value
            .reduce((sum, { amount }) => sum + Number(amount), 0);
    }

    watch(currentMonth, (val, oldVal) => {
        resetSpendingRecords ();
        amountData.value = calculateSum ();
    })

    function sortByType (type, order) {
        originalRecord.value = orderBy(originalRecord.value, [type], [order]);
        modifiedRecord.value = orderBy(modifiedRecord.value, [type], [order]);
    }

    function toggleMonths () {
        if(currentGapIndex.value > 0) currentGapIndex.value --;
    }

    watch(isAsc, (val, oldVal) => {
        sortByType(sortType.value, isAsc[sortType.value] ? 'asc' : 'desc');
    })

    watch(sortType, (val, oldVal) => {
        sortByType(sortType.value, isAsc[sortType.value] ? 'asc' : 'desc');
    })
    watch(modifiedRecord, (val, oldVal) => {
        console.log('modifiedRecord', modifiedRecord.value)
    })
</script>