<template>
  <div class="bg-white h-[100%] overflow-hidden">
    <MainHeader
      :currentSectionIndex="currentSectionIndex"
      :isLoggedIn="isLoggedIn"
      @isTriggeredWaveEmit="isTriggeredWaveEmit"
      @scrollTypeEmit="scrollTypeEmit"
      @toAnchorEmit="toAnchorEmit"
      @unableToHoverSectionEmit="unableToHoverSectionEmit"
      @setComponentUserCenterEmit="toUserCenter"/>
    <!-- kv & pp -->
    <section class="bg-top">
      <!-- kv -->
      <main class="section flex flex-wrap min-h-fullvh flex-col sm:flex-row items-center justify-center px-6">
        <div class="w-full lg:w-[60%] md:order-2 lg:order-1 mt-8 sm:pt-16 flex items-center justify-center">
          <img class="w-[70vw] max-h-[55vh]" src="~/assets/images/main-kv.svg" alt="Financial Assets Website helps solving financial issues, such as spending tracking, bills managing, and setting savings goals to fullfill step by step.">
        </div>
        <article class="w-full lg:w-[40%] md:order-1 sm:pt-16 lg:order-2 text-secondary text-center lg:text-left py-8 sm:py-0">
          <h1 class="text-title mb-6">Financial<br />Assistant</h1>
          <h2 class="text-content">
            Tracks your spending<br />for healthy financial affairs.
          </h2>
        </article>
      </main>

      <!-- pain point -->
      <article class="section flex text-center container items-center justify-center pt-16 md:pt-[15vh]">
        <div class="px-4">
          <h2 class="text-subtitle mb-4">We hear your concerns</h2>
          <p class="text-content">Always end up with empty pockets and bank accounts,<br class="hidden sm:block" />  confused about where the money went,<br class="hidden lg:block" /> with plenty of bills waiting in line to be paid.</p>
          <div class="flex flex-column sm:justify-center sm:flex-row flex-wrap pt-10 sm:pt-10 sm:pb-16 md:pt-16"
            @pointerleave.stop="imgState.index = -1">
            <div v-for="({ origin, hovered, description }, index) in painPoints" :key="index"
              class="relative w-full sm:w-[50%] lg:w-[33.33%] calc-height flex items-center justify-center first:pr-6 sm:first:pr-9 not-first:not-last:px-6 sm:not-first:not-last:px-9 sm:last:pl-9 py-3 cursor-help"
              :class="[
                  (index === 0) ? 'order-2 sm:order-1 lg:order-1' : (index === 1) ? 'order-1 sm:order-3 lg:order-2' : 'order-3 sm:order-2'
                ]"
              @pointerenter="changeImgState(index, 'hovered')"
              @pointerleave="changeImgState(index, 'origin')">
              <p v-show="imgState.index === index"
                class="uppercase font-bold text-lg md:text-2xl text-secondary w-[80%] absolute mb-3 ease-in-out duration-1000"
                :class="[
                  (index === 0) || (index === (painPoints.length - 1))
                  ? 'text-left pl-12 sm:pl-15' : 'text-center px-6 sm:px-10',
                  (imgState.index === index) && (imgState.index !== -1) ? 'opacity-100' : 'opacity-0'
                ]" style="z-index:3" v-html="description">
              </p>
              <figure class="relative h-[26vh] md:h-[100%]"
                :class="[ index === 1 || index === (painPoints.length - 1)
                  ? 'translate-x-[5vw] sm:translate-x-0' : '-translate-x-[5vw] sm:translate-x-0' ]" :data-index="index">
                <img class="flex object-contain w-full h-[100%] ease-in-out duration-300 absolute"
                  :class="[
                    (imgState.index === index) && (imgState.index !== -1) ? 'opacity-0' : 'opacity-100',
                    (index === 1) ? '' : 'order-1 sm:order-2',
                  ]"
                  :src="origin" alt="">
                <img class="d-block object-contain w-full h-[100%]"
                  :src="hovered" alt="">
                <img v-show="index === 1" class="absolute object-contain w-full h-[100%] animate-float" style="top: 0; left: 0"
                  :class="[(imgState.index === index) && (imgState.index !== -1) ? 'opacity-0' : 'opacity-100']"
                :src="moneyFly" alt="">
                <img v-show="index === 1" class="absolute object-contain w-full h-[100%]" style="top: 0; left: 0"
                  :class="[(imgState.index === index) && (imgState.index !== -1) ? 'opacity-0' : 'opacity-100']"
                :src="moneyStay" alt="">
              </figure>
            </div>
          </div>
        </div>
      </article>
    </section>

    <!-- carousel -->
    <section class="section relative pt-10 md:mt-[4vh]">
      <div class="w-full h-[6vh]"></div>
      <div class="bg-linear">
        <article class="flex flex-wrap justify-between container pt-5 sm:py-11  px-6 lg:px-6">
        <div class="inline-block sm:w-[50%] lg:w-auto sm:px-2 lg:px-0 order-2 sm:order-1">
          <p class="text-content mt-0 md:translate-y-[10px]">
            Financial Assistant help you deal with your expenses and budgets<br class="hidden sm:block" />
            more efficiently and dounbtless, category system visualizes those unseen<br class="hidden sm:block" />
            and potential over wasted costs.
          </p>
          <div class="text-4xl lg:text-5xl text-secondary mt-3 sm:mt-7 text-right relative z-[3] cursor-pointer">
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
          <img class="w-full h-[100%]" :src="src" alt="">
        </figure>
        <img class="absolute w-[40%] px-[4vw] opacity-80 bottom-[20px] mb-6 sm:mb-0" :src="platformImg">
        <article class="absolute flex justify-center sm:justify-end font-medium h-30 bottom-[20px] w-[calc(60%+12px)] sm:w-[calc(80%+3vw)] md:w-[calc(80%+3vw)] lg:w-full">
          <div class="w-full sm:w-[60%] linear flex justify-center text-center">
            <div class="relative inline-block">
              <div class="text-xs sm:text-sm md:text-xl lg:text-2xl" style="" v-html="features[mainIndex].title"></div>
              <div ref="underlineL" class="absolute -bottom-[2px] h-[1px] bg-black left-[50%] animate-underline"></div>
              <div ref="underlineR" class="absolute -bottom-[2px] h-[1px] bg-black right-[50%] animate-underline"></div>
            </div>
          </div>
        </article>
      </div>
      </div>
      
    </section>
    <!-- <pre>{{ store.$state }}</pre>
    <button @click="store.increment()">add me</button> -->

    <!-- sign in / up -->
    <section class="section bg-bottom min-h-contentvh flex items-center py-6 pt-16 md:pt-[15vh] overflow-visible">
      <div class="container sm:px-6 flex flex-wrap items-stretch pb-6">
        <article class="mx-8 order-2 lg:order-1 sm:w-[68%] lg:w-[30%] sm:mx-auto lg:mx-0 bg-primary rounded-t-full text-center flex flex-wrap items-center justify-center md:mx-auto my-auto min-h-[60vh] lg:min-h-[70vh] w-full">
          <div v-show="!isLoggedIn" class="flex flex-col items-center max-w-[400px]">
            <div class="px-6">
              <h2 class="w-full font-extrabold text-3xl sm:text-4xl text-white mt-3 md:mt-6">Sign up</h2>
              <p class="font-bold text-xs sm:text-base text-white my-4 px-10 md:px-10">Register your personal financial assistant, building wealth wait for no one!</p>
            </div>
            <form class="font-extrabold" action="">
              <input v-model="email" class="w-[80%] my-3 py-3 px-4 rounded-tl-3xl rounded-br-xl bg-tertiary placeholder:text-secondary focus:outline-none focus:border-primary focus:ring-secondary focus:ring-2 focus:bg-tertiary autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)] font-bold sm:text-base md:text-lg" placeholder="Email" type="text" autocomplete="email">
              <input v-model="password" class="w-[80%] my-3 py-3 px-4 rounded-tl-3xl rounded-br-xl bg-tertiary placeholder:text-secondary focus:outline-none focus:border-primary focus:ring-secondary focus:ring-2 focus:bg-tertiary autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)] font-bold sm:text-base md:text-lg" placeholder="Password" type="password" @keyup.enter="registerUser()">
            </form>
            <GoButton class="py-3" type="dark" align="center" @click="registerUser()"/>
            <div class="relative inline-block font-bold cursor-pointer hover:scale-[120%] hover:font-extrabold transition-all duration-200" @click="signInGoogle()">
              <div class="w-full h-[1px] bg-black my-3"></div>
              <span class="absolute -top-[3px] left-[calc(50%-16px)] bg-primary px-2">or</span>
              <span class="transition-all duration-200">Sign in by Google</span>
            </div>
            <!-- <pre>{{ isLoggedIn }}</pre> -->
          </div>
          <div v-show="isLoggedIn" class="max-w-[500px]">
            <div class="px-6">
              <figure class="text-white text-4xl"><font-awesome-icon :icon="['fas', 'address-book']" /></figure>
              <h2 class="w-full font-extrabold text-3xl sm:text-4xl text-white mt-3 md:mt-6">Welcome!</h2>
              <p class="font-bold text-xs sm:text-base text-white my-4 pb-8 px-10 md:px-10 border-b-[1px] border-white">Check out your personal financial assistant, building wealth wait for no one!</p>
              <GoButton class="py-3 mx-auto md:mx-auto" type="dark" align="center" @click="toUserCenter"/>
            </div>
          </div>
        </article>
        <figure class="order-1 pb-10 sm:pb-0 w-full lg:w-[70%] px-8 max-h-[70vw] md:max-h-[45vh] md:mb-6 lg:max-h-[80vh] sm:pl-8">
          <img class="w-full h-[100%] object-contain" :src="signUpComputer" alt="">
        </figure>
      </div>
    </section>
    <!-- <div id="animation"></div> -->
    <MainFooter></MainFooter>
  </div>
