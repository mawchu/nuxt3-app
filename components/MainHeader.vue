<template>
    <nav class="header-fix" :class="[ scrollDistance > 0 ? 'bg-primary' : 'bg-transparent' ]">
        <div class="w-5/6">
            <ol class="flex justify-around w-[calc(100%-60px)] text-lg font-semibold"
            :class="[ scrollDistance > 0 ? 'text-white' : 'text-secondary' ]">
                <li>
                    <span><font-awesome-icon class="mr-2" :icon="['fas', 'house']" /></span>Top
                </li>
                <li>
                    <span><font-awesome-icon class="mr-2" :icon="['fas', 'list-ol']" /></span>Pain points
                </li>
                <li>
                    <span><font-awesome-icon class="mr-2" :icon="['fas', 'pizza-slice']" /></span>Features
                </li>
                <li>
                    <span><font-awesome-icon class="mr-2" :icon="['fas', 'hand-holding-dollar']" /></span>Start up
                    
                </li>
            </ol>
        </div>
        <div class="flex flex-wrap justify-center items-center w-[30px] h-full px-[30px] group">
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
</style>

<script setup>
import { ref, onMounted } from 'vue';

const scrollDistance = ref(0)

onMounted(() => {
  document.addEventListener('scroll', () => {
    scrollDistance.value = window.scrollY;
  })
})
</script>