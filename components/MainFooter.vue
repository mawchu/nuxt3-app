<template>
    <footer class="border-t-[1px] border-secondary grid grid-cols-2 sm:grid-cols-3 sm:grid-rows-2 md:grid-rows-1 md:grid-cols-7 min-h-[180px] px-3">
      <!-- 1 -->
      <nav class="order-2 col-span-1 sm:col-span-2 md:order-1 md:col-span-4 lg:col-span-3 my-6">
        <ul class="sm:flex justify-around items-center h-[100%] text-xl">
          <li v-for="({ title }, index) in menuList" :key="index"
            class="relative font-extrabold text-secondary z-0">{{ title }}</li>
        </ul>
      </nav>
      <div class="hidden lg:block lg:col-span-1 lg:order-2"></div>
      <!-- 2 -->
      <figure class="order-1 col-span-1 sm:col-span-1 md:order-2 md:col-span-1 w-full h-[100%] flex items-center md:justify-center sm:pl-[26px] md:pl-0">
        <img class="w-[60px] md:w-[60%] h-[100px] object-contain" :src="logo" alt="">
      </figure>
      <!-- 3 -->
      <article class="order-3 col-span-2 sm:col-span-2 md:col-span-2 sm:pl-4 pt-2 h-[100%] flex items-center justify-center md:justify-start">
        <div class="px-3 sm:flex sm:flex-wrap sm:items-center text-center sm:text-start">
          <div class="flex flex-wrap justify-center sm:justify-start text-2xl text-secondary md:w-full">
            <font-awesome-icon class="mr-2" :icon="['fab', 'facebook']" />
            <font-awesome-icon class="mr-2" :icon="['fab', 'instagram']" />
            <font-awesome-icon class="mr-2" :icon="['fas', 'envelope']" />
          </div>
          <client-only>
            <p class="text-xs font-bold text-secondary my-4">Copyright © {{ dayjs().year() }} Financial Assistant.<br class="hidden lg:block">All rights reserved.</p>
          </client-only>
        </div>
      </article>
    </footer>
</template>
<script setup>
  import dayjs from 'dayjs';;
  import { menuList } from '~/globalDatas';
  import logo from '~/assets/images/logo.svg';

</script>