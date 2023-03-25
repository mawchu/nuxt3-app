<template>
    <nav ref="tabs" class="header-fix ease-in-out duration-300 px-6 lg:px-10"
        :class="[
            // scrollDistance > 0 ? 'bg-gradient-to-b from-white to-white/10' : '',
            scrollType === 'down' || isTriggeredWave  ? 'active' : '',
        ]">
        <div class="w-[90%] md:w-5/6 lg:w-2/3">
            <ol class="flex sm:justify-between text-lg font-semibold text-secondary">
                <li class="lg:ml-0 origin-top-left ease-linear duration-100 flex items-center"
                    :class="[ scrollDistance > 0 && scrollType === 'down' ? 'scale-150' : '' ]">
                    <figure v-if="scrollType === 'down' || isTriggeredWave" class="menu-icon">
                        <img class="w-[100%] h-[100%] object-contain" :src="logoWhite" alt="">
                    </figure>
                    <figure v-else class="menu-icon">
                        <img class="w-[100%] h-[100%] object-contain" :src="logo" alt="">
                    </figure>
                    <!-- <figure class="menu-icon">
                        <img class="w-[100%] h-[100%] object-contain" :src="logo" alt="">
                    </figure> -->
                </li>
                <!-- <li v-for="({ title, icon }, index) in menu" :key="index" class="relative hidden sm:flex items-center item linear duration-300"
                    :class="[ scrollDistance > 0 && scrollType === 'down' ? 'text-white' : 'text-secondary' ]">
                    <span class="hidden"><font-awesome-icon class="mr-2" :icon="icon" /></span>{{ title }}
                </li> -->
                <li v-for="({ title, icon }, index) in menu" :key="index"
                    class="relative w-[100%] h-[70px] hidden md:flex flex-col items-center item linear duration-300 group  overflow-hidden"
                    :class="[
                        scrollType === 'down' || isTriggeredWave ? 'text-white' : 'text-secondary',
                        (triggered(index) && scrollType === 'down') || (triggered(index) && isTriggeredWave) ? 'active' : '',
                        (index === hoveredIndex  && isTriggeredWave) || (triggered(index) && scrollType === 'up') ? 'hover' : ''
                    ]"
                    @pointerenter="hovered($event, 'enter', index)"
                    @pointerleave="hovered($event, 'leave', index)">
                    <div class="absolute top-[calc(50%-15px)] left-0 h-[120px] w-[100%] flex flex-col flex-wrap justify-between items-center group-hover:-translate-y-[calc(120px-30px)] pointer-events-none duration-150 ease-in-out overflow-hidden group-hover:floating"
                        :class="[
                            triggered(index) ? '-translate-y-[calc(120px-30px)]' : ''
                        ]">
                        <h2 class="w-[100%] text-center">{{ title }}</h2>
                        <span class="text-secondary"
                            :class="[ (triggered(index) && scrollType === 'down') ||
                            (triggered(index) && isTriggeredWave)
                                ? 'text-secondary' : 'text-white' ]"><font-awesome-icon :icon="icon" /></span>
                    </div>
                </li>
            </ol>
        </div>
       <GoButton :type="scrollType === 'down' || isTriggeredWave ? 'dark' : 'light'" />
       <!-- <GoButton :type="'light'" /> -->
        <div class="lg:hidden">
            <div class="flex flex-wrap justify-center items-center w-[30px] h-full px-[30px] group">
                <div>
                    <div v-for="n in 2" :key="n" class="hamburger-bar transition duration-150 ease-in-out group-hover:first:translate-y-[calc(5px/2+1px)] origin-center group-hover:last:translate-y-[calc(-5px/2-1px)] group-hover:first:rotate-[25deg] group-hover:last:rotate-[-25deg]"></div>
                </div>
            </div>
        </div>
        
    </nav>
    
</template>
<style lang="scss">
 @mixin animate($duration, $animate) {
    animation: $animate $duration ease-out infinite alternate-reverse;
    @keyframes wave {
        0% {
            background-position: 0;
        }
        100% {
            background-position: 100%;
        }
    }
    @keyframes float {
        0% {
            transform: translateY(20px);
        }
        100% {
            transform: translateY(-10px);
        }
    }
}
.header-fix {
    --nav-height: 70px;
    @apply flex items-center justify-between fixed top-0 left-0 h-[var(--nav-height)] w-[100%];
    
    li, div {
        @apply cursor-pointer;
        z-index: 5;
    }
    .item, li {
        .floating {
            @include animate(1s, float);
        }
        // 球
        &::after {
            --circle-size: calc(var(--nav-height) * .8);
            content: " ";
            top: calc(50% - var(--circle-size)/2);
            left: calc(50% - var(--circle-size)/2);
            position: absolute;
            width: var(--circle-size);
            height: var(--circle-size);
            z-index: -2;
            transform: scale(0);
            opacity: 0;
            pointer-events: none;
            @apply rounded-full ease-in-out duration-300;

        }
        &.active::after, &.hover::after {
            transform: scale(1);
            opacity: 100;
            @apply text-secondary;
        } 
        &.hover::after {
            @apply bg-secondary;
        }
        &.active::after {
            background: linear-gradient(180deg, rgba(232,255,220,1) 48%, rgba(252,247,172,1) 100%);
            box-shadow: 0 0 15px #e2937b;
        }
        
    }

    &::after, &::before{
        transition: .5s ease-in-out;
        content: " ";
        position: absolute;
        inset: -5px;
        pointer-events: none;
        transform: scale(0);
        background-size: contain;
        background-repeat: repeat-x;
        transform: translateY(-100px);
    }
    // 海浪第一層
    &::after {
        z-index: -2;
        background-image: url(~/assets/images/wave.svg);
        background-position: bottom left;
    }
    // 海浪第二層
    &::before {
        z-index: -1;
        inset: -10px;
        background-image: url(~/assets/images/wave-1.svg);
        background-position: -10px left;
        background-size: contain;
        backdrop-filter: saturate(120%);
        mix-blend-mode: overlay;
        
    }
    &.active {
        &::after, &::before {
            transform: translateY(5px);
        }
    }
   

    
    &:hover {
        &::after {
            @include animate(6s, wave);
        }
        &::before {
            @include animate(12s, wave);
        }
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
import { menuList } from '~/globalDatas';

const scrollDistance = ref(0)
const scrollRecord = reactive([])
const menu = ref(menuList)
const tabs = ref(null);
const emit = defineEmits(['scrollTypeEmit']);
const props = defineProps(['currentSectionIndexEmit'])
const hoveredIndex = ref(0);

let isTriggeredWave = ref(false);

onMounted(() => {
  document.addEventListener('scroll', () => {
    scrollDistance.value = window.scrollY;
    scrollRecord.push(window.scrollY)
    if(scrollRecord.length > 2) {
        scrollRecord.splice(0, scrollRecord.length-2);
    }
    emit('scrollTypeEmit', scrollType);
  });

  tabs.value.addEventListener('pointerenter', (e) => {
    isTriggeredWave.value = true;
  })

  tabs.value.addEventListener('pointerleave', (e) => {
    isTriggeredWave.value = false;
  })
})
const scrollType = computed(() => scrollRecord[0] < scrollRecord[1] ? 'down' : 'up');

function triggered (index) {
    return (props.currentSectionIndexEmit === index);
}
function hovered (event, type, index) {
    hoveredIndex.value = index;
}
</script>