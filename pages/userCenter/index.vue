<template>
    <section class="w-[100%] h-[100vh] bg-primary flex">
        <nav class="sm:h-[100vh] flex flex-col justify-between items-center transition-all duration-300 w-[50px] sm:w-[84px]"
            :class="[ toggleMenu ? '' : 'sm:w-[15%] min-w-[200px] fixed top-0 left-0 z-[7] sm:relative h-[100vh] bg-primary' ]">
         
            <figure class="w-[100%] cursor-pointer" @click="toHome">
                <img class="m-[8px] sm:m-[20px] transition-all duration-300"
                    :class="[ toggleMenu ? 'w-[36px] sm:w-[46px]' : 'w-[64px]' ]" :src="logoWhite" alt="">
            </figure>
            <section class="w-[100%] pb-10">
                <article class="w-[100%] flex flex-col justify-center items-center">
                    <figure class="rounded-full bg-white overflow-hidden transition-all duration-300"
                    :class="[ toggleMenu ? 'w-[34px] h-[34px] sm:w-[50px] sm:h-[50px]' : 'w-[82px] h-[82px]' ]">
                        <img class="w-[100%] h-[100%] object-cover" :src="avatar" alt="">
                    </figure>
                    <strong class="text-black mt-3"
                    :class="[ toggleMenu ? 'opacity-0 hidden' : 'opacity-100' ]">Hi, Jamie Xie</strong>
                </article>
                    
                <section class="w-[100%] flex flex-col mt-[20px] sm:my-[38px] text-l">
                    <article v-for="({ title, icon, isActive }, index) in menuList" :key="index"
                    class="w-[100%] h-[90px] text-white relative after:content-[''] after:absolute after:w-[5px] after:h-[100%] after:rounded-r-full after:z-[2] after:-right-[5px] after:top-0  border-b-[1px] border-white flex justify-center items-center cursor-pointer hover:bg-secondary transition-all duration-300 after:transition-all after:duration-300"
                    :class="[
                        isActive ? 'bg-quaternary after:bg-quaternary  hover:after:bg-secondary' : ''
                    ]">
                        <font-awesome-icon class="text-xl" :icon="icon" />
                        <span class="mx-4 text-center text-lg font-bold transition-all duration-300 leading-5"
                        :class="[ toggleMenu ? 'opacity-0 absolute' : 'opacity-100' ]" v-html="title">
                        </span>
                    </article>
                </section>
            </section>
            
            <p class="text-xs font-semibold text-white text-center my-2"
            :class="[ toggleMenu ? 'opacity-0' : 'opacity-100' ]">2023 @ Financial Assistant copyrights.</p>

        </nav>
        <main class="sm:h-[100vh] bg-white rounded-l-[10px] sm:rounded-l-[30px] lg:rounded-l-[50px] relative transition-all duration-300 flex flex-col py-[20px] md:py-[30px] w-[100%] sm:w-[calc(100%-84px)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 scrollbar-rounded-lg"
            :class="[ toggleMenu ? 'sm:w-[calc(100%-84px)] px-[18px] lg:px-[6vw]' : 'sm:w-[85%] px-[3vw]' ]">
            <div class="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full bg-white fixed z-[8] top-[76px] flex justify-center items-center cursor-pointer group transition-all duration-75"
                :class="[ toggleMenu ? 'left-[35px] sm:left-[64px]' : 'left-[185px] md:left-[180px]' ]"
                @click="toggleMenu = !toggleMenu">
                <figure class="w-[20px] h-[20px] md:w-[24px] md:h-[24px]">
                    <font-awesome-icon :class="[ toggleMenu ? 'rotate-180' : '' ]" class="w-[100%] h-[100%] object-contain text-[18px] md:text-[24px] text-secondary group-hover:text-black  transition-all duration-300"
                        :icon="['fas', 'circle-arrow-left']" />
                </figure>
            </div>
            <section class="w-[100%]  rounded-[12px] md:rounded-[20px] lg:rounded-[50px]  bg-linear flex flex-wrap xl:flex-nowrap">
                <div class="w-[100%] lg:w-[48%] lg:h-[100%] p-[16px] md:p-[24px] xl:pt-[33px] xl:py-[33px] xl:pl-[50px]">
                    <article class="text-xl md:text-2xl lg:h-[100%] flex flex-col">
                        <div class="mb-4 md:mb-2 xl:mb-4">
                            <font-awesome-icon class="text-2xl md:text-3xl" :icon="['fa-regular', 'fa-calendar-days']" />
                            <span class="mx-2 md:mx-4 text-center font-extrabold transition-all duration-300">
                                Monthly Spending
                            </span>
                        </div>
                        <div class="flex flex-wrap items-stretch lg:flex-nowrap flex-1">
                            <div class="w-[100%] md:w-[calc(50%-10px)] mb-[20px] md:mb-0 md:mr-[10px] h-[100%] flex flex-col justify-between rounded-[30px] border-[3px] border-secondary p-[20px]">
                                <div class="w-[100%] flex justify-between">
                                    <p class="text-sm sm:text-base font-semibold text-[#9a9a9a] leading-[16px] sm:leading-[16px]">July 2023<br>Total Amount</p>
                                    <font-awesome-icon class="text-secondary text-3xl" :icon="['fa-solid', 'fa-ellipsis']" />
                                </div>
                                <div class="font-extrabold text-secondary mt-[10px] md:mt-[20px]">
                                    <span class="border-b-4 border-secondary">NTD</span>
                                    <div class="mt-4 w-[100%] flex justify-between">
                                        <span>$</span>
                                        <span class="text-3xl">12,345</span>
                                    </div>
                                </div>
                            </div>
                            <div class="w-[100%] md:w-[calc(50%-10px)] md:ml-[10px] flex flex-col justify-between rounded-[30px] border-[3px] border-secondary p-[20px]">
                                <div class="w-[100%] flex justify-between">
                                    <p class="text-sm sm:text-base font-semibold text-[#9a9a9a] leading-[16px] sm:leading-[16px]">Numbers of<br>Spending<br>Records</p>
                                    <font-awesome-icon class="text-secondary text-3xl" :icon="['fa-solid', 'fa-ellipsis']" />
                                </div>
                                <div class="font-extrabold text-secondary text-right">
                                    <span class="text-5xl">54</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="w-[100%] lg:w-[52%] lg:h-[100%] p-[16px] pr-0 pb-0 md:p-x[24px] md:pr-0 xl:pt-[33px] xl:pl-[25px]">
                    <article class="text-xl md:text-2xl w-[100%] h-[100%] flex flex-col rounded-br-[50px]">
                        <div class="mb-4 md:mb-2 xl:mb-4">
                            <font-awesome-icon class="text-2xl md:text-3xl" icon="fa-solid fa-clock" />
                            <span class="mx-2 md:mx-4 text-center font-extrabold transition-all duration-300">
                                Recently Spending
                            </span>
                        </div>
                        <div class="w-[100%] lg:w-[100%] lg:pr-6 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 scrollbar-rounded-lg">
                            <div class="w-[100%] lg:w-[100%] max-h-[600px] sm:h-[220px] pr-4 lg:pr-0">
                                <div v-for="(item, index) in 10" :key="index" class="rounded-[30px] bg-white w-[100%] md:h-[70px] flex flex-wrap md:flex-nowrap mb-[10px]">
                                    <div class="text-xs sm:text-base text-[#9a9a9a] font-semibold flex items-center h-[calc(100%-30px)] justify-between w-[100%] md:w-[55%] m-[15px] mr-0 mb-0 md:mb-[15px] md:border-r-[1px] border-secondary">
                                        <p>
                                            2023.07.21<br>
                                            泰舍晚餐
                                        </p>
                                        <font-awesome-icon
                                            class="text-xl md:text-3xl text-secondary mr-[15px] border-b-[1px] md:border-b-0 border-secondary pb-[8px] sm:pb-[15px] md:pb-0 md:mb-0"
                                            :icon="['fa-solid', 'fa-burger']" />
                                    </div>
                                    <div class="text-2xl sm:text-3xl text-secondary font-black flex items-center h-[100%] justify-between w-[100%] md:w-[45%] p-[15px]">
                                        <p>$</p>
                                        <span>1,234</span>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </article>
                </div>
                
            </section>
            <section class="w-[100%] h-[54%] flex flex-wrap mt-[8px] md:mt-[30px]">
                <div class="w-[100%] lg:w-[calc(38%-0.75rem)] rounded-[12px] md:rounded-[20px] lg:rounded-[50px] bg-linear lg:mr-3 mt-4 md:mt-0">
                    <article class="text-xl md:text-2xl p-[16px]  md:p-[24px] xl:py-[33px] xl:px-[50px]">
                        <div class="mb-4 md:mb-2 xl:mb-4">
                            <font-awesome-icon class="text-2xl md:text-3xl" :icon="['fas', 'ranking-star']" />
                            <span class="mx-2 md:mx-4 text-center font-extrabold transition-all duration-300">
                                Category Rating
                            </span>
                        </div>
                    </article>
                </div>
                <div class="w-[100%] lg:w-[calc(62%-0.75rem)] rounded-[12px] md:rounded-[20px] lg:rounded-[50px]  bg-linear lg:ml-3 mt-[24px] lg:mt-0">
                    <article class="text-xl md:text-2xl p-[16px] md:p-[24px] xl:py-[33px] xl:px-[50px]">
                        <div class="mb-4 md:mb-2 xl:mb-4">
                            <font-awesome-icon class="text-2xl md:text-3xl" :icon="['fas', 'chart-area']" />
                            <span class="mx-2 md:mx-4 text-center font-extrabold transition-all duration-300">
                                Daily Spending Amount
                            </span>
                        </div>
                    </article>
                </div>
            </section>
            <button class="w-[45px] h-[45px] sm:w-[65px] sm:h-[65px] rounded-full drop-shadow-lg fixed right-[15px] bottom-[15px] z-[9] flex justify-center items-center transition-all duration-200"
                :class="[ modalShow ? 'border-2 border-black bg-white opacity-10' : 'border-3 border-transparent bg-black' ]" 
                @click="modalShow = !modalShow">
                <font-awesome-icon class="text-xl sm:text-3xl ml-2" :class="[ !modalShow ? 'text-white' : 'text-black' ]" :icon="['fas', 'file-pen']" />
            </button>
            <dialog class="fixed w-[calc(100%-20px)] sm:w-[calc(100%-40px)] lg:w-[min(75%,960px)] h-[80vh] top-[10vh] drop-shadow-lg rounded-[max(3vw,3vh)] z-10 bg-white flex flex-col md:flex-row p-0 transition-all duration-200" :class="[ modalShow ? '' : 'opacity-0 pointer-events-none' ]" @click.capture="categoryDrop = false">
                <font-awesome-icon class="text-secondary absolute left-[25px] top-[20px] text-4xl cursor-pointer hover:scale-125 hover:text-black transition-all duration-200" :icon="['fas', 'xmark']" 
                    @click="modalShow = false"/>
                <img class="absolute w-[70px] md:w-[110px] left-[15%] -bottom-[10px] md:left-[calc(100%-90px)] md:bottom-[8%] z-[11]" :src="lifebuoy" alt="">
                <img class="absolute w-[30px] md:w-[60px] left-[5%] bottom-[calc(32%-60px)] md:left-[calc(50%-20px)] md:top-[26%] z-[11]" :src="beachball" alt="">
                <div class="w-[100%] h-[100%] rounded-[max(3vw,3vh)] overflow-hidden flex flex-col md:flex-row">
                    <div class="w-[100%] md:w-[50%] h-[70%] md:h-[100%] flex items-center justify-center">
                        <div class="w-[90%]">
                            <h2 class="text-center font-extrabold text-2xl text-black pt-[14px]">Add a spending</h2>
                            <div class="w-[40%] mx-auto my-5 border-b-[1px] border-black"></div>
                            <form class="w-[100%] h-[100%]" action="" @click.prevent>
                                <label class="relative flex w-[100%] items-center justify-end py-2">
                                    <div class="w-[120px] flex flex-shrink-0 justify-end text-right font-bold text-black mr-4">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl">Date </span>
                                            <span class="text-sm">日期</span>
                                        </h3>
                                    </div>
                                    <input class="placeholder:text-black block bg-[#eee] w-[calc(100%-120px)] border rounded-full py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm" type="text" name="date"/>
                                </label>
                                <label class="relative flex w-[100%] items-center justify-end  py-2">
                                    <div class="w-[120px] flex flex-shrink-0 justify-end text-right font-bold text-black mr-4">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl">Item </span>
                                            <span class="text-sm">項目</span>
                                        </h3>
                                    </div>
                                    <input class="placeholder:text-black block bg-[#eee] w-[calc(67%-120px)] border rounded-full py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm" placeholder="輸入項目..." type="text" name="date"/>
                                    <div class="relative w-[28%] ml-2">
                                        <button class="w-[100%] h-[38px] bg-[#eee] rounded-full active:border-primary active:border-2 text-sm pl-2 flex justify-start items-center border-2 border-transparent" @click="categoryDrop = true">
                                            <span>{{ targetCategory.title ? targetCategory.title :'選擇' }}</span>
                                            <font-awesome-icon class="absolute right-[10px] top-[calc((38px/2)-8px)]" :icon="['fas', 'caret-down']" />
                                        </button>
                                        <ul v-if="categoryDrop" class="absolute w-[100%] -top-[2px] left-0 bg-[#eee] rounded-[10px] z-[5] overflow-hidden text-sm border-2 border-[#ccc]" @click="categoryDrop = false">
                                            <li v-for="({title, value}, index) in categoryDefaultList" :key="index"
                                                class="h-[38px] pl-2 flex items-center hover:bg-quaternary"
                                                :class="[ value === targetCategory.value ? 'bg-primary' : '' ]"
                                                @click="changeCategory({
                                                    title, value
                                                })">{{ title }}</li>
                                        </ul>
                                    </div>
                                    
                                </label>
                                <label class="relative flex w-[100%] items-center py-2">
                                    <div class="w-[120px] flex flex-shrink-0 justify-end text-right font-bold text-black mr-4">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl">Category </span>
                                            <span class="text-sm">類別</span>
                                        </h3>
                                    </div>
                                    <input class="placeholder:text-black block bg-[#eee] w-[calc(100%-120px)] border rounded-full py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm" placeholder="輸入類別..." type="text" name="date"/>
                                </label>
                                <label class="relative flex w-[100%] items-center justify-end  py-2">
                                    <div class="w-[120px] flex flex-shrink-0 justify-end text-right font-bold text-black mr-4">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl">Memo </span>
                                            <span class="text-sm">備註</span>
                                        </h3>
                                    </div>
                                    <textarea class="placeholder:text-black block bg-[#eee] w-[calc(100%-120px)] border rounded-[20px] py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm" rows="5" placeholder="輸入備註..." type="text" name="date" />
                                </label>
                            </form>
                        </div>
                    </div>
                    <div class="w-[100%] md:w-[50%] h-[30%] md:h-[100%] relative">
                        <span class="absolute hidden md:block md:text-2xl text-center font-extrabold text-white left-[18%] top-[calc(30%-80px)]">Every<br/>spending<br>is the<br/>footprint of <br/>living =)</span>
                        <img class="w-[100%] h-[100%] object-cover hidden md:block" :src="popupBeach" alt="">
                        <img class="w-[100%] h-[100%] object-cover md:hidden" :src="popupBeachM" alt="">
                    </div>
                </div>
                
            </dialog>
            <div class="w-[100%] h-[100vh] bg-[#5F392F] fixed sm:z-[9] top-0 left-0 transition-all duration-200"
                :class="[
                    modalShow || (!(toggleMenu) && deviceWidth <= 600) ? 'opacity-60' : 'opacity-0 pointer-events-none',
                    !(toggleMenu) && deviceWidth <= 600 ? 'z-[2]' : 'z-[9]',
                ]"
                @click="toggleMenu = true"></div>
        </main>
    </section>
