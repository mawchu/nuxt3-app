<template>
    <section class="w-full max-h-fullvh bg-primary flex">
        <nav class="max-h-fullvh flex flex-col justify-between items-center transition-all duration-300 w-[50px] sm:w-[84px]"
            :class="[ toggleMenu ? '' : 'sm:w-[15%] min-w-[200px] xl:min-w-[260px] fixed top-0 left-0 z-[7] sm:relative  bg-primary min-h-fullvh' ]">
         
            <figure class="w-full cursor-pointer" @click="toComponent('home')">
                <img class="m-[8px] sm:m-[20px] transition-all duration-300"
                    :class="[ toggleMenu ? 'w-[36px] sm:w-[46px]' : 'w-[64px]' ]" :src="logoWhite" alt="">
            </figure>
            <section class="w-full pb-10">
                <article class="w-full flex flex-col justify-center items-center">
                    <figure class="rounded-full bg-white overflow-hidden transition-all duration-300 flex justify-center items-center"
                    :class="[ toggleMenu ? 'w-[34px] h-[34px] sm:w-[48px] sm:h-[48px]' : 'w-[82px] h-[82px]' ]">
                        <!-- <img class="w-full h-[100%] object-cover" :src="avatar" alt=""> -->
                        <font-awesome-icon class=" text-[#a3887e]"
                            :icon="['fas', 'circle-user']"
                            :class="[ toggleMenu ? 'text-4xl sm:text-5xl' : 'text-8xl' ]" />
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
            
            <div class="fixed right-[10px] bottom-[10px] z-[10]">
                <button v-for="({ type, icon, sort }, index) in dialogButtons" :key="index"
                    :class="[
                        type === currentDialogName
                            ? 'relative bg-black w-[45px] h-[45px] sm:w-[65px] sm:h-[65px] z-[5]' : 'absolute w-[34px] h-[34px] sm:w-[52px] sm:h-[52px] right-[5px] bg-white border-[1px] border-black sm:border-transparent md:bg-[#FCFADB] scale-1 z-0', 
                    ]" :style="`${(type === currentDialogName || !modalShow) ? 'top: 0' : 'top: -' + sort * ( deviceWidth > 600 ? 60 : 42)}px`"
                    class="rounded-full drop-shadow-lg flex justify-center items-center transition-all duration-200 hover:scale-[1.1] "
                @click="setCurrentDialog(type)">
                    <font-awesome-icon
                        :class="[
                            type === currentDialogName ? 'text-white text-xl sm:text-3xl ' : 'text-black md:text-secondary text-sm sm:text-2xl',
                            type === 'spendingItem' ? 'ml-1 sm:ml-2' : ''
                        ]" :icon="icon" />
                </button>
                
            </div>
            

            <!-- overlay -->
            <div class="w-full h-[100vh] bg-[rgba(95,57,47,.6)] fixed top-0 left-0 transition-all duration-200"
                :class="[
                    modalShow || (!(toggleMenu) && deviceWidth <= 600) ? '' : 'opacity-0 pointer-events-none',
                    !(toggleMenu) && deviceWidth <= 600 ? 'z-[2]' : 'z-[9]',
                ]"
                @click="modalShow = false">
            </div>
            <component :is="currentDialog"
                :modalShow="modalShow" :deviceWidth="deviceWidth" :deviceHeight="deviceHeight"
                @modalShowEmit="modalShowEmit"></component>
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
    import dayjs from 'dayjs';
    import logoWhite from '~/assets/images/logo-w.svg';
    import avatar from '~/assets/images/avatar.jpeg';
    
    // import moneyBubbleR from '~/assets/images/money-bubbles-r.svg';

    import { userAuthStore } from '~/stores/userAuth.js';
    import { userCenterStore } from '~/stores/userCenter.js';
    import { storeToRefs } from 'pinia'
    // import { categoryDefaultList, selfDefinedCategory, regexMap, regexTester, validInput } from '~/globalDatas';
    import overview from '~/pages/userCenter/overview.vue';
    import spendingRecords from '~/pages/userCenter/spendingRecords.vue';

    import spendingItem from './dialog/spendingItem.vue';
    import bankingList from './dialog/bankingList.vue';
    const childComponent = ref(overview);

    const { setCurrentComponent } = userAuthStore();
    // const { setToggleMenu } = userCenterStore();
    const { toggleMenu } = storeToRefs(userCenterStore());
    const { $db } = useNuxtApp();
    
    // const mobileInputWidth = ref(null);
    // const mobileLabelWidth = ref(null);
    // const mobileFormBreakpointSm = ref(480);
    // const mobileFormBreakpointXs = ref(360);

    const modalShow = ref(false);
    const currentDialog = shallowRef({...spendingItem});
    const currentDialogName = ref('spendingItem');
    // const toggleMenu = ref(false);
    // const categoryDrop = ref(false);
    // let categoryType = ref('default');
    const menuList = ref([
        { title: 'Overview', icon: ['fa-solid', 'fa-layer-group'], isActive: true, component: {...overview} },
        { title: 'Spending<br>Records', icon: ['fas', 'clipboard-list'], isActive: false, component: {...spendingRecords} },
        { title: 'Analytics<br>Charts', icon: ['fas', 'chart-pie'], isActive: false, component: {...overview} }
    ]);
    
    const deviceWidth = ref(0);
    const deviceHeight = ref(0);
    const dialogButtons = ref([
        { type: 'spendingItem', icon: ['fas', 'file-pen'], sort: 0 },
        { type: 'bankingList', icon: ['fas', 'building-columns'], sort: 1 },
        { type: 'budgetIem', icon: ['fas', 'sack-dollar'], sort: 2 },
    ])

    function setCurrentDialog (dialogType) {
        
        if (dialogType !== currentDialogName.value) {
            modalShow.value = true;
        }
        if (dialogType === currentDialogName.value) {
            modalShow.value = !modalShow.value;
        }

        if (dialogType === 'bankingList') currentDialog.value = {...bankingList};
        if (dialogType === 'spendingItem') currentDialog.value = {...spendingItem};

        currentDialogName.value = dialogType;
    }
  
     onMounted(async() => {
        await loadUserSpendingRecord($db, Cookies.get('userId'))
        deviceWidth.value = window.innerWidth;
        deviceHeight.value = window.innerHeight;
        // responsiveFormWidth ();

        window.addEventListener('resize', () => {
            deviceWidth.value = window.innerWidth;
            deviceHeight.value = window.innerHeight;
            if (deviceWidth.value < 360) toggleMenu.value = true;
            // responsiveFormWidth ();
        })
    })

    function toComponent (componentName) {
        setCurrentComponent (componentName);
    }

    function modalShowEmit () {
        modalShow.value = false;
    }

   
    function toggleSideBar (activeIndex) {
        menuList.value.forEach((item, index) => {
            item.isActive = index === activeIndex;
            if (index === activeIndex) childComponent.value = {...item.component};
        })
    }

    watch(currentDialogName, (val,oldVal)=>{
        const activeIndex = dialogButtons.value.findIndex(({ type }) => type === currentDialogName.value);
        dialogButtons.value.forEach((button, index) => {
            if (index === activeIndex) button.sort = 0;
            if (index < activeIndex) button.sort = index + 1;
            if (index > activeIndex) button.sort = index;
            
        })
    })

    // watch(submitSpending, (val,oldVal)=>{
    //     // console.log(Object.keys(submitSpending))
    //     const valid = Object.keys(regexMap)
    //         .every((key) => {
    //             const regex = regexMap[key].regex;
    //             return regexTester(regex, submitSpending[key]) === true;
    //         })

    //     validForm.value = valid;
    // })

    // watch(categoryDisabled, (val,oldVal) => {
    //     if (categoryDisabled.value) categoryType.value = 'default';
    //     if (!categoryDisabled.value) categoryType.value = 'selfDefined';
    // })
</script>