<template>

    <!-- 新增花費 -->
    <dialog class="fixed w-[calc(100%-20px)] sm:w-[90%] lg:w-[max(80%,800px)] xl:w-[960px] top-[2vh] sm:h-[80vh] sm:top-[10vh] drop-shadow-lg rounded-[max(3vw,3vh)] z-[9] bg-white flex flex-col md:flex-row p-0 transition-all duration-200" :class="[ props.modalShow ? '' : 'opacity-0 pointer-events-none' ]" :style="deviceWidth < 600 ? `height: calc(${deviceHeight}px - 4vh)` : ''" @click="categoryDrop = false">
        <font-awesome-icon class="text-secondary absolute left-[25px] top-[20px] text-4xl cursor-pointer hover:scale-125 hover:text-black transition-all duration-200" :icon="['fas', 'xmark']" 
            @click="emit('modalShowEmit', false);"/>
        <img class="absolute w-[70px] md:w-[136px] left-[15%] -bottom-[10px] md:left-[calc(100%-110px)] md:bottom-[8%] z-[11]" :src="lifebuoy" alt="">
        <img class="absolute w-[30px] md:w-[60px] left-[5%] bottom-[calc(26%-60px)] md:left-[calc(60%-20px)] lg:left-[calc(50%-20px)] md:top-[22%] z-[11]" :src="beachball" alt="">
        <div class="w-full h-[100%] rounded-[max(3vw,3vh)] flex flex-col md:flex-row">
            <div class="w-full md:w-[60%] lg:w-[50%] h-[82%] md:h-[100%] flex items-center justify-center">
                <div class="w-[90%]">
                    <h2 class="text-center font-extrabold text-xl md:text-2xl text-black pt-[12px]">Add a spending</h2>
                    <div class="w-[40%] mx-auto my-3 border-b-[1px] border-black"></div>
                    <form class="max-w-[500px] sm:px-3 md:px-4 lg:px-6 mx-auto h-[100%] flex flex-wrap justify-center" @submit.prevent="">
                        <!-- 日期 -->
                        <label class="relative flex w-full items-center justify-end py-[0.3rem]" for="date">
                            <div class="flex flex-shrink-0 justify-end text-right font-bold text-black" role="label"
                                :class="mobileLabelWidth">
                                <h3>
                                    <span class="font-bold text-sm sm:text-base"
                                        :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Date </span>
                                    <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">日期</span>
                                </h3>
                            </div>
                            <input v-model="submitSpending.date" class="placeholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 focus:bg-primary  autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)] font-bold sm:text-base md:text-lg focus:bg-primary"
                            :class="mobileInputWidth" type="text" name="date"
                            :placeholder="deviceWidth < mobileFormBreakpointSm ? '日期：' : 'YYYY/MM/DD'"
                            @keyup="validInputMsg('date')"/>
                        </label>
                        <!-- 商店 -->
                        <label class="elative flex w-full items-center justify-end py-[0.3rem]" for="shop">
                            <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                :class="mobileLabelWidth">
                                <h3>
                                    <span class="font-bold text-sm sm:text-base"
                                    :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]"> Shop </span>
                                    <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">商店</span>
                                </h3>
                            </div>
                            <input v-model="submitSpending.shop" class="placeholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 focus:bg-primary  autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)]  font-bold sm:text-base md:text-lg"  :class="mobileInputWidth"
                            :placeholder="deviceWidth < mobileFormBreakpointSm ? '商店：' : '輸入商店...'" type="text" name="shop"
                            @keyup="validInputMsg('shop')"/>
                        </label>
                        <!-- 項目 -->
                        <label class="relative flex w-full items-center py-[0.3rem]" for="item">
                            <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                :class="mobileLabelWidth">
                                <h3>
                                    <span class="font-bold text-sm sm:text-base"
                                    :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Item </span>
                                    <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">項目</span>
                                </h3>
                            </div>
                            <input v-model="submitSpending.item" class="placeholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 focus:bg-primary  autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)] font-bold sm:text-base md:text-lg"  :class="mobileInputWidth"
                            :placeholder="deviceWidth < mobileFormBreakpointSm ? '項目：' : '輸入項目...'" type="text" name="item"
                            @keyup="validInputMsg('item')"/>
                        </label>
                        
                        <!-- 類別 -->
                        <label class="relative flex w-full items-center justify-end py-[0.3rem]" for="category">
                            <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                :class="mobileLabelWidth">
                                <h3>
                                    <span class="font-bold text-sm sm:text-base"
                                        :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Category </span>
                                    <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">類別</span>
                                </h3>
                            </div>
                            <!-- 自訂類別 -->
                            <input v-model="submitSpending.selfDefinedCategory"
                                class="placeholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 focus:bg-primary  autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)] font-bold sm:text-base md:text-lg disabled:placeholder:text-[#ccc] disabled:bg-white"
                                :class="[
                                    (deviceWidth < mobileFormBreakpointSm) && categoryDisabled
                                        ? 'w-[55%]' : (deviceWidth > mobileFormBreakpointSm) && categoryDisabled
                                        ? 'w-[calc(75%-120px)]' : (!categoryDisabled) ? 'w-[65%]' : ''
                                ]"
                                :placeholder="deviceWidth < mobileFormBreakpointSm ? '類別：' : '新增...'" type="text" name="category" :disabled="categoryDisabled"
                                @blur="categoryDisabled = true"
                                @click.stop="categoryDisabled = false"
                                @keyup="validInputMsg('category')"/>
                                    <font-awesome-icon class="absolute top-[calc(50%-10px)] z-[3] cursor-pointer text-xl hover:text-secondary hover:scale-125 transition-all duration-200"
                                    :class="[
                                        categoryDisabled ? 'rotate-45' : '',
                                        (deviceWidth < mobileFormBreakpointXs) && categoryDisabled
                                            ? 'left-[42%]' : deviceWidth < mobileFormBreakpointSm && categoryDisabled
                                            ? 'left-[calc(35%+76px)]' : (categoryDisabled) ? 'right-[32%]' : 'right-[24%]'
                                    ]" :icon="[categoryDisabled ? 'fas' : 'far', 'circle-xmark']"
                                    @click="categoryDisabled = !categoryDisabled, categoryDrop = !categoryDrop"/>

                            <!-- 預設類別 -->
                            <div class="relative ml-2"
                                :class="[ 
                                    deviceWidth < mobileFormBreakpointSm ? 'w-[45%]' : 'w-[35%]',
                                    // categoryDisabled ? '' : 'hidden'
                                ]">
                                
                                <button class="w-full h-[34px] sm:h-[38px] bg-[#eee] rounded-full active:border-primary active:border-2 text-sm md:text-md pl-2 flex justify-start items-center border-2 border-transparent" @click.stop="categoryDrop = !categoryDrop">
                                    <span v-if="categoryType === 'default'">
                                        {{ targetCategory.title ? targetCategory.title : '選擇' }}
                                    </span>
                                    <font-awesome-icon v-if="categoryType === 'selfDefined'" class="text-[#999]" :icon="targetCategory.icon"></font-awesome-icon>
                                    <font-awesome-icon class="absolute right-[10px] top-[calc((38px/2)-8px)] transition-all duration-200"
                                        :class="[ categoryDrop ? 'rotate-180' : '' ]"
                                        :icon="['fas', 'caret-down']" />
                                </button>
                                <ul v-if="categoryType === 'default' && categoryDrop" class="absolute w-full top-[38px] left-0 bg-[#eee] rounded-[10px] z-[5] text-sm md:text-lg border-2 border-[#ccc] h-[calc(38px*5)] overflow-y-auto" @click="categoryDrop = false">
                                    <li v-for="({title, value, icon}, index) in categoryDefaultList" :key="index"
                                        class="h-[38px] px-2 flex items-center justify-between hover:bg-quaternary hover:text-white text-sm"
                                        :class="[ value === targetCategory.value ? 'bg-primary' : '' ]"
                                        @click="changeCategory({
                                            title, value
                                        })">
                                        
                                        {{ title ? title : '' }}
                                        <font-awesome-icon class="text-[#999]" :icon="icon"></font-awesome-icon>
                                    </li>
                                </ul>
                                <ul v-if="categoryType === 'selfDefined' && categoryDrop" class="absolute w-full top-[38px] left-0 bg-[#eee] rounded-[10px] z-[5] text-sm md:text-lg border-2 border-[#ccc] h-[calc(38px*5)] overflow-y-auto" @click="categoryDrop = false">
                                    <li v-for="({value, icon}, index) in selfDefinedCategory" :key="index"
                                        class="h-[38px] px-2 flex items-center justify-center hover:bg-quaternary hover:text-white text-sm cursor-pointer"
                                        :class="[ value === targetCategory.value ? 'bg-primary' : '' ]"
                                        @click="changeCategory({
                                            value, icon
                                        })">
                                        <font-awesome-icon class="text-[#999]" :icon="icon"></font-awesome-icon>
                                    </li>
                                </ul>
                            </div>
                        </label>
                        <!-- 金額 -->
                        <label class="relative flex w-full items-center py-[0.3rem]" for="amount">
                            <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                :class="mobileLabelWidth">
                                <h3>
                                    <span class="font-bold text-sm sm:text-base"
                                        :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Amount </span>
                                    <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">金額</span>
                                </h3>
                            </div>
                            <span class="absolute left-[150px] text-black font-bold"
                                :class="[
                                    deviceWidth < mobileFormBreakpointXs
                                        ? 'left-[15px]' : deviceWidth < mobileFormBreakpointSm
                                        ? 'left-[80px]' : 'left-[150px]'
                                ]">$</span>
                            <input v-model="submitSpending.amount"
                                class="placeholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 focus:bg-primary  autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)] font-bold sm:text-base md:text-lg text-right"  :class="mobileInputWidth"
                                :placeholder="deviceWidth < mobileFormBreakpointSm ? '金額' : '輸入金額...'" type="text" name="amount"
                                @keyup="validInputMsg('amount')"/>
                        </label>
                        <!-- 備註 -->
                        <label class="relative flex w-full items-center justify-end py-[0.3rem]" for="memo">
                            <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                :class="mobileLabelWidth">
                                <h3>
                                    <span class="font-bold text-sm sm:text-base"
                                        :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Memo </span>
                                    <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">備註</span>
                                </h3>
                            </div>
                            <textarea v-model="submitSpending.memo"
                                class="placeholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-semibold block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 focus:bg-primary  autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)]  font-bold sm:text-base md:text-lg"  :class="mobileInputWidth" rows="3"
                                placeholder="輸入備註..." type="text" name="memo"
                                @keyup="validInputMsg('memo')"/>
                        </label>
                        <div v-if="validInformation" class="w-full h-[20px] text-right font-bold text-secondary">
                            <font-awesome-icon
                                class="ml-2" :icon="['fas', 'triangle-exclamation']" />
                            {{ validInformation }}
                        </div>
                        <!-- 送出 -->
                        <button class="w-[120px] h-[40px] rounded-full text-lg md:text-xl font-bold text-white bg-black mt-4 border-2 border-transparent hover:border-secondary hover:bg-white hover:text-secondary transition-all duration-200 z-[4] disabled:bg-[#ddd] disabled:hover:border-transparent disabled:text-[#aaa]" :disabled="!validForm"
                        @click.prevent="submitSpendingAction ()">Done</button>
                    </form>
                </div>
            </div>
            <div class="w-full md:w-[40%] lg:w-[50%] h-[18%] md:h-[100%] relative rounded-b-[max(3vw,3vh)] md:rounded-bl-[0] md:rounded-r-[max(3vw,3vh)] overflow-hidden">
                <span class="absolute hidden md:block md:text-2xl text-center font-extrabold text-white left-[18%] top-[calc(30%-80px)]">
                    Every<br/>spending<br>is the<br/>footprint of <br/>living =)
                </span>
                <img class="w-full h-[100%] object-cover hidden md:block" :src="popupBeach" alt="">
                <img class="w-full h-[100%] object-cover md:hidden" :src="popupBeachM" alt="">
            </div>
        </div>
        
    </dialog>
    <div class="fixed top-0 left-0 w-full h-[100vh] flex animate z-[10] pointer-events-none"
        :class="[ submitSpendingFinish ? ' money' : '' ]">
        <figure class="w-[50%] h-[100%]">
            <img class="w-full h-[100%] object-contain object-left" :src="moneyBubbleL" alt="">
        </figure>
        <figure class="w-[50%] h-[100%]">
            <img class="w-full h-[100%] object-contain object-right" :src="moneyBubbleR" alt="">
        </figure>
    </div>
