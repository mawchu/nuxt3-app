<template>
    <nav ref="tabs" class="header-fix overflow-visible"
        :class="[
            scrollType === 'down' || isTriggeredWave  ? 'wave' : '',
            itemShow ? 'h-[100%]' : 'h-[70px]'
        ]">
        <div class="w-full h-[100%] md:w-4/5 lg:w-2/3 flex flex-col">
            <ol class="flex flex-col md:flex-row md:justify-between text-lg font-semibold text-secondary">
                <li class="lg:ml-0 origin-top-left ease-linear duration-100 flex items-center"
                    :class="[
                        (scrollDistance > 0 && scrollType === 'down') && (deviceWidth >= breakpointMd) ? 'scale-125' : ''
                    ]">
                    <figure v-if="(scrollType === 'down' && deviceWidth >= breakpointMd) ||
                        (isTriggeredWave && (deviceWidth >= breakpointMd)) ||
                        (itemShow && deviceWidth < breakpointMd)" class="menu-icon">
                        <img class="w-full h-[100%] object-contain" :src="logoWhite" alt="">
                    </figure>
                    <figure v-else class="menu-icon">
                         <img class="w-full h-[100%] object-contain" :src="logo" alt="">
                    </figure>
                </li>
                <li v-for="({ title, icon }, index) in menu" :key="index"
                    class="menu-item md:flex flex-col relative w-full h-[60px] items-center item linear duration-300 group overflow-hidden mt-6 md:mt-0"
                    :class="[
                        (triggeredByObsered(index) && scrollType === 'down') ||
                        (triggeredByObsered(index) && isTriggeredWave) ? 'active' : '',
                        (triggeredByHovered(index) && isTriggeredWave) ||
                        (triggeredByObsered(index) && scrollType === 'up') ? 'hover' : '',
                        (triggeredByObsered(index) && isTriggeredWave) ? 'float' : '',
                        itemShow ? 'flex' : 'hidden'
                    ]"
                    @pointerenter="pointerEventAction(index)"
                    @pointerleave="pointerEventAction(index)"
                    @pointerdown="toAnchor(index), controlMenu()">
                    <div class="absolute top-[calc(50%-15px)] left-0 h-[120px] w-full flex flex-col flex-wrap justify-between items-center pointer-events-none duration-150 ease-in-out overflow-hidden group-hover:floating"
                        :class="[
                            triggeredByObsered(index) ? '-translate-y-[calc(120px-30px)]' : '',
                            triggeredByHovered(index) && isTriggeredWave ? '-translate-y-[calc(120px-30px)]' : '',
                        ]">
                        <h2 class="w-full text-center lg:text-2xl font-extrabold"
                            :class="[
                                (scrollType === 'down') || isTriggeredWave || (deviceWidth < 768)
                                    ? 'text-white' : 'text-secondary'
                            ]">
                            {{ title }}
                        </h2>
                        
                        <span class="text-2xl duration-100 ease-linear"
                            :class="[ (triggeredByObsered(index) && (scrollType === 'down')) ||
                                triggeredByObsered(index) && isTriggeredWave  ? 'text-secondary' : 'text-white'
                            ]">
                            <font-awesome-icon :icon="icon" />
                        </span>
                    </div>
                </li>
            </ol>
            <GoButton class="md:hidden mt-8" align="center"
                :type="scrollType === 'down' || isTriggeredWave ? 'dark' : 'light'"
                :class="[ itemShow ? 'flex' : 'hidden' ]"
                @click="loginButton('click')"
                @pointerenter="loginButton('enter')"
                @pointerleave="loginButton('leave')"
                @pointerdown="loginButton('down')"/>
        </div>
       <GoButton class="hidden md:flex z-[20]"
        :type="scrollType === 'down' || isTriggeredWave ? 'dark' : 'light'" 
        @click="loginButton('click')"
        @pointerenter="loginButton('enter')"
        @pointerleave="loginButton('leave')"
        @pointerdown="loginButton('down')"/>

       <!-- 漢堡 -->
        <div class="hamburger-wrapper group"
            @click.prevent="controlMenu()">
            <div>
                <div>
                    <div v-for="n in 2" :key="n" class="hamburger-bar origin-center last:w-[24px] group-hover:first:w-[24px]  "
                    :class="[
                        itemShow ? `first:translate-y-[calc(5px/2+1px)]
                        last:translate-y-[calc(-5px/2-1px)]
                        first:w-[24px]
                        first:rotate-[25deg]
                        last:rotate-[-25deg]` : 'first:w-[12px]' ]"></div>
                </div>
            </div>
        </div>
    </nav>
    
</template>
<style lang="scss" scoped>
$max-width-md: 768px;
$max-width-xs: 400px;

@mixin animate($duration, $animate, $function) {
    animation: $animate $duration $function infinite alternate;
    // animation-duration: alternate;
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
            transform: translateY(15px);
        }
        100% {
            transform: translateY(15px);
        }
        50% {
            transform: translateY(5px);
        }
    }
}

