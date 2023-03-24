<template>
  <!-- <div>
    <NuxtWelcome />
  </div> -->
  <div class="bg-white min-h-screen overflow-hidden">
    <MainHeader />
    <section class="bg-top">
      <main class="flex flex-wrap h-screen flex-col sm:flex-row items-center justify-center px-6">
        <div class="w-[100%] lg:w-[60%] md:order-2 lg:order-1 mt-8 sm:mt-16 flex items-center justify-center">
          <img class="w-[70vw] max-h-[55vh]" src="~/assets/images/main-kv.svg" alt="Financial Assets Website helps solving financial issues, such as spending tracking, bills managing, and setting savings goals to fullfill step by step.">
        </div>
        <article class="w-[100%] lg:w-[40%] md:order-1 sm:mt-16 lg:order-2 text-secondary text-center lg:text-left py-8 sm:py-0">
          <h1 class="text-title mb-6">Financial<br />Assistant</h1>
          <h2 class="text-content">
            Tracks your spending<br />for healthy financial affairs.
          </h2>
        </article>
      </main>

      <article class="flex text-center container items-center justify-center mt-16">
        <div class="px-4">
          <h2 class="text-subtitle mb-4">We hear your concerns</h2>
          <p class="text-content">You always end up with empty pockets and bank accounts, confused about where your money is going,<br class="hidden md:block" /> with plenty of bills waiting in line to be paid.</p>
          <div class="flex flex-column sm:justify-center sm:flex-row flex-wrap pt-10 sm:pt-10 sm:pb-16 md:pt-16"
            @pointerleave.stop="imgState.index = -1">
            <div v-for="({ origin, hovered, description }, index) in painPoints" :key="index"
              class="relative w-[100%] sm:w-[50%] lg:w-[33.33%] calc-height flex items-center justify-center first:pr-6 sm:first:pr-9 not-first:not-last:px-6 sm:not-first:not-last:px-9 sm:last:pl-9 py-3"
              :class="[
                  (index === 0) ? 'order-2 sm:order-1 lg:order-1' : (index === 1) ? 'order-1 sm:order-3 lg:order-2' : 'order-3 sm:order-2'
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
              <figure class="relative h-[26vh] md:h-[100%]"
                :class="[ index === 1 || index === (painPoints.length - 1)
                  ? 'translate-x-[5vw] sm:translate-x-0' : '-translate-x-[5vw] sm:translate-x-0' ]" :data-index="index">
                <img class="flex object-contain w-[100%] h-[100%] ease-in-out duration-300 absolute"
                  :class="[
                    (imgState.index === index) && (imgState.index !== -1) ? 'opacity-0' : 'opacity-100',
                    (index === 1) ? '' : 'order-1 sm:order-2',
                  ]"
                  :src="origin" alt="">
                <img class="d-block object-contain w-[100%] h-[100%]"
                  :src="hovered" alt="">
                <img v-show="index === 1" class="absolute object-contain w-[100%] h-[100%] animate-float" style="top: 0; left: 0"
                  :class="[(imgState.index === index) && (imgState.index !== -1) ? 'opacity-0' : 'opacity-100']"
                :src="moneyFly" alt="">
                <img v-show="index === 1" class="absolute object-contain w-[100%] h-[100%]" style="top: 0; left: 0"
                  :class="[(imgState.index === index) && (imgState.index !== -1) ? 'opacity-0' : 'opacity-100']"
                :src="moneyStay" alt="">
              </figure>
            </div>
          </div>
        </div>
      </article>
    </section>
    <!-- carousel -->
    <section class="bg-linear relative mt-10">
      <article class="flex flex-wrap justify-between container pt-5 sm:py-11  px-6 lg:px-6">
        <div class="inline-block sm:w-[50%] lg:w-auto sm:px-2 lg:px-0 order-2 sm:order-1">
          <p class="text-content mt-0 md:translate-y-[10px]">
            Financial Assistant help you deal with your expenses and budgets<br class="hidden sm:block" />
            more efficiently and dounbtless, category system visualizes those unseen<br class="hidden sm:block" />
            and potential over wasted costs.
          </p>
          <div class="text-4xl lg:text-5xl text-secondary mt-3 sm:mt-7 text-right relative z-20">
            <span @click="(carouselCounter <= 0) ? carouselCounter = (features.length - 1) : carouselCounter--; loopType = 'prev'">
              <font-awesome-icon class="font-2xl first:mr-3" :icon="['fa-regular', 'fa-circle-left']" />
            </span>
            <span @click="(carouselCounter > (features.length - 2)) ? carouselCounter = 0 : carouselCounter++; loopType = 'next'">
              <font-awesome-icon class="font-2xl" :icon="['fa-regular', 'fa-circle-right']" />
            </span>
          </div>
        </div>
        <h2 class="text-subtitle flex justify-end mb-6 md:mb-0 md:w-[40%] sm:w-[50%] lg:w-auto sm:px-2 lg:px-0 order-1 sm:order-2sm:text-right lg:text-left">
          How we could<br />solve your<br />expenses issues.
        </h2>
      </article>
      <div class="relative flex items-stretch h-[40%] sm:mt-0 scale-[1.6] sm:scale-[1.2] lg:scale-[1] origin-top-left -translate-y-[3vh] lg:translate-y-[3vh] occupied" >
        <figure v-for="({ src }, index) in features" :key="index"
          class="object-contain aspect-square shrink-0 absolute sm:-top-[5vw] h-[min(34vh, 34vw)] ease-linear duration-300 z-20"
          :class="[
            ((carouselCounter + index)%features.length === 1) ? 'w-[40%] px-[4vw]' : 'w-[20%] px-[3vw]',
            ((loopType == 'prev') && (carouselCounter + index)%features.length === (features.length -1)) ? 'animate-flash-prev' : '',
            ((loopType === 'next') && (carouselCounter + index)%features.length === 1) ? 'animate-flash-next' : ''
          ]"
          :style="`left: ${loopType === 'next' && (carouselCounter + index)%features.length === 0
              ? '100' : carouselPositions[Math.abs((carouselCounter + index)%features.length)]}%; height: min(36vw, 36vh)`">
          <img class="w-[100%] h-[100%]" :src="src" alt="">
        </figure>
        <img class="absolute w-[40%] px-[4vw] opacity-80 bottom-[20px] mb-6 sm:mb-0" :src="platformImg">
        <article class="absolute flex justify-center sm:justify-end font-medium h-30 bottom-[20px] w-[calc(60%+12px)] sm:w-[calc(80%+3vw)] md:w-[calc(80%+3vw)] lg:w-[100%]">
          <div class="w-[100%] sm:w-[60%] linear flex justify-center text-center">
            <div class="relative inline-block">
              <div class="text-xs sm:text-sm md:text-xl lg:text-2xl" style="" v-html="features[mainIndex].title"></div>
              <div ref="underlineL" class="absolute -bottom-[2px] h-[1px] bg-black left-[50%] animate-underline"></div>
              <div ref="underlineR" class="absolute -bottom-[2px] h-[1px] bg-black right-[50%] animate-underline"></div>
            </div>
          </div>
        </article>
      </div>
      
    </section>
    <section class="bg-bottom min-h-[calc(100vh-70px)] flex items-center py-6 pt-16 overflow-visible">
      <div class="container sm:px-6 flex flex-wrap items-stretch pb-6">
        <article class="mx-8 order-2 lg:order-1 w-[100%] sm:w-[68%] lg:w-[30%] sm:mx-auto lg:mx-0 bg-primary rounded-t-full text-center flex flex-wrap items-center justify-center min-h-[60vh] md:mx-auto lg:min-h-[70vh] my-auto">
          <div class="flex flex-col items-center">
            <div class="px-6">
              <h2 class="w-[100%] font-extrabold text-3xl sm:text-4xl text-white mt-3 md:mt-6">Sign up</h2>
              <p class="font-bold text-xs sm:text-base text-white my-4 sm:px-10">Register your personal financial assistant,building wealth wait for no one!</p>
            </div>
            <form class="font-extrabold" action="">
              <input class="w-[80%] my-3 py-3 px-4 rounded-tl-3xl rounded-br-xl bg-tertiary placeholder:text-black" placeholder="Email" type="text">
              <input class="w-[80%] my-3 py-3 px-4 rounded-tl-3xl rounded-br-xl bg-tertiary placeholder:text-black" placeholder="Password" type="text">
            </form>
            <GoButton class="py-3" type="dark" align="center"/>
            <div class="inline-block font-bold">
              <div class="w-[100%] h-[1px] bg-black my-2"></div>
              Sign in by Google
            </div>
          </div>
        </article>
        <figure class="order-1 pb-10 sm:pb-0 w-[100%] lg:w-[70%] px-8 max-h-[70vw] md:max-h-[45vh] md:mb-6 lg:max-h-[80vh] sm:pl-8">
          <img class="w-[100%] h-[100%] object-contain" :src="signUpComputer" alt="">
        </figure>
      </div>
    </section>
    <MainFooter></MainFooter>
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
      background-size: 100% 74%;
      background-repeat: no-repeat;
      padding-bottom: min(30vw, 10vh);
      @media all and (max-width: 960px) and (orientation: portrait){
        background-size: 100% 78%;
        
      }
    }
    &-bottom {
      background-image: url(~/assets/images/bg-bottom.svg);
      background-size: cover;
      background-position: top center;
    }
  }
  .text {
    &-title {
      @apply font-extrabold text-5xl sm:text-6xl font-sans text-secondary;
    }
    &-subtitle {
      @apply font-extrabold text-3xl sm:text-5xl  font-sans text-secondary;
    }
    &-content {
      @apply text-xs md:text-base font-bold text-secondary;
    }
    &-upper {
      @apply mt-4 sm:mt-9 font-bold text-secondary uppercase text-2xl;
    }
  }
  .container {
    max-width: 1280px;
    margin-inline: auto;
  }
    
  @mixin animate-float($duration, $timing-function) {
    animation: float $duration $timing-function infinite alternate;
    @keyframes float {
      0% {
        transform: translateY(-4%);
      }
      80% {
        transform: translateY(0%);
      }
      100% {
        transform: translateY(5%);
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
    @keyframes #{$direction} {
      0% {
        width: 0;
        #{$direction}: 50%;
      }
      100% {
        width: 50%;
        #{$direction}: 50%;
      }
    }
  }

  .animate-float {
    @include animate-float(3s, linear);
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

  .occupied {
    min-height: calc(min(36vw, 36vh));
    @media all and (max-width: 960px) and (orientation: portrait) {
      min-height: 30vw;
    }
    @media all and (max-width: 600px) and (orientation: portrait) {
      min-height: 48vw;
    }
  }
  .calc-height {
    max-height: calc(min(100vh, 100vw) - 70px);
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
  import platformImg from '~/assets/images/platform.svg';
  import signUpComputer from '~/assets/images/sign-up-computer.svg';


  const underlineL = ref(null);
  const underlineR = ref(null);
  const carousel1 = ref(null);
  const carouselBase = ref(20);
  // const carouselMinHeight = ref(0);

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
    { title: 'Budgets and savings<br>accumulative progression.', src: feature2 },
    { title: 'Expenses threshold setting.', src: feature3 },
    { title: 'Financial analysis visualizing.', src: feature4 },
    { title: 'Considerate notification settings.', src: feature5 },
  ])

  const loopType = 'next';

  const carouselPositions = computed(() => [...Array(features.value.length).keys()]
    .map((item, index) => index === 2 ? carouselBase.value * 2 : index === 0 ? (index - 1) * carouselBase.value : index === 1 ? 0 : 40 + (index - 2) * carouselBase.value));
  const carouselCounter = ref(1);
  const mainIndex = computed(()=> [...Array(features.value.length).keys()]
    .findIndex((index) => (carouselCounter.value + index)%(features.value.length) === 1));

  onMounted(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;800&display=swap'
    document.head.appendChild(link)
    console.log([...Array(features.length).keys()].map((item, index) => (index - 1) * 20))

    // carouselMinHeight.value = carousel1.value[0].offsetHeight
    // console.log(carouselMinHeight.value)
  })

  function changeImgState(index, type) {
    imgState.index = index;
    imgState.state = type;
  }



  watch(mainIndex, (val,oldVa)=>{
    setTimeout(() => {
      // console.log(underlineR.value.classList, underlineL.value.classList)
      underlineR.value.classList.add('r');
      underlineL.value.classList.add('l');
      setTimeout(() => {
        underlineR.value.classList.remove('r');
        underlineL.value.classList.remove('l');
      }, 400);
    }, 0);
  })

</script>