<template>
  <div class="bg-white min-h-fullvh overflow-hidden">
    <Transition>
      <component :is="{...component}"></component>
    </Transition>
  </div>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@100;200;300;400;500;600;700;800&display=swap');
  :root {
    --header-height: 70px;
    --vh: 100vh;
  }
  * {
    font-family: 'Karla', sans-serif;
  }
  @font-face {
    font-family: 'Karla';
    font-display: swap;
    src: url('/Karla.woff2') format('woff2');
  }
  .menu-icon {
    --menu-icon-size: 50px;
    // @media all and (max-width: 600px) {
    //     --menu-icon-size: 40px;
    // }
    width: var(--menu-icon-size);
    height: var(--menu-icon-size);
  }
  /* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
<script setup>
  import { ref, onMounted, onBeforeMount, shallowRef } from 'vue';
  import { storeToRefs } from 'pinia'
  import componentHome from './home/index.vue';
  import componentUserCenter from './userCenter/index.vue';
  import componentSpendingRecords from './userCenter/spendingRecords.vue';
  import componentOverview from './userCenter/Overview.vue';
  // import lottie from 'lottie-web';
  // import animationData from '~/assets/lottie/animation.json';
  onBeforeMount(() => {
    const screenHeight = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${screenHeight}px`);
  })

  onMounted(() => {
    const screenHeight = window.innerHeight;
    // You can also add an event listener to update the value if the window is resized.
    window.addEventListener('resize', () => {
      document.documentElement.style.setProperty('--vh', `${screenHeight}px`);
    });

    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5882544496919980'; // Replace with your AdSense script URL
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  })
  
  const componentMap = reactive({
    userCenter: componentUserCenter,
    home: componentHome,
    spendingRecords: componentSpendingRecords,
    overview: componentOverview
  });

  const authStore = userAuthStore ();
  // let component = ref(leadingPage);
  let component = ref(componentHome);
  const { isLoggedIn, currentComponent } = storeToRefs(authStore)
  const { setCurrentComponent } = userAuthStore();


  watch(isLoggedIn, (val,oldVal)=>{
    if (isLoggedIn.value)
      setCurrentComponent ('userCenter');
      component.value = componentMap[currentComponent.value];
  })
  
  watch(currentComponent, (val,oldVal)=>{
    component.value = componentMap[currentComponent.value];
  })
</script>