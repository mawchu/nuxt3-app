<template>
  <!-- <div>
    <NuxtWelcome />
  </div> -->
  <div class="bg-white minh-screen">
    <MainHeader />
    <section class="bg-top">
      <main class="flex flex-wrap h-screen flex-col sm:flex-row items-center justify-center px-6">
        <div class="w-[100%] sm:w-[60%] flex items-center justify-center">
          <img class="w-[50vw] max-h-[55vh]" src="~/assets/images/main-kv.svg" alt="Financial Assets Website helps solving financial issues, such as spending tracking, bills managing, and setting savings goals to fullfill step by step.">
        </div>
        <article class="w-[100%] sm:w-[40%] text-secondary text-center sm:text-left py-8 sm:py-0">
          <h1 class="text-title">Financial<br />Assistant</h1>
          <h2 class="text-content">
            Tracks your spending<br />for healthy financial affairs.
          </h2>
        </article>
      </main>
      <article class="min-h-screen flex text-center container items-center justify-center">
        <div>
          <h2 class="text-subtitle">We hear your concerns</h2>
          <p class="text-content">You always end up with empty pockets and bank accounts, confused about where your money is going,<br />with plenty of bills waiting in line to be paid.</p>
          <div class="flex flex-column sm:flex-row flex-wrap pt-10 sm:pt-16"
            @pointerleave.stop="imgState.index = -1">
            <div v-for="({ origin, hovered, description }, index) in painPoints" :key="index"
              class="relative w-[100%] sm:w-[33.33%] h-[40vh] flex items-center justify-center first:pr-6 sm:first:pr-9 not-first:not-last:px-6 sm:not-first:not-last:px-9 sm:last:pl-9"
              :class="[
                  (index === 0) ? 'order-2 sm:order-1' : 'order-1 sm:order-2',
                  (index === (painPoints.length - 1))? 'order-3' : ''
                ]"
              @pointerenter="changeImgState(index, 'hovered')"
              @pointerleave="changeImgState(index, 'origin')">
              <p v-show="imgState.index === index" class="text-upper w-[80%] absolute mb-3 ease-in-out duration-1000"
                :class="[
                  (index === 0) || (index === (painPoints.length - 1))
                  ? 'text-left pl-12 sm:pl-15' : 'text-center px-6 sm:px-10',
                  (imgState.index === index) && (imgState.index !== -1) ? 'opacity-100' : 'opacity-0'
                ]" style="z-index:3" v-html="description">
              </p>
              <div class="relative">
                <img class="flex object-contain max-h-[50vh] ease-in-out duration-300 absolute"
                  :class="[
                    (imgState.index === index) && (imgState.index !== -1) ? 'opacity-0' : 'opacity-100',
                    (index === 1) ? '' : 'order-1 sm:order-2',
                  ]"
                  :src="origin" alt="">
                <img class="d-block object-contain max-h-[50vh]"
                  :src="hovered" alt="">
                <img v-show="index === 1" class="absolute object-contain max-h-[50vh] animate-float" style="top: 0; left: 0"
                  :class="[(imgState.index === index) && (imgState.index !== -1) ? 'opacity-0' : 'opacity-100']"
                :src="moneyFly" alt="">
                <img v-show="index === 1" class="absolute object-contain max-h-[50vh]" style="top: 0; left: 0"
                  :class="[(imgState.index === index) && (imgState.index !== -1) ? 'opacity-0' : 'opacity-100']"
                :src="moneyStay" alt="">
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
    <!-- carousel -->
    <section class="min-h-[80vh] bg-linear relative overflow-hidden">
      <article class="flex flex-wrap justify-between container pt-5 sm:p-11 px-6 lg:px-0">
        <div class="inline-block sm:w-[50%] lg:w-auto sm:px-2 lg:px-0 order-2 md:order-1">
          <p class="text-content mt-0">
            Financial Assistant help you deal with your expenses and budgets<br />
            more efficiently and dounbtless, category system visualizes those unseen<br />
            and potential over wasted costs
          </p>
          <div class="text-4xl lg:text-5xl text-secondary mt-3 sm:mt-7 text-right">
            <span @click="(carouselCounter <= 0) ? carouselCounter = (features.length - 1) : carouselCounter--; loopType = 'prev'">
              <font-awesome-icon class="font-2xl first:mr-3" :icon="['fa-regular', 'fa-circle-left']" />
            </span>
            <span @click="(carouselCounter > (features.length - 2)) ? carouselCounter = 0 : carouselCounter++; loopType = 'next'">
              <font-awesome-icon class="font-2xl" :icon="['fa-regular', 'fa-circle-right']" />
            </span>
          </div>
        </div>
        <h2 class="text-subtitle flex justify-end md:w-[40%] sm:w-[50%] lg:w-auto sm:px-2 lg:px-0 order-1 md:order-2 mb-4 sm:mb-0">How we could<br />solve your<br />expenses issues.</h2>
      </article>
      <div class="flex items-stretch relative pointer-events-none h-[40%] mt-4 sm:mt-0 sm:-translate-y-[5vw] scale-[1.6] sm:scale-[1] origin-top-left">
        <figure v-for="({ src }, index) in features" :key="index"
          class="object-contain aspect-square shrink-0 absolute top-0 h-[30vw] ease-linear duration-300"
          :class="[
            ((carouselCounter + index)%features.length === 1) ? 'w-[40%] px-[4vw]' : 'w-[20%] px-[3vw]',
            ((carouselCounter + index)%features.length === (features.length -1)) && (loopType == 'prev') ? 'animate-flash-prev' : '',
            ((carouselCounter + index)%features.length === 1) && (loopType === 'next') ? 'animate-flash-next' : '',
          ]"
          :style="`left: ${loopType === 'next' && (carouselCounter + index)%features.length === 0
              ? '100' : carouselPositions[Math.abs((carouselCounter + index)%features.length)]}%`" :data-main="index+ ' ' +(mainIndex - 2)">
          <img class="w-[100%] h-[100%]" :src="src" alt="">
        </figure>
        
      </div>
      <article class="text-center flex justify-end text-xl sm:text-3xl font-medium h-30 absolute bottom-[10vh] w-[100%]">
        <div class="w-[60%] linear">
          <div class="relative inline-block">
            <span>{{ features[mainIndex].title }}</span>
            <div ref="underlineL" class="absolute bottom-0 h-[1px] bg-black left-[50%] animate-underline"></div>
            <div ref="underlineR" class="absolute bottom-0 h-[1px] bg-black right-[50%] animate-underline"></div>
          </div>
        </div>
        
        
      </article>
    </section>
    </div>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@200;400;800&display=swap');
  * {
    font-family: 'Karla', sans-serif;
  }
  @font-face {
    font-family: 'Karla';
    font-display: swap;
    src: url('/Karla.woff2') format('woff2');
  }
  .bg {
    &-top {
      background-image: url(~/assets/images/bg-top.svg);
      background-size: cover;
      background-position: center center;
    }
    &-linear {
      background: linear-gradient(90deg, rgba(232,255,220,1) 52%, rgba(252,247,172,0.46) 100%);
      background-size: 100% 60%;
      background-repeat: no-repeat;
    }
  }
  .text {
    &-title {
      @apply font-extrabold text-5xl sm:text-6xl font-sans text-secondary;
    }
    &-subtitle {
      @apply font-extrabold text-4xl sm:text-5xl  font-sans text-secondary;
      ~.text-content {
        @apply sm:mt-9;
      }
    }
    &-content {
      @apply text-sm font-bold text-secondary;
    }
    &-upper {
      @apply mt-4 sm:mt-9 font-bold text-secondary uppercase text-2xl;
    }
  }
  .container {
    max-width: 1200px;
    margin-inline: auto;
  }
    
  @mixin animate-float($duration, $timing-function) {
    animation: float $duration $timing-function infinite alternate;
    @keyframes float {
      from {
        transform: translateY(-4%);
      }
      to {
        transform: translateY(8%);
      }
    }
  }

  @mixin animate-flash($duration, $timing-function, $direction) {
    animation: $direction $duration $timing-function 1 forwards;
    @keyframes prev {
      0% {
        opacity: 0;
        transform: translateX(20%);
      }
      65% {
        opacity: 0;
        transform: translateX(20%);

      }
      100% {
        opacity: 100;
        transform: translateX(0);

      }
    }
    @keyframes next {
      0% {
        opacity: 0;
        transform: translateX(-20%);
      }
      65% {
        opacity: 0;
        transform: translateX(-20%);

      }
      100% {
        opacity: 100;
        transform: translateX(0);

      }
    }
  }

  @mixin animate-stretch($duration, $timing-function, $direction) {
    width: 50%;
    animation: $direction $duration $timing-function 1 forwards;
    transform-origin: center center;
    @keyframes left {
      0% {
        width: 0;
        left: 50%;
      }
      100% {
        width: 50%;
        left: 50%;
      }
    }
    @keyframes right {
      0% {
        width: 0;
        right: 50%;
      }
      100% {
        width: 50%;
        right: 50%;
      }
    }
  }

  .animate-float {
    opacity: 0;
    @include animate-float(.4s, ease-in);
  }
  .animate-flash {
    &-prev {
      @include animate-flash(.5s, cubic-bezier(.02,1.05,.26,.99), prev);
    }
    &-next {
      @include animate-flash(.5s, cubic-bezier(.02,1.05,.26,.99), next);
    }
  }

  .animate-underline {
    width: 50%;
    &.r{
      right: 50%;
      @include animate-stretch(.4s, ease-in, right);
    }
    &.l{
      left: 50%;
      @include animate-stretch(.4s, ease-in, left);
    }
  }


</style>
<script setup>
  import { ref, onMounted } from 'vue';
  import painPoints1 from '~/assets/images/pain-point-1-default.svg';
  import painPoints1h from '~/assets/images/pain-point-1-hover.svg';
  import painPoints2 from '~/assets/images/pain-point-2-default.svg';
  import painPoints2h from '~/assets/images/pain-point-2-hover.svg';
  import painPoints3 from '~/assets/images/pain-point-3-default.svg';
  import painPoints3h from '~/assets/images/pain-point-3-hover.svg';
  import moneyFly from '~/assets/images/money-fly.svg';
  import feature1 from '~/assets/images/feature1.svg';
  import feature2 from '~/assets/images/feature2.svg';
  import feature3 from '~/assets/images/feature3.svg';
  import feature4 from '~/assets/images/feature4.svg';
  import feature5 from '~/assets/images/feature5.svg';
  import moneyStay from '~/assets/images/money-stay.svg';

  const underlineL = ref(null);
  const underlineR = ref(null);

  const painPoints = ref([
    {
      origin: painPoints1,
      hovered: painPoints1h,
      description: 'The failure to<br />reach<br />savings<br />goals.'
    },
    {
      origin: painPoints2,
      hovered: painPoints2h,
      description: 'Spending<br />your money<br />aimlessly.'
    },
    {
      origin: painPoints3,
      hovered: painPoints3h,
      description: 'Being<br />overwhelmed<br />by endless<br />debts.'
    }
  ])

  const imgState = reactive({
    index: -1, state: 'origin'
  });

  const features = ref([
    { title: 'Help you to categorize expenses.', src: feature1 },
    { title: 'Budgets and savings accumulative progression.', src: feature2 },
    { title: 'Expenses threshold setting.', src: feature3 },
    { title: 'Financial analysis visualizing.', src: feature4 },
    { title: 'Considerate notification settings.', src: feature5 },
  ])

  const loopType = 'next';

  const carouselPositions = computed(() => [...Array(features.value.length).keys()]
    .map((item, index) => index === 2 ? '40' : index === 0 ? (index - 1) * 20 : index === 1 ? 0 : 40 + (index - 2) * 20));
  const carouselCounter = ref(1);
  const mainIndex = computed(()=> [...Array(features.value.length).keys()]
    .findIndex((index) => (carouselCounter.value + index)%(features.value.length) === 1));

  onMounted(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;800&display=swap'
    document.head.appendChild(link)
    console.log([...Array(features.length).keys()].map((item, index) => (index - 1) * 20))
    console.log(underlineL)
  })

  function changeImgState(index, type) {
    imgState.index = index;
    imgState.state = type;
  }

  watch(mainIndex, (val,oldVa)=>{
    setTimeout(() => {
      console.log(underlineR.value.classList, underlineL.value.classList)
      underlineR.value.classList.add('r');
      underlineL.value.classList.add('l');
      setTimeout(() => {
        underlineR.value.classList.remove('r');
        underlineL.value.classList.remove('l');
      }, 400);
    }, 0);
  })

</script>