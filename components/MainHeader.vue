<template>
    <nav class="header-fix ease-in-out duration-300"
        :class="[ scrollDistance > 0 && scrollType === 'down' ? 'bg-primary' : 'bg-white/50' ]">
        <div class="w-5/6">
            <ol class="flex lg:justify-around w-[calc(100%-60px)] text-lg font-semibold"
            :class="[ scrollDistance > 0 && scrollType === 'down' ? 'text-white' : 'text-secondary' ]">
                <li class="ml-8 lg:ml-0">
                    <figure v-if="scrollDistance > 0 && scrollType === 'down'" class="menu-icon">
                        <img class="w-[100%] h-[100%] object-contain" :src="logoWhite" alt="">
                    </figure>
                    <figure v-else class="menu-icon">
                        <img class="w-[100%] h-[100%] object-contain" :src="logo" alt="">
                    </figure>
                </li>
                <li v-for="({ title, icon }, index) in menu" :key="index" class="hidden sm:flex items-center">
                    <span class="hidden"><font-awesome-icon class="mr-2" :icon="icon" /></span>{{ title }}
                </li>
            </ol>
        </div>
        <figure class="relative hidden lg:flex items-center justify-between w-[80px] lg:w-[100px] lg:mr-[5vw] btn-go group">
                <img class="menu-icon group-hover:translate-x-[50px] transition duration-150 ease-in-out"
                    :src="scrollDistance > 0 && scrollType === 'down' ? gDark : gLight" alt="">
                <img class="menu-icon transition duration-150 ease-in-out"
                    :src="scrollDistance > 0 && scrollType === 'down' ? oDark : oLight" alt="">
                <font-awesome-icon class="mr-2 text-2xl absolute right-[6px] opacity-0 group-hover:opacity-100 transition duration-150 ease-in-out"
                    :class="[ scrollDistance > 0 && scrollType === 'down' ? 'text-secondary' : 'text-white' ]"
                    :icon="['fa-solid', 'fa-user']" />
        </figure>
        <div class="flex lg:hidden flex-wrap justify-center items-center w-[30px] h-full px-[30px] group">
            <div>
                <div v-for="n in 2" :key="n" class="hamburger-bar transition duration-150 ease-in-out group-hover:first:translate-y-[calc(5px/2+1px)] origin-center group-hover:last:translate-y-[calc(-5px/2-1px)] group-hover:first:rotate-[25deg] group-hover:last:rotate-[-25deg]"></div>
            </div>
        </div>
    </nav>
    
</template>
<style lang="scss">
.header-fix {
    @apply flex items-center justify-between fixed top-0 left-0 h-[70px] w-screen;
    li, div {
        @apply cursor-pointer;
    }
}
.hamburger-bar {
    @apply w-[24px] h-[2px] bg-gray-800 rounded-sm;

    &:not(:last-child) {
        margin-bottom: 5px;
    }
}
nav {
    z-index: 999;
}
.menu-icon {
    --menu-icon-size: 50px;
    @media all and (max-width: 600px) {
        --menu-icon-size: 40px;
    }
    width: var(--menu-icon-size);
    height: var(--menu-icon-size);
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import logo from '~/assets/images/logo.svg';
import logoWhite from '~/assets/images/logo-w.svg';
import gLight from '~/assets/images/g-light.svg';
import oLight from '~/assets/images/o-light.svg';
import gDark from '~/assets/images/g-dark.svg';
import oDark from '~/assets/images/o-dark.svg';
const scrollDistance = ref(0)
const scrollRecord = reactive([])
const menu = ref([
    { title: 'Top', icon: ['fas', 'house'] },
    { title: 'Pain points', icon: ['fas', 'list-ol'] },
    { title: 'Features', icon: ['fas', 'pizza-slice'] },
    { title: 'Start up', icon: ['fas', 'hand-holding-dollar'] }
])
onMounted(() => {
  document.addEventListener('scroll', () => {
    scrollDistance.value = window.scrollY;
    scrollRecord.push(window.scrollY)
    if(scrollRecord.length > 2) {
        scrollRecord.splice(0, scrollRecord.length-2);
        
    }
  })
})
const scrollType = computed(() => scrollRecord[0] < scrollRecord[1] ? 'down' : 'up')
</script>