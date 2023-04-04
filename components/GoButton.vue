<template>
     <figure class="relative mx-auto md:mx-[unset] right-0 flex items-center justify-between w-[100px] cursor-pointer group">
        <img class="menu-icon transition duration-150 ease-in-out w-[50px] group:"
            :class="[
                (align === 'right') && isActive
                    ? 'group-hover:translate-x-[50px]' : (align === 'center') && isActive
                    ? 'group-hover:translate-x-[25px]' : ''
            ]"
            :src="type === 'dark' ? gDark : gLight" alt="">
        <img class="menu-icon transition duration-150 ease-in-out w-[50px]"
            :class="[
                (align === 'right')
                    ? '' : (align === 'center') && isActive
                    ? 'group-hover:-translate-x-[25px]' : ''
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
    },
    isActive: {
        required: false,
        default: true
    }
})
</script>