<template>
    <section class="w-full h-[100vh] bg-primary flex">
        <nav class="sm:h-[100vh] flex flex-col justify-between items-center transition-all duration-300 w-[50px] sm:w-[84px]"
            :class="[ toggleMenu ? '' : 'sm:w-[15%] min-w-[200px] xl:min-w-[260px] fixed top-0 left-0 z-[7] sm:relative h-[100vh] bg-primary' ]">
         
            <figure class="w-full cursor-pointer" @click="toComponent('home')">
                <img class="m-[8px] sm:m-[20px] transition-all duration-300"
                    :class="[ toggleMenu ? 'w-[36px] sm:w-[46px]' : 'w-[64px]' ]" :src="logoWhite" alt="">
            </figure>
            <section class="w-full pb-10">
                <article class="w-full flex flex-col justify-center items-center">
                    <figure class="rounded-full bg-white overflow-hidden transition-all duration-300"
                    :class="[ toggleMenu ? 'w-[34px] h-[34px] sm:w-[50px] sm:h-[50px]' : 'w-[82px] h-[82px]' ]">
                        <img class="w-full h-[100%] object-cover" :src="avatar" alt="">
                    </figure>
                    <strong class="text-black mt-3 md:text-md md:font-extrabold"
                    :class="[ toggleMenu ? 'opacity-0 hidden' : 'opacity-100' ]">Hi, Jamie Xie</strong>
                </article>
                    
                <section class="w-full flex flex-col mt-[20px] sm:my-[38px] text-l">
                    <article v-for="({ title, icon, isActive }, index) in menuList" :key="index"
                    class="w-full h-[90px] text-white relative after:content-[''] after:absolute after:w-[5px] after:h-[100%] after:rounded-r-full after:z-[2] after:-right-[5px] after:top-0 border-white flex justify-center items-center cursor-pointer hover:bg-secondary transition-all duration-300 after:transition-all after:duration-300"
                    :class="[
                        isActive ? 'bg-quaternary after:bg-quaternary  hover:after:bg-secondary' : '',
                        index === 0 ? 'border-y-[1px]' : 'border-b-[1px]'
                    ]"
                    @click="toggleSideBar(index)">
                        <font-awesome-icon class="text-xl" :icon="icon" />
                        <span class="mx-4 text-center text-lg font-bold  md:font-extrabold transition-all duration-300 leading-5"
                        :class="[ toggleMenu ? 'opacity-0 absolute' : 'opacity-100' ]" v-html="title">
                        </span>
                    </article>
                </section>
            </section>
            <client-only>
                <p class="text-xs font-semibold text-white text-center my-2"
                :class="[ toggleMenu ? 'opacity-0' : 'opacity-100' ]">Copyright © {{ dayjs().year() }} Financial Assistant.</p>
            </client-only>
            

        </nav>
        <main class="sm:h-[100vh] bg-white rounded-l-[10px] sm:rounded-l-[30px] lg:rounded-l-[50px] relative transition-all duration-300 flex flex-col py-[20px] md:py-[30px] w-full sm:w-[calc(100%-84px)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 scrollbar-rounded-lg"
            :class="[ toggleMenu ? 'sm:w-[calc(100%-84px)] px-[18px] lg:px-[3vw] xl:px-[4vw]' : 'sm:w-[85%] px-[3vw]' ]">
            <div class="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full bg-white fixed z-[8] top-[76px] flex justify-center items-center cursor-pointer group transition-all duration-75"
                :class="[ toggleMenu ? 'left-[35px] sm:left-[64px]' : 'left-[185px] md:left-[180px] xl:left-[240px]' ]"
                @click="toggleMenu = !toggleMenu">
                <figure class="w-[20px] h-[20px] md:w-[24px] md:h-[24px]">
                    <font-awesome-icon :class="[ toggleMenu ? 'rotate-180' : '' ]" class="w-full h-[100%] object-contain text-[18px] md:text-[24px] text-secondary group-hover:text-black  transition-all duration-300"
                        :icon="['fas', 'circle-arrow-left']" />
                </figure>
            </div>
            <component :is="{...childComponent}"></component>
            
            <button class="w-[45px] h-[45px] sm:w-[65px] sm:h-[65px] rounded-full drop-shadow-lg fixed right-[18px] bottom-[18px] z-[9] flex justify-center items-center transition-all duration-200 hover:scale-125"
                :class="[ modalShow ? 'border-2 border-black bg-white opacity-10' : 'border-3 border-transparent bg-black' ]" 
                @click="modalShow = !modalShow">
                <font-awesome-icon class="text-xl sm:text-3xl ml-2" :class="[ !modalShow ? 'text-white' : 'text-black' ]" :icon="['fas', 'file-pen']" />
            </button>

            <!-- 新增花費 -->
            <dialog class="fixed w-[calc(100%-20px)] sm:w-[90%] lg:w-[max(80%,800px)] xl:w-[960px] h-[96vh] sm:h-[80vh] top-[2vh] sm:top-[10vh] drop-shadow-lg rounded-[max(3vw,3vh)] z-10 bg-white flex flex-col md:flex-row p-0 transition-all duration-200" :class="[ modalShow ? '' : 'opacity-0 pointer-events-none' ]" @click="categoryDrop = false">
                <font-awesome-icon class="text-secondary absolute left-[25px] top-[20px] text-4xl cursor-pointer hover:scale-125 hover:text-black transition-all duration-200" :icon="['fas', 'xmark']" 
                    @click="modalShow = false"/>
                <img class="absolute w-[70px] md:w-[136px] left-[15%] -bottom-[10px] md:left-[calc(100%-110px)] md:bottom-[8%] z-[11]" :src="lifebuoy" alt="">
                <img class="absolute w-[30px] md:w-[60px] left-[5%] bottom-[calc(26%-60px)] md:left-[calc(60%-20px)] lg:left-[calc(50%-20px)] md:top-[22%] z-[11]" :src="beachball" alt="">
                <div class="w-full h-[100%] rounded-[max(3vw,3vh)] overflow-hidden flex flex-col md:flex-row">
                    <div class="w-full md:w-[60%] lg:w-[50%] h-[78%] md:h-[100%] flex items-center justify-center">
                        <div class="w-[90%]">
                            <h2 class="text-center font-extrabold text-xl md:text-2xl text-black pt-[14px]">Add a spending</h2>
                            <div class="w-[40%] mx-auto my-5 border-b-[1px] border-black"></div>
                            <form class="max-w-[500px] px-3 md:px-4 lg:px-6 mx-auto h-[100%] flex flex-wrap justify-center" @submit.prevent="">
                                <!-- 日期 -->
                                <label class="relative flex w-full items-center justify-end py-2" for="date">
                                    <div class="flex flex-shrink-0 justify-end text-right font-bold text-black" role="label"
                                        :class="mobileLabelWidth">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl" :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Date </span>
                                            <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">日期</span>
                                        </h3>
                                    </div>
                                    <input v-model="submitSpending.date" class="validInputplaceholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 font-bold sm:text-base md:text-lg focus:bg-primary"
                                    :class="mobileInputWidth" type="text" name="date"
                                    :placeholder="deviceWidth < mobileFormBreakpointSm ? '日期：' : 'YYYY/MM/DD'"
                                    @keyup="validInput('date')"/>
                                </label>
                                
                                <!-- 項目 -->
                                <label class="relative flex w-full items-center py-2" for="item">
                                    <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                        :class="mobileLabelWidth">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl" :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Item </span>
                                            <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">項目</span>
                                        </h3>
                                    </div>
                                    <input v-model="submitSpending.item" class="validInputplaceholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 font-bold sm:text-base md:text-lg"  :class="mobileInputWidth" :placeholder="deviceWidth < mobileFormBreakpointSm ? '項目：' : '輸入項目...'" type="text" name="item"
                                    @keyup="validInput('item')"/>
                                </label>
                                <!-- 類別 -->
                                <label class="relative flex w-full items-center justify-end py-2" for="category">
                                    <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                        :class="mobileLabelWidth">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl" :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Category </span>
                                            <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">類別</span>
                                        </h3>
                                    </div>
                                    <!-- 自訂類別 -->
                                    <input v-model="submitSpending.selfDefinedCategory"
                                        class="validInputplaceholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 font-bold sm:text-base md:text-lg disabled:placeholder:text-[#ccc] disabled:bg-white"
                                        :class="[
                                            (deviceWidth < mobileFormBreakpointSm) && categoryDisabled
                                                ? 'w-[55%]' : (deviceWidth > mobileFormBreakpointSm) && categoryDisabled
                                                ? 'w-[calc(75%-120px)]' : (!categoryDisabled) ? 'w-full' : ''
                                        ]"
                                        :placeholder="deviceWidth < mobileFormBreakpointSm ? '類別：' : '新增...'" type="text" name="category" :disabled="categoryDisabled"
                                        @blur="categoryDisabled = true"
                                        @click.stop="categoryDisabled = false"
                                        @keyup="validInput('category')"/>
                                        <font-awesome-icon class="absolute top-[calc(50%-10px)] z-[3] cursor-pointer text-xl hover:text-secondary hover:scale-125 transition-all duration-200"
                                        :class="[
                                            categoryDisabled ? 'rotate-45' : '',
                                            (deviceWidth < mobileFormBreakpointXs) && !(categoryDisabled)
                                                ? 'left-[calc(55%-30px)]' : deviceWidth < mobileFormBreakpointSm && !(categoryDisabled)
                                                ? 'left-[calc(35%+80px)]' : (categoryDisabled) ? 'right-[32%]' : 'right-[12px]',
                                        ]" :icon="[categoryDisabled ? 'fas' : 'far', 'circle-xmark']" @click="categoryDisabled = !categoryDisabled"/>
                                    <!-- 預設類別 -->
                                    <div class="relative ml-2"
                                        :class="[ 
                                            deviceWidth < mobileFormBreakpointSm ? 'w-[45%]' : 'w-[35%]',
                                            categoryDisabled ? '' : 'hidden'
                                        ]">
                                        
                                        <button class="w-full h-[40px] sm:h-[38px] bg-[#eee] rounded-full active:border-primary active:border-2 text-sm md:text-md pl-2 flex justify-start items-center border-2 border-transparent" @click.stop="categoryDrop = !categoryDrop">
                                            <span>{{ targetCategory.title ? targetCategory.title :'選擇' }}</span>
                                            <font-awesome-icon class="absolute right-[10px] top-[calc((38px/2)-8px)] transition-all duration-200" :class="[ categoryDrop ? 'rotate-180' : '' ]"
                                                :icon="['fas', 'caret-down']" />
                                        </button>
                                        <ul v-if="categoryDrop" class="absolute w-full top-[38px] left-0 bg-[#eee] rounded-[10px] z-[5] overflow-hidden text-sm md:text-lg border-2 border-[#ccc]" @click="categoryDrop = false">
                                            <li v-for="({title, value, icon}, index) in categoryDefaultList" :key="index"
                                                class="h-[38px] px-2 flex items-center justify-between hover:bg-quaternary hover:text-white text-sm"
                                                :class="[ value === targetCategory.value ? 'bg-primary' : '' ]"
                                                @click="changeCategory({
                                                    title, value
                                                })">
                                                
                                                {{ title }}
                                                <font-awesome-icon class="text-[#999]" :icon="icon"></font-awesome-icon>
                                            </li>
                                        </ul>
                                    </div>
                                </label>
                                <!-- 金額 -->
                                <label class="relative flex w-full items-center py-2" for="amount">
                                    <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                        :class="mobileLabelWidth">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl" :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Amount </span>
                                            <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">金額</span>
                                        </h3>
                                    </div>
                                    <span class="absolute left-[150px] text-black font-bold"
                                        :class="[
                                            deviceWidth < mobileFormBreakpointXs
                                                ? 'left-[15px]' : deviceWidth < mobileFormBreakpointSm
                                                ? 'left-[105px]' : 'left-[150px]'
                                        ]">$</span>
                                    <input v-model="submitSpending.amount" class="validInputplaceholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 font-bold sm:text-base md:text-lg text-right"  :class="mobileInputWidth" :placeholder="deviceWidth < mobileFormBreakpointSm ? '金額' : '輸入金額...'" type="text" name="amount"
                                    @keyup="validInput('amount')"/>
                                </label>
                                <!-- 備註 -->
                                <label class="relative flex w-full items-center justify-end py-2" for="memo">
                                    <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                        :class="mobileLabelWidth">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl" :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Memo </span>
                                            <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">備註</span>
                                        </h3>
                                    </div>
                                    <textarea v-model="submitSpending.memo" class="validInputplaceholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-semibold block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 font-bold sm:text-base md:text-lg"  :class="mobileInputWidth"  rows="5" placeholder="輸入備註..." type="text" name="memo"
                                    @keyup="validInput('memo')"/>
                                </label>
                                <p v-if="validInformation" class="w-full h-[20px] text-right font-bold text-secondary">
                                    <font-awesome-icon
                                        class="ml-2" :icon="['fas', 'triangle-exclamation']" />
                                    {{ validInformation }}
                                </p>
                                <button class="w-[150px] h-[50px] rounded-full text-xl md:text-2xl font-bold text-white bg-black mt-4 sm:mt-6 border-2 border-transparent hover:border-secondary hover:bg-white hover:text-secondary transition-all duration-200 z-10 disabled:bg-[#ddd] disabled:hover:border-transparent disabled:text-[#aaa]" :disabled="!validForm"
                                @click.prevent="submitSpendingAction ()">Done</button>
                            </form>
                        </div>
                    </div>
                    <div class="w-full md:w-[40%] lg:w-[50%] h-[22%] md:h-[100%] relative">
                        <span class="absolute hidden md:block md:text-2xl text-center font-extrabold text-white left-[18%] top-[calc(30%-80px)]">Every<br/>spending<br>is the<br/>footprint of <br/>living =)</span>
                        <img class="w-full h-[100%] object-cover hidden md:block" :src="popupBeach" alt="">
                        <img class="w-full h-[100%] object-cover md:hidden" :src="popupBeachM" alt="">
                    </div>
                </div>
                
            </dialog>
            <div class="fixed top-0 left-0 w-full h-[100vh] flex animate z-[100] pointer-events-none"
                :class="[ submitSpendingFinish ? ' money' : '' ]">
                <figure class="w-[50%] h-[100%]">
                    <img class="w-full h-[100%] object-contain object-left" :src="moneyBubbleL" alt="">
                </figure>
                <figure class="w-[50%] h-[100%]">
                    <img class="w-full h-[100%] object-contain object-right" :src="moneyBubbleR" alt="">
                </figure>
            </div>
            <div class="w-full h-[100vh] bg-[rgba(95,57,47,.6)] fixed sm:z-[9] top-0 left-0 transition-all duration-200"
                :class="[
                    modalShow || (!(toggleMenu) && deviceWidth <= 600) ? '' : 'opacity-0 pointer-events-none',
                    !(toggleMenu) && deviceWidth <= 600 ? 'z-[2]' : 'z-[9]',
                ]"
                @click="modalShow = false">
            </div>
            
        </main>
    </section>
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
    import dayjs from 'dayjs'
    import logoWhite from '~/assets/images/logo-w.svg';
    import avatar from '~/assets/images/avatar.jpeg';
    import popupBeach from '~/assets/images/popup.svg';
    import popupBeachM from '~/assets/images/popup-m.svg';
    import lifebuoy from '~/assets/images/lifebuoy.png';
    import beachball from '~/assets/images/beachball.png';
    import moneyBubbleL from '~/assets/images/money-bubbles-l.svg';
    import moneyBubbleR from '~/assets/images/money-bubbles-r.svg';

    import { userAuthStore } from '~/stores/userAuth.js';
    import { userCenterStore } from '~/stores/userCenter.js';
    import { storeToRefs } from 'pinia'
    import { categoryDefaultList, regexMap } from '~/globalDatas';
    import overview from '~/pages/userCenter/overview.vue';
    import spendingRecords from '~/pages/userCenter/spendingRecords.vue';


    const childComponent = ref(overview);

    const { setCurrentComponent } = userAuthStore();
    const { setToggleMenu } = userCenterStore();
    const { toggleMenu } = storeToRefs(userCenterStore());
    const { $db } = useNuxtApp();
    
    const mobileInputWidth = ref(null);
    const mobileLabelWidth = ref(null);
    const mobileFormBreakpointSm = ref(480);
    const mobileFormBreakpointXs = ref(360);

    const modalShow = ref(false);
    // const toggleMenu = ref(false);
    const categoryDrop = ref(false);
    const menuList = ref([
        { title: 'Overview', icon: ['fa-solid', 'fa-layer-group'], isActive: true, component: {...overview} },
        { title: 'Spending<br>Records', icon: ['fas', 'clipboard-list'], isActive: false, component: {...spendingRecords} },
        { title: 'Analytics<br>Charts', icon: ['fas', 'chart-pie'], isActive: false, component: {...overview} }
    ]);
    
    const deviceWidth = ref(0);
    const targetCategory = reactive({
        title: '', value: ''
    });
    const categoryDisabled = ref(true);
    const submitSpending = reactive({
        date: '',
        createdDate: '',
        item: '',
        category: '',
        selfDefinedCategory: '',
        amount: 0,
        memo: ''
    });
    const submitSpendingFinish = ref(false);
    const validInformation = ref('');
    const validForm = ref(true);
    
  

    // await console.log(
    //     'userSpendingRecords', await userSpendingRecords
    // )
     onMounted(async() => {
        const userSpendingRecords = await loadUserSpendingRecord($db, Cookies.get('userId'))
        deviceWidth.value = window.innerWidth;
        // chartsLineWidth.value = wrapperChartsLine.value.clientWidth;
        responsiveFormWidth ();

        window.addEventListener('resize', () => {
            deviceWidth.value = window.innerWidth;
            if (deviceWidth.value < 360) toggleMenu.value = true;
            responsiveFormWidth ();
            // resizeCharts ();
        })
    })

    function toComponent (componentName) {
        setCurrentComponent (componentName);
    }

    function changeCategory ({
        title, value
    }) {
        targetCategory.title = title;
        targetCategory.value = value;
        submitSpending.category = value;
    }
   
    function responsiveFormWidth () {
        mobileInputWidth.value = deviceWidth.value < mobileFormBreakpointXs.value
            ? 'w-full' : deviceWidth.value < mobileFormBreakpointSm.value
            ? 'w-[calc(100%-76px)]' : 'w-[calc(100%-120px)]';
        mobileLabelWidth.value = deviceWidth.value < mobileFormBreakpointXs.value
            ? 'w-0' : deviceWidth.value < mobileFormBreakpointSm.value
            ? 'w-[77px] mr-4' : 'w-[120px] mr-4';
    }

    const regexTester = (regex, value) => regex.test(value);

    async function submitSpendingAction () {
        submitSpendingFinish.value = true;
        // Object.keys(submitSpending).forEach((value) => console.log(value))
        submitSpending.createdDate = dayjs().format('YYYY/MM/DD HH:mm:ss')
        await createUserSpendingRecord($db, Cookies.get('userId'), submitSpending)
        // setTimeout(() => submitSpendingFinish.value = false, 3000)
    }
    
    function validInput (type) { 
        const { regex } = regexMap[type];
        if(!regexTester(regex, submitSpending[type])) validInformation.value = `${regexMap[type].name}格式有誤，或字數太少`;
        if(regexTester(regex, submitSpending[type])) validInformation.value = ``;
    }
    
    function toggleSideBar (activeIndex) {
        menuList.value.forEach((item, index) => {
            item.isActive = index === activeIndex;
            if (index === activeIndex) childComponent.value = {...item.component};
        })

        
    }
</script>