.header-fix {
    --nav-height-md: 70px;
    @apply flex justify-between fixed top-0 left-0 md:h-[var(--nav-height-md)] w-full ease-in-out duration-300 pt-3 md:pt-0 px-3 lg:px-10 md:bg-[unset];
    z-index: 14;
    li, div {
        @apply cursor-pointer;
        z-index: 15;
    }
    // 球
    .item, li {
        &::after {
            --circle-size: calc(var(--nav-height-md) * .8);
            content: " ";
            top: calc(50% - var(--circle-size)/2);
            left: calc(50% - var(--circle-size)/2);
            position: absolute;
            width: var(--circle-size);
            height: var(--circle-size);
            z-index: -2;
            transform: scale(0);
            opacity: 0;
            // pointer-events: none;
            @apply rounded-full ease-in-out duration-300;

        }

        &.active::after, &.hover::after {
            transform: scale(1);
            opacity: 100;
            @apply text-secondary;
        } 
        &.active {
            &::after {
                transition: all .5s;
                background: linear-gradient(180deg, rgba(232,255,220,1) 48%, rgba(252,247,172,1) 100%);
                // box-shadow: 0 0 15px #e2937b;
            }
        }

        &.hover {
            &::after {
                @apply bg-secondary;
            }
        }

        &.float {
            @include animate(1s, float, linear);
            &::after {
                background: linear-gradient(
                    180deg, 
                    rgba(232,255,220,1) 48%, 
                    rgba(252,247,172,1) 80%,
                    rgba(255, 255, 255, 0) 100%
                );
            }
        }
    }


    // 海浪
    // 海浪第一層
    &::after {
        z-index: 12;
        background-image: url(~/assets/images/wave.svg);
        @media all and (max-width: #{$max-width-md}) {
            background-image: url(~/assets/images/wave-m.svg);
            inset: 0;
        }
    }
    // 海浪第二層
    &::before {
        z-index: 13;
        inset: -10px;
        background-image: url(~/assets/images/wave-1.svg);
        backdrop-filter: saturate(120%);
        mix-blend-mode: overlay;
        @media all and (max-width: #{$max-width-md}) {
            background-image: url(~/assets/images/wave-1-m.svg);
            inset: 0;
        }
        
    }
    &::after, &::before{
        transition: .5s ease-in-out;
        content: " ";
        position: absolute;
        inset: -5px;
        pointer-events: none;
        transform: scale(0);
        background-repeat: repeat-x;
        transform: translateY(-100px);
        background-position: bottom left;
        @media all and (max-width: #{$max-width-md}) {
            background-position: 100px left;
            background-size: contain;
        }
        @media all and (max-width: #{$max-width-xs}) {
            background-position: 100px left;
            background-size: cover;
        }
    }

    &.wave {
        &::after, &::before {
            transform: translateY(0);
            @media all and (max-width: #{$max-width-md}) {
                transform: translateY(-200px);
            }
        }
        
    }
    
    &:hover {
        &::after {
            @include animate(6s, wave, ease-out);
        }
        &::before {
            @include animate(12s, wave,  ease-out);
        }
    }

}

.hamburger {
    &-wrapper {
        --hamburgur-padding: 16px;
        @apply absolute top-[calc(var(--hamburgur-padding)*1)] right-0 md:hidden p-4;
    }

    &-bar {
        transition: ease-in-out .3s;
        @apply h-[2px] bg-gray-800 rounded-sm;
        
        &:not(:last-child) {
            margin-bottom: 5px;
        }
    }
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
const emit = defineEmits([
    'scrollTypeEmit',
    'toAnchorEmit',
    'isTriggeredWaveEmit',
    'unableToHoverSectionEmit',
    'toUserCenterEmit',
    'setComponentUserCenterEmit'
]);
const props = defineProps(['currentSectionIndex', 'isLoggedIn'])
const hoveredIndex = ref(0);
const itemShow = ref(false);
const menuClickTimer = ref(0);
const deviceWidth = ref(0);
const breakpointMd = ref(768);
let isTriggeredWave = ref(false);
let unableToHover = ref(false);

const toggleTriggerWave = (boolean) => {
    isTriggeredWave.value = boolean;
    emit('isTriggeredWaveEmit', isTriggeredWave.value);
    // console.log(isTriggeredWave.value)
}

onMounted(() => {
    deviceWidth.value = window.innerWidth;
    window.addEventListener('resize', () => {
        deviceWidth.value = window.innerWidth;
    })
    document.addEventListener('scroll', () => {
        scrollDistance.value = window.scrollY;
        scrollRecord.push(window.scrollY)
        if(scrollRecord.length > 2) {
            scrollRecord.splice(0, scrollRecord.length-2);
        }
        emit('scrollTypeEmit', scrollType);
    }, { passive: true });

    tabs.value.addEventListener('pointerenter', (e) => {
        toggleTriggerWave(true);
    })

    tabs.value.addEventListener('pointerleave', (e) => {
        if (deviceWidth.value >= breakpointMd.value) toggleTriggerWave(false);
    })
    
})
const scrollType = computed(() => scrollRecord[0] < scrollRecord[1] ? 'down' : 'up');

function controlMenu () {
    emit('unableToHoverSectionEmit', true);
    menuClickTimer.value ++;
    itemShow.value = menuClickTimer.value % 2 === 1;
    toggleTriggerWave(menuClickTimer.value % 2 === 1);
    
    setTimeout(() => {
        emit('unableToHoverSectionEmit', false);
    }, 800)
}

function triggeredByObsered (index) {
    return (props.currentSectionIndex === index);
}
function triggeredByHovered (index) {
    return (hoveredIndex.value === index);
}
function pointerEventAction (index) {
    hoveredIndex.value = index;
}
function toAnchor (index) {
    emit('toAnchorEmit', index);
}

function loginButton (event) {
    if (props.isLoggedIn === true && event === 'click') emit('setComponentUserCenterEmit');
    if (event === 'enter' || event === 'leave') pointerEventAction(menu.length-1);
    if (event === 'down') toAnchor(menu.value.length-1);
}

</script>