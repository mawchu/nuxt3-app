<template>
    <section class="w-[100%] h-[100vh] bg-primary flex">
        <nav class="sm:h-[100vh] flex flex-col justify-between items-center transition-all duration-300 w-[84px]"
            :class="[ toggleMenu ? '' : 'sm:w-[15%] min-w-[200px]' ]">
            <figure class="w-[100%]">
                <img class="m-[25px] transition-all duration-300"
                    :class="[ toggleMenu ? 'w-[40px]' : 'w-[64px]' ]" :src="logoWhite" alt="">
            </figure>
            <section class="w-[100%] pb-10">
                <article class="w-[100%] flex flex-col justify-center items-center">
                    <figure class="rounded-full bg-white overflow-hidden transition-all duration-300"
                    :class="[ toggleMenu ? 'w-[50px] h-[50px]' : 'w-[82px] h-[82px]' ]">
                        <img class="w-[100%] h-[100%] object-cover" :src="avatar" alt="">
                    </figure>
                    <strong class="text-black mt-3"
                    :class="[ toggleMenu ? 'opacity-0 hidden' : 'opacity-100' ]">Hi, Jamie Xie</strong>
                </article>
                    
                <section class="w-[100%] flex flex-col my-[38px] text-l">
                    <article v-for="({ title, icon, isActive }, index) in menuList" :key="index"
                    class="w-[100%] h-[90px] text-white relative after:content-[''] after:absolute after:w-[5px] after:h-[100%] after:rounded-r-full after:z-10 after:-right-[5px] after:top-0  border-b-[1px] border-white flex justify-center items-center cursor-pointer hover:bg-secondary transition-all duration-300 after:transition-all after:duration-300"
                    :class="[
                        isActive ? 'bg-quaternary after:bg-quaternary  hover:after:bg-secondary' : ''
                    ]">
                        <font-awesome-icon class="text-xl" :icon="icon" />
                        <span class="mx-4 text-center text-lg font-bold transition-all duration-300"
                        :class="[ toggleMenu ? 'opacity-0 absolute' : 'opacity-100' ]" v-html="title">
                        </span>
                    </article>
                </section>
            </section>
            
            <p class="text-xs font-semibold text-white text-center my-2"
            :class="[ toggleMenu ? 'opacity-0' : 'opacity-100' ]">2023 @ Financial Assistant copyrights.</p>

        </nav>
        <main
            class="sm:h-[100vh] bg-white rounded-l-[50px] relative transition-all duration-300 flex flex-col py-[4vw] w-[calc(100%-84px)]"
            :class="[ toggleMenu ? 'sm:w-[calc(100%-84px)] px-[6vw]' : 'sm:w-[85%] px-[3vw]' ]">
            <div class="w-[40px] h-[40px] rounded-full bg-white absolute -left-[20px] top-[76px] flex justify-center items-center cursor-pointer group">
                <figure class="w-[24px] h-[24px]" @click="toggleMenu = !toggleMenu">
                    <font-awesome-icon :class="[ toggleMenu ? 'rotate-180' : '' ]" class="w-[100%] h-[100%] object-contain text-[24px] text-secondary group-hover:text-black  transition-all duration-300"
                        :icon="['fas', 'circle-arrow-left']" />
                </figure>
            </div>
            <section class="w-[100%] h-[42%] rounded-[50px] bg-linear flex mb-[2%]">
                <div class="w-[48%] h-[100%] py-[33px] px-[50px]">
                    <article class="text-2xl h-[100%] flex flex-col">
                        <div class="mb-6">
                            <font-awesome-icon class="text-3xl" :icon="['fa-regular', 'fa-calendar-days']" />
                            <span class="mx-4 text-center font-extrabold transition-all duration-300">
                                Monthly Spending
                            </span>
                        </div>
                        <div class="flex flex-1">
                            <div class="w-[calc(50%-10px)] mr-[10px] h-[100%] flex flex-col justify-between rounded-[30px] border-[3px] border-secondary p-[20px]">
                                <div class="w-[100%] flex justify-between">
                                    <p class="text-base font-semibold text-gray-500">July 2023<br>Total Amount</p>
                                    <font-awesome-icon class="text-secondary text-3xl" :icon="['fa-solid', 'fa-ellipsis']" />
                                </div>
                                <div class="font-extrabold text-secondary">
                                    <span class="border-b-4 border-secondary">NTD</span>
                                    <div class="mt-4 w-[100%] flex justify-between">
                                        <span>$</span>
                                        <span class="text-3xl">12,345</span>
                                    </div>
                                </div>
                            </div>
                            <div class="w-[calc(50%-10px)] ml-[10px] h-[100%] flex flex-col justify-between rounded-[30px] border-[3px] border-secondary p-[20px]">
                                <div class="w-[100%] flex justify-between">
                                    <p class="text-base font-semibold text-gray-500">Numbers of<br>Spending<br>Records</p>
                                    <font-awesome-icon class="text-secondary text-3xl" :icon="['fa-solid', 'fa-ellipsis']" />
                                </div>
                                <div class="font-extrabold text-secondary text-right">
                                    <span class="text-5xl">54</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="w-[52%] h-[100%]">
                    <article class="text-2xl h-[100%] flex flex-col rounded-br-[50px] overflow-hidden pt-[33px]">
                        <div class="mb-6">
                            <font-awesome-icon class="text-3xl" icon="fa-solid fa-clock" />
                            <span class="mx-4 text-center font-extrabold transition-all duration-300">
                                Recently Spending
                            </span>
                        </div>
                        <div class="w-[100%] overflow-y-auto pr-6">
                            <div v-for="(item, index) in 10" :key="index" class="rounded-[30px] bg-white w-[100%] h-[70px] flex mb-[10px]">
                                <div class="text-base text-gray-500 font-semibold flex items-center h-[calc(100%-30px)] justify-between w-[50%] m-[15px] mr-0 border-r-[1px] border-secondary">
                                    <p>
                                        2023.07.21<br>
                                        泰舍晚餐
                                    </p>
                                    <font-awesome-icon class="text-3xl text-secondary mr-[15px]" :icon="['fa-solid', 'fa-utensils']" />
                                </div>
                                <div class="text-3xl text-secondary font-black flex items-center h-[100%] justify-between w-[50%] p-[15px]">
                                    <p>$</p>
                                    <span>1,234</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                
            </section>
            <section class="w-[100%] h-[54%] flex flex-wrap mt-[2%]">
                <div class="w-[100%] lg:w-[calc(38%-0.75rem)] rounded-[50px] bg-linear lg:mr-3">
                    <article class="text-2xl py-[33px] px-[50px]">
                        <div class="mb-6">
                            <font-awesome-icon class="text-3xl" :icon="['fas', 'ranking-star']" />
                            <span class="mx-4 text-center font-extrabold transition-all duration-300">
                                Category Rating
                            </span>
                        </div>
                    </article>
                </div>
                <div class="w-[100%] lg:w-[calc(62%-0.75rem)] rounded-[50px] bg-linear lg:ml-3">
                    <article class="text-2xl py-[33px] px-[50px]">
                        <div class="mb-6">
                            <font-awesome-icon class="text-3xl" :icon="['fas', 'chart-area']" />
                            <span class="mx-4 text-center font-extrabold transition-all duration-300">
                                Daily Spending Amount
                            </span>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    </section>
</template>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@100;200;300;400;500;600;700;800&display=swap');
  :root {
    --header-height: 70px;
  }
  * {
    font-family: 'Karla', sans-serif;
  }
  @font-face {
    font-family: 'Karla';
    font-display: swap;
    src: url('/Karla.woff2') format('woff2');
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
    const toggleMenu = ref(false);
    const menuList = ref([
        { title: 'Overview', icon: ['fa-solid', 'fa-layer-group'], isActive: true },
        { title: 'Spending<br>Records', icon: ['fas', 'clipboard-list'], isActive: false },
        { title: 'Analytics<br>Charts', icon: ['fas', 'chart-pie'], isActive: false }
    ]);
    const deviceWidth = ref(0);
    onMounted(() => {
        deviceWidth.value = window.innerWidth;
        window.addEventListener('resize', () => {
            deviceWidth.value = window.innerWidth;
        })
    
    })
</script>