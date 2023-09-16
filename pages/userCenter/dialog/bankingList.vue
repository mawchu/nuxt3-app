<template>

    <!-- 新增花費 -->
    <dialog class="fixed w-[calc(100%-20px)] sm:w-[90%] lg:w-[max(80%,800px)] xl:w-[960px] h-[96vh] sm:h-[80vh] top-[2vh] sm:top-[10vh] drop-shadow-lg rounded-[max(3vw,3vh)] z-[9] bg-white flex flex-col md:flex-row p-0 transition-all duration-200" :class="[ props.modalShow ? '' : 'opacity-0 pointer-events-none' ]" @click="categoryDrop = false, colorsDrop = false">
        <font-awesome-icon class="text-secondary absolute left-[25px] top-[20px] text-4xl cursor-pointer hover:scale-125 hover:text-black transition-all duration-200" :icon="['fas', 'xmark']" 
            @click="emit('modalShowEmit', false);"/>
        <img class="md:hidden absolute w-[70px] md:w-[136px] left-[15%] bottom-[16%] md:left-[calc(100%-110px)] md:bottom-[8%] z-[11]" :src="coinBank" alt="">
        <div class="w-full h-[100%] rounded-[max(3vw,3vh)] flex flex-col md:flex-row">
            <div class="w-full md:w-[60%] lg:w-[50%] h-[78%] md:h-[100%] flex items-center justify-center">
                <div class="w-[90%]">
                    <h2 class="text-center font-extrabold text-xl md:text-2xl text-black pt-[12px]">Add a Bank Account</h2>
                    <div class="w-[40%] mx-auto my-3 border-b-[1px] border-black"></div>
                    <p class="text-center">Current account list</p>
                    <!-- banking list -->
                    <div class="border-[1px] border-black rounded-lg min-h-[120px] my-2 sm:my-4 mx-1 sm:mx-3 p-1">
                        <div v-for="({ bank, name, color, balance }, index) in bankingList"
                            class="flex justify-between items-center px-2">
                            <article class="flex items-center">
                                <div class="w-[14px] h-[14px] rounded-full mr-2"
                                    :style="`background: ${color}`"></div>
                                <h2 class="capitalize text-sm">{{ `${name}（${bank}）` }}</h2>
                                
                            </article>
                            <span class="font-bold">$ {{ toCommas(balance) }}</span>
                        </div>
                    </div>
                    <form class="max-w-[500px] sm:px-3 md:px-4 lg:px-6 mx-auto h-[100%] flex flex-wrap justify-center" @submit.prevent="">
                        <!-- 日期 -->
                        <label class="relative flex w-full items-center justify-end py-[0.3rem]" for="date">
                            <div class="flex flex-shrink-0 justify-end text-right font-bold text-black" role="label"
                                :class="mobileLabelWidth">
                                <h3>
                                    <span class="font-bold text-sm sm:text-base"
                                        :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Bank </span>
                                    <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">銀行</span>
                                </h3>
                            </div>
                            <input v-model="submitBanking.bank" class="placeholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 focus:bg-primary  autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)] font-bold sm:text-base md:text-lg"
                            :class="mobileInputWidth" type="text" name="bank"
                            :placeholder="deviceWidth < mobileFormBreakpointSm ? '銀行：' : '輸入帳戶銀行...'"
                            @keyup="validInputMsg('bank')"/>
                        </label>
                        <!-- 命名 -->
                        <label class="relative flex w-full items-center justify-end py-[0.3rem]" for="date">
                            <div class="flex flex-shrink-0 justify-end text-right font-bold text-black" role="label"
                                :class="mobileLabelWidth">
                                <h3>
                                    <span class="font-bold text-sm sm:text-base"
                                        :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Name </span>
                                    <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">命名</span>
                                </h3>
                            </div>
                            <input v-model="submitBanking.name" class="placeholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 focus:bg-primary  autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)] font-bold sm:text-base md:text-lg"
                            :class="mobileInputWidth" type="text" name="bank"
                            :placeholder="deviceWidth < mobileFormBreakpointSm ? '命名：' : '輸入帳戶名稱...'"
                            @keyup="validInputMsg('name')"/>
                        </label>
                        <!-- 結餘 -->
                        <label class="relative flex w-full items-center justify-end py-[0.3rem]" for="balance">
                            <div class="flex flex-shrink-0 justify-end text-right font-bold text-black" role="label"
                                :class="mobileLabelWidth">
                                <h3>
                                    <span class="font-bold text-sm sm:text-base"
                                        :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Balance </span>
                                    <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">結餘</span>
                                </h3>
                            </div>
                            <span class="absolute left-[150px] text-black font-bold"
                                :class="[
                                    deviceWidth < mobileFormBreakpointXs
                                        ? 'left-[15px]' : deviceWidth < mobileFormBreakpointSm
                                        ? 'left-[80px]' : 'left-[150px]'
                                ]">$</span>
                            <input v-model="submitBanking.balance"
                                class="placeholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 focus:bg-primary  autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)] font-bold sm:text-base md:text-lg text-right"  :class="mobileInputWidth"
                                :placeholder="deviceWidth < mobileFormBreakpointSm ? '結餘' : '輸入結餘...'" type="text" name="balance"
                                @keyup="validInputMsg('balance')"/>
                        </label>
                        <!-- 目的 -->
                        <label class="relative flex w-full items-center justify-end py-[0.3rem]" for="category">
                            <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                :class="mobileLabelWidth">
                                <h3>
                                    <span class="font-bold text-sm sm:text-base"
                                        :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Purpose </span>
                                    <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">用途</span>
                                </h3>
                            </div>
                            <div class="relative w-[calc(100%-60px)]" >
                                <button class="w-full h-[38px] sm:h-[38px] bg-[#eee] rounded-full active:border-primary active:border-2 text-sm md:text-md pl-4 flex justify-start items-center border-2 border-transparent"
                                @click.stop="categoryDrop = !categoryDrop, colorsDrop = false">
                                    <span>
                                        {{ purposeCategory.title ? purposeCategory.title : '選擇' }}
                                    </span>
                                    <font-awesome-icon class="absolute right-[10px] top-[calc((38px/2)-8px)] transition-all duration-200"
                                        :class="[ categoryDrop ? 'rotate-180' : '' ]"
                                        :icon="['fas', 'caret-down']" />
                                </button>
                                <ul v-if="categoryDrop" class="absolute w-full top-[42px] left-0 bg-[#eee] rounded-[10px] z-[5] text-sm md:text-lg border-2 border-[#ccc] h-[calc(38px*4)] overflow-y-auto" @click="categoryDrop = false, colorsDrop = false">
                                    <li v-for="({title, value}, index) in purposeDefaultList" :key="index"
                                        class="h-[38px] px-4 flex items-center justify-between hover:bg-quaternary hover:text-white text-sm"
                                        :class="[ value === purposeCategory.value ? 'bg-primary' : '' ]"
                                        @click="changeCategory({
                                            title, value, type: 'purpose'
                                        })">
                                        
                                        {{ title ? title : '' }}
                                    </li>
                                </ul>
                                
                            </div>
                        </label>
                        <!-- 目的 -->
                        <label class="relative flex w-full items-center justify-end py-[0.3rem]" for="category">
                            <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                :class="mobileLabelWidth">
                                <h3>
                                    <span class="font-bold text-sm sm:text-base"
                                        :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Color </span>
                                    <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">顏色</span>
                                </h3>
                            </div>
                            <div class="relative w-[calc(100%-60px)]" >
                                <button class="w-full h-[38px] sm:h-[38px] bg-[#eee] rounded-full active:border-primary active:border-2 text-sm md:text-md pl-4 flex justify-start items-center border-2 border-transparent"
                                :class="getContrastColor(submitBanking.color ? submitBanking.color : '#eeeeee')"
                                :style="{ background: submitBanking.color || '#eee' }"
                                @click.stop="colorsDrop = !colorsDrop, categoryDrop = false">
                                    {{ submitBanking.color ? submitBanking.color : '選擇帳戶色彩...'}}
                                    <font-awesome-icon class="absolute right-[10px] top-[calc((38px/2)-8px)] transition-all duration-200"
                                        :class="[
                                            colorsDrop ? 'rotate-180' : ''
                                        ]"
                                        :icon="['fas', 'caret-down']" />
                                </button>
                                <ul v-if="colorsDrop"
                                    class="absolute flex w-full top-[42px] left-0 bg-[#eee] rounded-[10px] justify-around items-center px-2 z-[5] text-sm md:text-lg border-2 border-[#ccc] h-[36px] overflow-y-auto"
                                    @click="colorsDrop = false, categoryDrop = false">
                                    <li v-for="(color, index) in colors" :key="index"
                                        class="flex items-center justify-between transition-all duration-300 hover:bg-quaternary hover:text-white text-sm rounded-full overflow-hidden hover:cursor-pointer hover:scale-125 hover:border-primary border-[2px]"
                                        :class="[ color === colorCategory.value ? 'border-secondary scale-125' : 'border-transparent' ]"
                                        :style="`background: ${color}; width: 16px; height: 16px`"
                                        @click="changeCategory({
                                            title, value: color, type: 'color'
                                        }), validInputMsg('color')">
                                    </li>
                                </ul>
                                
                            </div>
                        </label>
                        <div v-if="validInformation" class="w-full h-[20px] text-right font-bold text-secondary">
                            <font-awesome-icon
                                class="ml-2" :icon="['fas', 'triangle-exclamation']" />
                            {{ validInformation }}
                        </div>

                        <!-- 送出 -->
                        <button class="w-[120px] h-[40px] rounded-full text-lg md:text-xl font-bold text-white bg-black mt-4 border-2 border-transparent hover:border-secondary hover:bg-white hover:text-secondary transition-all duration-200 z-[4] disabled:bg-[#ddd] disabled:hover:border-transparent disabled:text-[#aaa]" :disabled="!validForm"
                        @click.prevent="submitBankingAction ()">Done</button>
                    </form>
                </div>
            </div>
            <div class="w-full md:w-[40%] lg:w-[50%] h-[22%] md:h-[100%] relative rounded-b-[max(3vw,3vh)] md:rounded-bl-[0] md:rounded-r-[max(3vw,3vh)] overflow-hidden" >
                <span class="absolute hidden md:block md:text-2xl font-extrabold text-white right-[32%] top-[6%]">
                    Savings<br/>habits<br>grow<br/>wealth.
                </span>
                <img class="w-full h-[100%] object-cover hidden md:block " :src="popupBank" alt="">
                <img class="w-full h-[100%] object-cover md:hidden" :src="popupBankM" alt="">
            </div>
        </div>
        
    </dialog>
    <!-- <div class="fixed top-0 left-0 w-full h-[100vh] flex animate z-[10] pointer-events-none"
        :class="[ submitBankingFinish ? ' money' : '' ]">
        <figure class="w-[50%] h-[100%]">
            <img class="w-full h-[100%] object-contain object-left" :src="moneyBubbleL" alt="">
        </figure>
        <figure class="w-[50%] h-[100%]">
            <img class="w-full h-[100%] object-contain object-right" :src="moneyBubbleR" alt="">
        </figure>
    </div> -->
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
    import popupBank from '~/assets/images/bank.svg';
    import popupBankM from '~/assets/images/bank-m.svg';
    import coinBank from '~/assets/images/bank-coin.svg';
    import chroma from 'chroma-js';
    import { toCommas } from '~/utility';

    const colors = chroma
        .scale(['#FBA47E', '#FAE57A', '#8FD4BF', '#BE8FD4'])
        .mode('lch')
        .colors(10);

    // import { userAuthStore } from '~/stores/userAuth.js';
    import { userCenterStore } from '~/stores/userCenter.js';
    import { storeToRefs } from 'pinia'
    import { purposeDefaultList, regexMapBanking, regexTester, validInput } from '~/globalDatas';

    const { bankingList } = storeToRefs(userCenterStore());
    const { $db } = useNuxtApp();
    
    
    const mobileInputWidth = ref(null);
    const mobileLabelWidth = ref(null);
    const mobileFormBreakpointSm = ref(480);
    const mobileFormBreakpointXs = ref(360);

    const props = defineProps({
        modalShow: {
            required: true,
            default: false
        }
    });
    const deviceWidth = ref(0);
    const emit = defineEmits([
        'modalShowEmit'
    ]);

    // const modalShow = ref(false);
    const categoryDrop = ref(false);
    const colorsDrop = ref(false);
    let categoryType = ref('default');
    let purposeCategory = reactive({
        title: '', value: ''
    });
    let colorCategory = reactive({ value: '' });
    const categoryDisabled = ref(true);
    const submitBanking = reactive({
        bank: '',
        name: '',
        balance: '',
        purpose: '',
        color: ''
    });
    const submitBankingFinish = ref(false);
    const validInformation = ref('');
    const validForm = ref(false);

    await loadUserBankingList($db, Cookies.get('userId'));
    await console.log('bankingList', bankingList.value[0])
    
    onMounted(() => {
        deviceWidth.value = window.innerWidth;
        responsiveFormWidth ();
        window.addEventListener('resize', () => {
            responsiveFormWidth ();
        })
    })

    function changeCategory ({
        type, title, value
    }) {
        if (type === 'purpose') {
            purposeCategory.title = title;
            purposeCategory.value = value;
            submitBanking.purpose = value;
        }
        if (type === 'color') {
            colorCategory.value = value;
            submitBanking.color = value
        }
        
    }
    
   
    function responsiveFormWidth () {
        mobileInputWidth.value = deviceWidth.value < mobileFormBreakpointXs.value
            ? 'w-full' : deviceWidth.value < mobileFormBreakpointSm.value
            ? 'w-[calc(100%-60px)]' : 'w-[calc(100%-120px)]';
        mobileLabelWidth.value = deviceWidth.value < mobileFormBreakpointXs.value
            ? 'w-0' : deviceWidth.value < mobileFormBreakpointSm.value
            ? 'w-[60px] mr-2' : 'w-[120px] mr-4';
    }

    async function submitBankingAction () {
        console.log(submitBanking)
        submitBankingFinish.value = await true;
        submitBanking.createdDate = dayjs().format('YYYY/MM/DD HH:mm:ss')
        await createUserBankingList($db, Cookies.get('userId'), submitBanking);
        await loadUserBankingList($db, Cookies.get('userId'));
        console.log(
            'bankingList', bankingList.value
        )
        await Object.keys(submitBanking)
            .forEach((key) => {
                if (key !== 'date') submitBanking[key] = '';
            });
        purposeCategory = await reactive({
            title: '', value: '', icon: []
        });
        colorCategory = await reactive({ value: '' });

        // submitBankingFinish.value = await false;
        await setTimeout(() =>  submitBankingFinish.value = false, 3000)
    }
    
    function validInputMsg (type) {
        console.log('type', type)
        validInformation.value = validInput (submitBanking, type, regexMapBanking);
    }

    function getContrastColor(hexColor) {
        // Remove the hash (#) if it's included
        hexColor = hexColor.replace(/^#/, '');

        // Convert the hex color to RGB
        const r = parseInt(hexColor.slice(0, 2), 16);
        const g = parseInt(hexColor.slice(2, 4), 16);
        const b = parseInt(hexColor.slice(4, 6), 16);

        // Calculate the perceived brightness of the color
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // Use white text for dark backgrounds and black text for light backgrounds
        return brightness > 200 ? 'text-black' :'text-white';
    }

    watch(submitBanking, (val,oldVal)=>{
        // console.log(Object.keys(submitBanking))
        const valid = Object.keys(regexMapBanking)
            .every((key) => {
                const regex = regexMapBanking[key].regex;
                // console.log('key', key, regexTester(regex, submitBanking[key]))
                return regexTester(regex, submitBanking[key]) === true;
            })
        
        validForm.value = valid;
    })

    watch(categoryDisabled, (val,oldVal) => {
        if (categoryDisabled.value) categoryType.value = 'default';
        if (!categoryDisabled.value) categoryType.value = 'selfDefined';
    })
</script>