</template>
<style lang="scss">

    .scrollbar-color {
        scrollbar-color: blue red;
    }

    .bg {
        &-linear {
        background: linear-gradient(135deg, rgba(232,255,220,1) 52%, rgba(252,247,172,0.46) 100%);
        background-size: cover;
        background-repeat: no-repeat;
        }
    }
    .animate {
        opacity: 0;
        &.money {
            
            animation-name: bubbleFly;
            animation-duration: 3s;
            animation-fill-mode: forwards;
            animation-timing-function: ease-in-out;
        }
    }

    @keyframes bubbleFly {
        0% {
            transform: translateY(200vh);
            opacity: 1;
        }

        96% {
            transform: translateY(-100vh);
            opacity: 1;
        }

        100% {
            transform: translateY(-100vh);
            opacity: 0;
        }
    }
</style>
<script setup>
    
    import Cookies from 'js-cookie'
    import dayjs from 'dayjs';
    import popupBeach from '~/assets/images/popup.svg';
    import popupBeachM from '~/assets/images/popup-m.svg';
    import lifebuoy from '~/assets/images/lifebuoy.png';
    import beachball from '~/assets/images/beachball.png';
    import moneyBubbleL from '~/assets/images/money-bubbles-l.svg';
    import moneyBubbleR from '~/assets/images/money-bubbles-r.svg';

    // import { userAuthStore } from '~/stores/userAuth.js';
    // import { userCenterStore } from '~/stores/userCenter.js';
    // import { storeToRefs } from 'pinia'
    import { categoryDefaultList, selfDefinedCategory, regexMap, regexTester, validInput } from '~/globalDatas';

    // const { toggleMenu } = storeToRefs(userCenterStore());
    const { $db } = useNuxtApp();
    
    
    const mobileInputWidth = ref(null);
    const mobileLabelWidth = ref(null);
    const mobileFormBreakpointSm = ref(480);
    const mobileFormBreakpointXs = ref(360);

    const props = defineProps({
        modalShow: {
            required: true,
            default: false
        },
        deviceWidth: {
            required: true,
            default: 0
        },
        deviceHeight: {
            required: true,
            default: 0
        }
    });
    const deviceWidth = ref(props.deviceWidth);
    const deviceHeight = ref(props.deviceHeight);
    const emit = defineEmits([
        'modalShowEmit'
    ]);

    // const modalShow = ref(false);
    const categoryDrop = ref(false);
    let categoryType = ref('default');
    let targetCategory = reactive({
        title: '', value: '', icon: []
    });
    const categoryDisabled = ref(true);
    const submitSpending = reactive({
        date: dayjs().format('YYYY/MM/DD'),
        createdDate: '',
        shop: '',
        item: '',
        category: '',
        selfDefinedCategory: '',
        amount: '',
        memo: ''
    });
    const submitSpendingFinish = ref(false);
    const validInformation = ref('');
    const validForm = ref(false);
    
    onMounted(() => {
        deviceWidth.value = window.innerWidth;
        responsiveFormWidth ();
        window.addEventListener('resize', () => {
            responsiveFormWidth ();
            deviceHeight.value = props.deviceHeight;
            deviceWidth.value = props.deviceWidth;
        })
    })

    function changeCategory ({
        title, value, icon
    }) {
        targetCategory.title = title;
        targetCategory.value = value;
        targetCategory.icon = icon;
        submitSpending.category = value;
    }
   
    function responsiveFormWidth () {
        mobileInputWidth.value = deviceWidth.value < mobileFormBreakpointXs.value
            ? 'w-full' : deviceWidth.value < mobileFormBreakpointSm.value
            ? 'w-[calc(100%-60px)]' : 'w-[calc(100%-120px)]';
        mobileLabelWidth.value = deviceWidth.value < mobileFormBreakpointXs.value
            ? 'w-0' : deviceWidth.value < mobileFormBreakpointSm.value
            ? 'w-[60px] mr-2' : 'w-[120px] mr-4';
    }

    async function submitSpendingAction () {
        submitSpendingFinish.value = await true;
        // Object.keys(submitSpending).forEach((value) => console.log(value))
        submitSpending.createdDate = dayjs().format('YYYY/MM/DD HH:mm:ss')
        await createUserSpendingRecord($db, Cookies.get('userId'), submitSpending);
        await loadUserSpendingRecord($db, Cookies.get('userId'));
        await Object.keys(submitSpending)
            .forEach((key) => {
                if (key !== 'date') submitSpending[key] = '';
            });
        targetCategory = await reactive({
            title: '', value: '', icon: []
        });

        // submitSpendingFinish.value = await false;
        await setTimeout(() =>  submitSpendingFinish.value = false, 3000)
    }
    
    function validInputMsg (type) {
        validInformation.value = validInput (submitSpending, type, regexMap);
    }

    watch(submitSpending, (val,oldVal)=>{
        // console.log(Object.keys(submitSpending))
        const valid = Object.keys(regexMap)
            .every((key) => {
                const regex = regexMap[key].regex;
                return regexTester(regex, submitSpending[key]) === true;
            })

        validForm.value = valid;
    })

    watch(categoryDisabled, (val,oldVal) => {
        if (categoryDisabled.value) categoryType.value = 'default';
        if (!categoryDisabled.value) categoryType.value = 'selfDefined';
    })
</script>