<template>
  <div class="bg-white min-h-screen overflow-hidden">
    <component :is="{...component}"></component>
  </div>
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
</style>
<script setup>
  import { ref, onMounted, shallowRef } from 'vue';
  import { storeToRefs } from 'pinia'
  import leadingPage from './home/leadingPage.vue';
  import userCenter from './userCenter/index.vue';
  // import lottie from 'lottie-web';
  // import animationData from '~/assets/lottie/animation.json';
  
  const authStore = userAuthStore ();
  let component = ref(leadingPage);
  const { isLoggedIn } = storeToRefs(authStore)

  watch(isLoggedIn, (val,oldVal)=>{
      if (isLoggedIn) component.value = userCenter;
  })
</script>