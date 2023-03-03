<template>
  <!-- <div>
    <NuxtWelcome />
  </div> -->
  <div class="bg-white h-screen">
    <MainHeader />
    <section class="bg-top">
      <main class="flex flex-wrap h-screen flex-col sm:flex-row items-center justify-center px-6">
        <div class="w-[100%] sm:w-[60%] flex items-center justify-center">
          <img class="w-[50vw] max-h-[50vh]" src="~/assets/images/main-kv.svg" alt="">
        </div>
        <article class="w-[100%] sm:w-[40%] text-secondary text-center sm:text-left py-8 sm:py-0">
          <h1 class="font-extrabold text-5xl sm:text-6xl font-sans">Financial<br />Assistant</h1>
          <h2 class="mt-3 font-bold">
            Tracks your spending<br />for healthy financial affairs.
          </h2>
        </article>
        
      </main>
      <div class="h-screen"></div>
    </section>
      
    </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@200;800&display=swap');
  * {
    font-family: 'Karla', sans-serif;
  }
  @font-face {
    font-family: 'Karla';
    font-display: swap;
    src: url('/Karla.woff2') format('woff2');
  }
  .bg-top {
    background-image: url(~/assets/images/bg-top.svg);
    background-size: cover;
    background-position: center center;
  }
</style>
<script setup>
import { ref, onMounted } from 'vue';

  onMounted(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;800&display=swap'
    document.head.appendChild(link)

  })
</script>