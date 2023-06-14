<template>
    <section class="w-[100%] h-[100vh] bg-primary flex">
        <nav class="sm:w-[15%] sm:h-[100vh] min-w-[200px]">
            <img class="m-[25px] w-[64px]" :src="logoWhite" alt="">
            <div class="w-[100%] flex flex-col justify-center items-center">
                <figure class="rounded-full bg-white w-[82px] h-[82px] overflow-hidden">
                    <img :src="avatar" alt="">
                </figure>
                <strong class="text-black mt-3">Hi, Jamie Xie</strong>
                <section class="w-[100%] h-[90px] bg-secondary my-[38px] relative after:content-[''] after:absolute after:w-[5px] after:h-[100%] after:rounded-r-full after:z-10 after:-right-[5px] after:top-0 after:bg-secondary border-b-[1px] border-white"></section>
            </div>
        </nav>
        <main class="sm:w-[85%] sm:h-[100vh] bg-white rounded-l-[50px] relative">
            <div class="w-[40px] h-[40px] rounded-full bg-white absolute -left-[20px] top-[76px] flex justify-center items-center">
                <figure class="w-[24px] h-[24px]">
                    <font-awesome-icon class="w-[100%] h-[100%] object-contain text-[24px] text-secondary" :icon="['fas', 'circle-arrow-left']" />
                </figure>
            </div>
        </main>
    </section>
</template>
<style lang="scss"></style>
<script setup>
    import logoWhite from '~/assets/images/logo-w.svg';
    import avatar from '~/assets/images/avatar.jpeg'
</script>