</template>
<style lang="scss" scoped>
  :root {
    --header-height: 70px;
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
  /* Styles for placeholder */
  input::placeholder {
    letter-spacing: 1px;
  }

  /* Styles for password value */
  input[type="password"] {
    letter-spacing: 5px;
  }
</style>
<script setup>
  // import Cookies from 'js-cookie'
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia'
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
  import { userAuthStore } from '~/stores/userAuth.js'
  const { $db } = useNuxtApp();
  // import lottie from 'lottie-web';
  // import animationData from '~/assets/lottie/animation.json';
  const authStore = userAuthStore ();
  const { isLoggedIn, currentComponent } = storeToRefs(authStore);
  const { setCurrentComponent, setIsLoggedIn } = userAuthStore();

  const underlineL = ref(null);
  const underlineR = ref(null);
  const carouselBase = ref(20);

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

  const scrollType = ref(null);
  const currentSectionIndex = ref(0);
  let sections = reactive([]);
  const isTriggeredWave = ref(false);
  let unableToHoverSection = ref(false);

  const email = ref('');
  const password = ref('');

  setIsLoggedIn();

  useHead({
    title: 'Financial Assistant 財不會忘記你',
    meta: [
      {
        name: 'description',
        content: 'Financial Assistant 財不會忘記你是一款記錄財務狀況的小幫手，可以對每一筆花費貼上標籤予以歸類，並且透過視覺化資料圖表一目瞭然資金動向；掌握每個期間的支出與收入，設定花費門檻提醒花費的額度，避免過度的開銷。'
      },
      {
        property: 'og:site_name',
        content: 'Financial Assistant 財不會忘記你'
      },
      {
        property: 'og:title',
        content: 'Financial Assistant 財不會忘記你'
      },
      {
        property: 'og:description',
        content: 'Financial Assistant 財不會忘記你是一款記錄財務狀況的小幫手，可以對每一筆花費貼上標籤予以歸類，並且透過視覺化資料圖表一目瞭然資金動向；掌握每個期間的支出與收入，設定花費門檻提醒花費的額度，避免過度的開銷。'
      },
      
    ],
    link: [{ rel: 'icon', type: 'image/svg', href: "/favicon.svg" }]
  })

  onMounted(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;800&display=swap'
    document.head.appendChild(link)
    sections = document.querySelectorAll('.section');
    // console.log([...Array(features.length).keys()].map((item, index) => (index - 1) * 20))
    // const container = document.getElementById('animation');
    // const anim = lottie.loadAnimation({
    //   container: container,
    //   renderer: 'svg',
    //   loop: true,
    //   autoplay: true,
    //   animationData: animationData,
    // });
    sectionObserver ();

  })

  function changeImgState(index, type) {
    imgState.index = index;
    imgState.state = type;
  }

  watch(mainIndex, (val,oldVal)=>{
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

  function scrollTypeEmit (direction) {
    // console.log('direction', direction)
    scrollType.value = direction.value;
  }

  function sectionObserver () {
    // const opt = { rootMargin: '50px 0px 50px 0px' }
    const opt = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };
    const observer = new IntersectionObserver(entries => {
     entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const rect = target.getBoundingClientRect();
        currentSectionIndex.value = Array.from(sections).indexOf(target);
        // console.log('confusingIndex', index, 'correctIndex', Array.from(sections).indexOf(target));
        if (isTriggeredWave.value === false && unableToHoverSection.value === false) 
          window.scrollTo({
            top: rect.top + window.pageYOffset,
            left: 0,
            behavior: 'smooth'
          });
      }  
     })
    }, opt);

    sections.forEach((section, index) =>  {
      observer.observe(section);
    });

  }

  function toAnchorEmit (index) {
    sections[index].scrollIntoView({
      behavior: 'smooth'
    });
  }
  
  function isTriggeredWaveEmit (boolean) {
    isTriggeredWave.value = boolean;
  }
  function unableToHoverSectionEmit (boolean) {
    unableToHoverSection.value = boolean;
  }

  async function registerUser () {
    const credentials = await register($db, email.value, password.value);
    await console.log('credentials', credentials)
  }

  async function signInGoogle () {
    const credentials = await signInByGoogle ();
    await console.log('credentials', credentials)
  }

  function toUserCenter () {
    setCurrentComponent ('userCenter');
  }

</script>