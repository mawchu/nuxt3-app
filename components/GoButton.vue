<template>
     <figure class="relative hidden lg:flex items-center justify-between w-[80px] lg:w-[100px] btn-go group cursor-pointer">
        <img class="menu-icon transition duration-150 ease-in-out"
            :class="[
                align === 'right' ? 'group-hover:translate-x-[50px]' : align === 'center' ? 'group-hover:translate-x-[25px]' : ''
            ]"
            :src="type === 'dark' ? gDark : gLight" alt="">
        <img class="menu-icon transition duration-150 ease-in-out"
            :class="[
                align === 'right' ? '' : align === 'center' ? 'group-hover:-translate-x-[25px]' : ''
            ]"
            :src="type === 'dark' ? oDark : oLight" alt="">
        <font-awesome-icon class="mr-2 text-2xl absolute opacity-0 group-hover:opacity-100 transition duration-150 ease-in-out"
            :class="[
                type === 'dark' ? 'text-secondary' : 'text-white',
                align === 'right' ? ' right-[6px]' : align === 'center' ? 'left-[calc(50%-10.5px)]' : ''
            ]"
            :icon="['fa-solid', 'fa-user']" />
    </figure>
</template>
<style lang="scss">
</style>
<script setup>
import { ref, onMounted } from 'vue';
import gLight from '~/assets/images/g-light.svg';
import oLight from '~/assets/images/o-light.svg';
import gDark from '~/assets/images/g-dark.svg';
import oDark from '~/assets/images/o-dark.svg';
// import { defineProps } from 'vue'

const props = defineProps({
    type: {
        required: true,
        default: 'light'
    },
    align: {
        required: false,
        default: 'right'
    }
})
</script>