</template>
<style lang="scss" scoped>
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
</style>
<script setup>
    import logoWhite from '~/assets/images/logo-w.svg';
    import avatar from '~/assets/images/avatar.jpeg';
    import popupBeach from '~/assets/images/popup.svg';
    import popupBeachM from '~/assets/images/popup-m.svg';
    import lifebuoy from '~/assets/images/lifebuoy.png';
    import beachball from '~/assets/images/beachball.png';
    import { userAuthStore } from '~/stores/userAuth.js';
    import { storeToRefs } from 'pinia'
    import componentHome from '@/pages/home/index.vue'
    import componentUserCenter from '@/pages/userCenter/index.vue'

    const authStore = userAuthStore ();
    const { isLoggedIn, currentComponent} = storeToRefs(authStore);
    const { setCurrentComponent } = userAuthStore();

    let component = ref(componentHome);
    console.log('currentComponent', currentComponent)
    const modalShow = ref(false);
    const toggleMenu = ref(false);
    const categoryDrop = ref(false);
    const menuList = ref([
        { title: 'Overview', icon: ['fa-solid', 'fa-layer-group'], isActive: true },
        { title: 'Spending<br>Records', icon: ['fas', 'clipboard-list'], isActive: false },
        { title: 'Analytics<br>Charts', icon: ['fas', 'chart-pie'], isActive: false }
    ]);
    const categoryDefaultList = reactive([
        { title: '食物', value: 'food' },
        { title: '飲料', value: 'beverage' },
        { title: '日用品', value: 'neccessary' },
    ])
    const deviceWidth = ref(0);
    const targetCategory = reactive({
        title: '', value: ''
    });
    onMounted(() => {
        deviceWidth.value = window.innerWidth;
        window.addEventListener('resize', () => {
            deviceWidth.value = window.innerWidth;
            if (deviceWidth.value < 360) toggleMenu.value = true;
        })
        
    })

    function toHome () {
        setCurrentComponent ('home');
    }

    function changeCategory ({
        title, value
    }) {
        targetCategory.title = title;
        targetCategory.value = value;
    }

</script>