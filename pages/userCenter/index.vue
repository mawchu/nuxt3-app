<template>
    <section class="w-[100%] h-[100vh] bg-primary flex">
        <nav class="sm:h-[100vh] flex flex-col justify-between items-center transition-all duration-300 w-[50px] sm:w-[84px]"
            :class="[ toggleMenu ? '' : 'sm:w-[15%] min-w-[200px] xl:min-w-[260px] fixed top-0 left-0 z-[7] sm:relative h-[100vh] bg-primary' ]">
         
            <figure class="w-[100%] cursor-pointer" @click="toHome">
                <img class="m-[8px] sm:m-[20px] transition-all duration-300"
                    :class="[ toggleMenu ? 'w-[36px] sm:w-[46px]' : 'w-[64px]' ]" :src="logoWhite" alt="">
            </figure>
            <section class="w-[100%] pb-10">
                <article class="w-[100%] flex flex-col justify-center items-center">
                    <figure class="rounded-full bg-white overflow-hidden transition-all duration-300"
                    :class="[ toggleMenu ? 'w-[34px] h-[34px] sm:w-[50px] sm:h-[50px]' : 'w-[82px] h-[82px]' ]">
                        <img class="w-[100%] h-[100%] object-cover" :src="avatar" alt="">
                    </figure>
                    <strong class="text-black mt-3 md:text-xl md:font-extrabold"
                    :class="[ toggleMenu ? 'opacity-0 hidden' : 'opacity-100' ]">Hi, Jamie Xie</strong>
                </article>
                    
                <section class="w-[100%] flex flex-col mt-[20px] sm:my-[38px] text-l">
                    <article v-for="({ title, icon, isActive }, index) in menuList" :key="index"
                    class="w-[100%] h-[90px] text-white relative after:content-[''] after:absolute after:w-[5px] after:h-[100%] after:rounded-r-full after:z-[2] after:-right-[5px] after:top-0  border-b-[1px] border-white flex justify-center items-center cursor-pointer hover:bg-secondary transition-all duration-300 after:transition-all after:duration-300"
                    :class="[
                        isActive ? 'bg-quaternary after:bg-quaternary  hover:after:bg-secondary' : ''
                    ]">
                        <font-awesome-icon class="text-xl" :icon="icon" />
                        <span class="mx-4 text-center text-lg font-bold md:text-xl md:font-extrabold transition-all duration-300 leading-5"
                        :class="[ toggleMenu ? 'opacity-0 absolute' : 'opacity-100' ]" v-html="title">
                        </span>
                    </article>
                </section>
            </section>
            <client-only>
                <p class="text-xs font-semibold text-white text-center my-2"
                :class="[ toggleMenu ? 'opacity-0' : 'opacity-100' ]">Copyright © {{ dayjs().year() }} Financial Assistant.</p>
            </client-only>
            

        </nav>
        <main class="sm:h-[100vh] bg-white rounded-l-[10px] sm:rounded-l-[30px] lg:rounded-l-[50px] relative transition-all duration-300 flex flex-col py-[20px] md:py-[30px] w-[100%] sm:w-[calc(100%-84px)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 scrollbar-rounded-lg"
            :class="[ toggleMenu ? 'sm:w-[calc(100%-84px)] px-[18px] lg:px-[3vw] xl:px-[4vw]' : 'sm:w-[85%] px-[3vw]' ]">
            <div class="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full bg-white fixed z-[8] top-[76px] flex justify-center items-center cursor-pointer group transition-all duration-75"
                :class="[ toggleMenu ? 'left-[35px] sm:left-[64px]' : 'left-[185px] md:left-[180px] xl:left-[240px]' ]"
                @click="toggleMenu = !toggleMenu">
                <figure class="w-[20px] h-[20px] md:w-[24px] md:h-[24px]">
                    <font-awesome-icon :class="[ toggleMenu ? 'rotate-180' : '' ]" class="w-[100%] h-[100%] object-contain text-[18px] md:text-[24px] text-secondary group-hover:text-black  transition-all duration-300"
                        :icon="['fas', 'circle-arrow-left']" />
                </figure>
            </div>
            <section class="w-[100%] lg:h-[42%] rounded-[12px] md:rounded-[20px] lg:rounded-[50px]  bg-linear flex flex-wrap xl:flex-nowrap">
                <div class="w-[100%] lg:w-[48%] lg:h-[100%] p-[16px] md:p-[24px] xl:pt-[33px] xl:py-[26px] xl:pl-[50px]">
                    <article class="text-xl md:text-2xl  lg:h-[100%] flex flex-col">
                        <div class="mb-4 md:mb-5 xl:mb-6">
                            <font-awesome-icon :icon="['fa-regular', 'fa-calendar-days']" />
                            <span class="mx-2 md:mx-4 text-center font-extrabold transition-all duration-300">
                                Monthly Spending
                            </span>
                        </div>
                        <div class="flex flex-wrap items-stretch lg:flex-nowrap flex-1">
                            <div class="w-[100%] md:w-[calc(50%-10px)] mb-[20px] md:mb-0 md:mr-[10px] h-[100%] flex flex-col justify-between rounded-[30px] border-[4px] border-quaternary p-[20px]">
                                <div class="w-[100%] flex justify-between">
                                    <p class="text-sm sm:text-base  font-semibold text-[#9a9a9a] leading-[16px] sm:leading-[14px] lg:leading-[18px]">{{ monthToName(dayjs().month(), 3) }} {{ dayjs().year() }}<br>Total Amount</p>
                                    <font-awesome-icon class="text-secondary text-3xl" :icon="['fa-solid', 'fa-ellipsis']" />
                                </div>
                                <div class="font-extrabold text-secondary mt-[10px] md:mt-[20px]">
                                    <span class="border-b-4 border-secondary">NTD</span>
                                    <div class="mt-4 w-[100%] flex justify-between">
                                        <span>$</span>
                                        <span class="text-3xl xl:text-4xl">12,345</span>
                                    </div>
                                </div>
                            </div>
                            <div class="w-[100%] md:w-[calc(50%-10px)] md:ml-[10px] flex flex-col justify-between rounded-[30px] border-[4px] border-quaternary p-[20px]">
                                <div class="w-[100%] flex justify-between">
                                    <p class="text-sm sm:text-base  font-semibold text-[#9a9a9a] leading-[16px] sm:leading-[14px] lg:leading-[18px]">Numbers of<br>Spending<br>Records</p>
                                    <font-awesome-icon class="text-secondary text-3xl" :icon="['fa-solid', 'fa-ellipsis']" />
                                </div>
                                <div class="font-extrabold text-secondary text-right">
                                    <span class="text-5xl">54</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <div class="w-[100%] lg:w-[52%] lg:h-[100%] p-[16px] pr-0 pb-0 md:p-x[24px] md:pr-0 xl:pt-[33px] xl:pl-[25px]">
                    <article class="text-xl md:text-2xl  w-[100%] h-[100%] flex flex-col rounded-br-[50px]">
                        <div class="mb-4 md:mb-5 xl:mb-6">
                            <font-awesome-icon icon="fa-solid fa-clock" />
                            <span class="mx-2 md:mx-4 text-center font-extrabold transition-all duration-300">
                                Recently Spending
                            </span>
                        </div>
                        <div class="w-[100%] lg:w-[100%] lg:pr-6 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 scrollbar-rounded-lg">
                            <div class="w-[100%] lg:w-[100%] max-h-[600px] sm:h-[320px] pr-4 lg:pr-0">
                                <div v-for="(item, index) in 10" :key="index" class="rounded-[30px] bg-white w-[100%] md:h-[70px] flex flex-wrap md:flex-nowrap mb-[10px]">
                                    <div class="text-xs sm:text-base text-[#9a9a9a] font-semibold flex items-center h-[calc(100%-30px)] justify-between w-[100%] md:w-[55%] m-[15px] mr-0 mb-0 md:mb-[15px] md:border-r-[1px] border-secondary">
                                        <p>
                                            2023.07.21<br>
                                            泰舍晚餐
                                        </p>
                                        <font-awesome-icon
                                            class="text-xl md:text-3xl text-secondary mr-[15px] border-b-[1px] md:border-b-0 border-secondary pb-[8px] sm:pb-[15px] md:pb-0 md:mb-0"
                                            :icon="['fa-solid', 'fa-burger']" />
                                    </div>
                                    <div class="text-2xl sm:text-3xl text-secondary font-black flex items-center h-[100%] justify-between w-[100%] md:w-[45%] p-[15px]">
                                        <p>$</p>
                                        <span>1,234</span>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </article>
                </div>
                
            </section>
            <section class="w-[100%] h-[calc(54%-8px)] md:h-[calc(54%-30px)] flex flex-wrap mt-[8px] md:mt-[30px]">
                <div class="w-[100%] lg:w-[calc(38%-0.75rem)] rounded-[12px] md:rounded-[20px] lg:rounded-[50px] bg-linear lg:mr-3 mt-4 md:mt-0">
                    <article class="h-[100%] text-xl md:text-2xl p-[16px] md:p-[24px] xl:py-[26px] xl:px-[50px]">
                        <div class="h-[100%] flex flex-col">
                            <h3 class="flex justify-start">
                                <font-awesome-icon :icon="['fas', 'ranking-star']" />
                                <span class="mx-2 md:mx-4 font-extrabold transition-all duration-300">
                                    Category Rating
                                </span>
                            </h3>
                            <div class="relative flex items-center" style="flex: 1 1 auto">
                                <v-chart ref="chartsPie" class="w-[100%] h-[300px] py-4" :option="pieOption" />
                                <div class="absolute bottom-[5%] left-0 w-[30px] flex flex-col">
                                    <div v-for="(index) in 5" :key="index" class="w-[15px] h-[15px] rounded-full my-1 hover:my-3" :style="`background-color: ${colors[index]}`"></div>
                                </div>
                            </div>
                            
                        </div>
                    </article>
                </div>
                <div class="w-[100%] lg:w-[calc(62%-0.75rem)] rounded-[12px] md:rounded-[20px] lg:rounded-[50px]  bg-linear lg:ml-3 mt-[24px] lg:mt-0">
                    <article class="h-[100%] text-xl md:text-2xl  p-[16px] md:p-[24px] xl:py-[26px] xl:px-[50px]">
                        <div class="h-[100%] flex flex-col">
                            <h3>
                                <font-awesome-icon :icon="['fas', 'chart-area']" />
                                <span class="mx-2 md:mx-4 text-center font-extrabold transition-all duration-300">
                                    Daily Spending Amount
                                </span>
                            </h3>
                            <div ref="wrapperChartsLine" class="flex items-center" style="flex: 1 1 auto">
                                <v-chart ref="chartsLine" class="w-[100%] h-[300px] py-4" :width="chartsLineWidth" :option="lineOption" />
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <button class="w-[45px] h-[45px] sm:w-[65px] sm:h-[65px] rounded-full drop-shadow-lg fixed right-[18px] bottom-[18px] z-[9] flex justify-center items-center transition-all duration-200 hover:scale-125"
                :class="[ modalShow ? 'border-2 border-black bg-white opacity-10' : 'border-3 border-transparent bg-black' ]" 
                @click="modalShow = !modalShow">
                <font-awesome-icon class="text-xl sm:text-3xl ml-2" :class="[ !modalShow ? 'text-white' : 'text-black' ]" :icon="['fas', 'file-pen']" />
            </button>

            <!-- 新增花費 -->
            <dialog class="fixed w-[calc(100%-20px)] sm:w-[90%] lg:w-[max(80%,800px)] xl:w-[960px] h-[96vh] sm:h-[80vh] top-[2vh] sm:top-[10vh] drop-shadow-lg rounded-[max(3vw,3vh)] z-10 bg-white flex flex-col md:flex-row p-0 transition-all duration-200" :class="[ modalShow ? '' : 'opacity-0 pointer-events-none' ]" @click="categoryDrop = false">
                <font-awesome-icon class="text-secondary absolute left-[25px] top-[20px] text-4xl cursor-pointer hover:scale-125 hover:text-black transition-all duration-200" :icon="['fas', 'xmark']" 
                    @click="modalShow = false"/>
                <img class="absolute w-[70px] md:w-[136px] left-[15%] -bottom-[10px] md:left-[calc(100%-110px)] md:bottom-[8%] z-[11]" :src="lifebuoy" alt="">
                <img class="absolute w-[30px] md:w-[60px] left-[5%] bottom-[calc(26%-60px)] md:left-[calc(60%-20px)] lg:left-[calc(50%-20px)] md:top-[22%] z-[11]" :src="beachball" alt="">
                <div class="w-[100%] h-[100%] rounded-[max(3vw,3vh)] overflow-hidden flex flex-col md:flex-row">
                    <div class="w-[100%] md:w-[60%] lg:w-[50%] h-[78%] md:h-[100%] flex items-center justify-center">
                        <div class="w-[90%]">
                            <h2 class="text-center font-extrabold text-xl md:text-2xl text-black pt-[14px]">Add a spending</h2>
                            <div class="w-[40%] mx-auto my-5 border-b-[1px] border-black"></div>
                            <form class="max-w-[500px] px-3 md:px-4 lg:px-6 mx-auto h-[100%] flex flex-wrap justify-center" @submit.prevent="">
                                <!-- 日期 -->
                                <label class="relative flex w-[100%] items-center justify-end py-2" for="date">
                                    <div class="flex flex-shrink-0 justify-end text-right font-bold text-black" role="label"
                                        :class="mobileLabelWidth">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl" :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Date </span>
                                            <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">日期</span>
                                        </h3>
                                    </div>
                                    <input v-model="submitSpending.date" class="validInputplaceholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 font-bold sm:text-base md:text-lg"
                                    :class="mobileInputWidth" type="text" name="date"
                                    :placeholder="deviceWidth < mobileFormBreakpointSm ? '日期：' : 'YYYY/MM/DD'"
                                    @keyup="validInput('date')"/>
                                </label>
                                
                                <!-- 項目 -->
                                <label class="relative flex w-[100%] items-center py-2" for="item">
                                    <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                        :class="mobileLabelWidth">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl" :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Item </span>
                                            <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">項目</span>
                                        </h3>
                                    </div>
                                    <input v-model="submitSpending.item" class="validInputplaceholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 font-bold sm:text-base md:text-lg"  :class="mobileInputWidth" :placeholder="deviceWidth < mobileFormBreakpointSm ? '項目：' : '輸入項目...'" type="text" name="item"
                                    @keyup="validInput('item')"/>
                                </label>
                                <!-- 類別 -->
                                <label class="relative flex w-[100%] items-center justify-end py-2" for="category">
                                    <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                        :class="mobileLabelWidth">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl" :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Category </span>
                                            <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">類別</span>
                                        </h3>
                                    </div>
                                    <!-- 自訂類別 -->
                                    <input v-model="submitSpending.category"
                                        class="validInputplaceholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 font-bold sm:text-base md:text-lg disabled:placeholder:text-[#ccc] disabled:bg-white"
                                        :class="[
                                            (deviceWidth < mobileFormBreakpointSm) && categoryDisabled
                                                ? 'w-[55%]' : (deviceWidth > mobileFormBreakpointSm) && categoryDisabled
                                                ? 'w-[calc(75%-120px)]' : (!categoryDisabled) ? 'w-[100%]' : ''
                                        ]"
                                        :placeholder="deviceWidth < mobileFormBreakpointSm ? '類別：' : '新增類別...'" type="text" name="category" :disabled="categoryDisabled"
                                        @blur="categoryDisabled = true"
                                        @click.stop="categoryDisabled = false"
                                        @keyup="validInput('category')"/>
                                        <font-awesome-icon class="absolute top-[calc(50%-8px)] z-[3] cursor-pointer hover:text-secondary hover:scale-125 transition-all duration-200"
                                        :class="[
                                            categoryDisabled ? 'rotate-45' : '',
                                            (deviceWidth < mobileFormBreakpointXs) && !(categoryDisabled)
                                                ? 'left-[calc(55%-30px)]' : deviceWidth < mobileFormBreakpointSm && !(categoryDisabled)
                                                ? 'left-[calc(35%+80px)]' : (categoryDisabled) ? 'right-[32%]' : 'right-[12px]',
                                        ]" :icon="[categoryDisabled ? 'fas' : 'far', 'circle-xmark']" @click="categoryDisabled = !categoryDisabled"/>
                                    <!-- 預設類別 -->
                                    <div class="relative ml-2"
                                        :class="[ 
                                            deviceWidth < mobileFormBreakpointSm ? 'w-[45%]' : 'w-[35%]',
                                            categoryDisabled ? '' : 'hidden'
                                        ]">
                                        
                                        <button class="w-[100%] h-[40px] sm:h-[38px] bg-[#eee] rounded-full active:border-primary active:border-2 text-sm md:text-lg pl-2 flex justify-start items-center border-2 border-transparent" @click.stop="categoryDrop = !categoryDrop">
                                            <span>{{ targetCategory.title ? targetCategory.title :'選擇' }}</span>
                                            <font-awesome-icon class="absolute right-[10px] top-[calc((38px/2)-8px)] transition-all duration-200" :class="[ categoryDrop ? 'rotate-180' : '' ]"
                                                :icon="['fas', 'caret-down']" />
                                        </button>
                                        <ul v-if="categoryDrop" class="absolute w-[100%] top-[38px] left-0 bg-[#eee] rounded-[10px] z-[5] overflow-hidden text-sm md:text-lg border-2 border-[#ccc]" @click="categoryDrop = false">
                                            <li v-for="({title, value, icon}, index) in categoryDefaultList" :key="index"
                                                class="h-[38px] px-2 flex items-center justify-between hover:bg-quaternary hover:text-white"
                                                :class="[ value === targetCategory.value ? 'bg-primary' : '' ]"
                                                @click="changeCategory({
                                                    title, value
                                                })">
                                                
                                                {{ title }}
                                                <font-awesome-icon class="text-[#999]" :icon="icon"></font-awesome-icon>
                                            </li>
                                        </ul>
                                    </div>
                                </label>
                                <!-- 金額 -->
                                <label class="relative flex w-[100%] items-center py-2" for="amount">
                                    <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                        :class="mobileLabelWidth">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl" :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Amount </span>
                                            <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">金額</span>
                                        </h3>
                                    </div>
                                    <span class="absolute left-[150px] text-black font-bold"
                                        :class="[
                                            deviceWidth < mobileFormBreakpointXs
                                                ? 'left-[15px]' : deviceWidth < mobileFormBreakpointSm
                                                ? 'left-[105px]' : 'left-[150px]'
                                        ]">$</span>
                                    <input v-model="submitSpending.amount" class="validInputplaceholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-medium block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 font-bold sm:text-base md:text-lg text-right"  :class="mobileInputWidth" :placeholder="deviceWidth < mobileFormBreakpointSm ? '金額' : '輸入金額...'" type="text" name="amount"
                                    @keyup="validInput('amount')"/>
                                </label>
                                <!-- 備註 -->
                                <label class="relative flex w-[100%] items-center justify-end py-2" for="memo">
                                    <div class="flex flex-shrink-0 justify-end text-right font-bold text-black "
                                        :class="mobileLabelWidth">
                                        <h3>
                                            <span class="font-bold text-lg sm:text-xl" :class="[ deviceWidth < mobileFormBreakpointXs ? 'hidden' : '' ]">Memo </span>
                                            <span class="text-sm" :class="[ deviceWidth < mobileFormBreakpointSm ? 'hidden' : '' ]">備註</span>
                                        </h3>
                                    </div>
                                    <textarea v-model="submitSpending.memo" class="validInputplaceholder:text-[#999] placeholder:text-sm placeholder:md:text-base placeholder:font-semibold block bg-[#eee] border rounded-[20px] py-1 pl-4 pr-3 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 font-bold sm:text-base md:text-lg"  :class="mobileInputWidth"  rows="5" placeholder="輸入備註..." type="text" name="memo"
                                    @keyup="validInput('memo')"/>
                                </label>
                                <p v-if="validInformation" class="w-[100%] h-[20px] text-right font-bold text-secondary">
                                    <font-awesome-icon
                                        class="ml-2" :icon="['fas', 'triangle-exclamation']" />
                                    {{ validInformation }}
                                </p>
                                <button class="w-[150px] h-[50px] rounded-full text-xl md:text-2xl font-bold text-white bg-black mt-4 sm:mt-6 border-2 border-transparent hover:border-secondary hover:bg-white hover:text-secondary transition-all duration-200 z-10 disabled:bg-[#ddd] disabled:hover:border-transparent disabled:text-[#aaa]" :disabled="!validForm"
                                @click.prevent="submitSpendingAction ()">Done</button>
                            </form>
                        </div>
                    </div>
                    <div class="w-[100%] md:w-[40%] lg:w-[50%] h-[22%] md:h-[100%] relative">
                        <span class="absolute hidden md:block md:text-2xl text-center font-extrabold text-white left-[18%] top-[calc(30%-80px)]">Every<br/>spending<br>is the<br/>footprint of <br/>living =)</span>
                        <img class="w-[100%] h-[100%] object-cover hidden md:block" :src="popupBeach" alt="">
                        <img class="w-[100%] h-[100%] object-cover md:hidden" :src="popupBeachM" alt="">
                    </div>
                </div>
                
            </dialog>
            <div class="fixed top-0 left-0 w-[100%] h-[100vh] flex animate z-[100] pointer-events-none"
                :class="[ submitSpendingFinish ? ' money' : '' ]">
                <figure class="w-[50%] h-[100%]">
                    <img class="w-[100%] h-[100%] object-contain object-left" :src="moneyBubbleL" alt="">
                </figure>
                <figure class="w-[50%] h-[100%]">
                    <img class="w-[100%] h-[100%] object-contain object-right" :src="moneyBubbleR" alt="">
                </figure>
            </div>
            <div class="w-[100%] h-[100vh] bg-[rgba(95,57,47,.6)] fixed sm:z-[9] top-0 left-0 transition-all duration-200"
                :class="[
                    modalShow || (!(toggleMenu) && deviceWidth <= 600) ? '' : 'opacity-0 pointer-events-none',
                    !(toggleMenu) && deviceWidth <= 600 ? 'z-[2]' : 'z-[9]',
                ]"
                @click="toggleMenu = true">
            </div>
            
        </main>
    </section>
</template>
<style lang="scss" scoped>
    .scrollbar-color {
        scrollbar-color: blue red;
    }

    .bg {
        &-linear {
        background: linear-gradient(135deg, rgba(232,255,220,1) 52%, rgba(252,247,172,0.46) 100%);
        background-size: cover;
        background-repeat: no-repeat;
        }
    }
    .animate {
        opacity: 0;
        &.money {
            
            animation-name: bubbleFly;
            animation-duration: 3s;
            animation-fill-mode: forwards;
            animation-timing-function: ease-in-out;
        }
    }

    @keyframes bubbleFly {
        0% {
            transform: translateY(200vh);
            opacity: 1;
        }

        96% {
            transform: translateY(-100vh);
            opacity: 1;
        }

        100% {
            transform: translateY(-100vh);
            opacity: 0;
        }
    }
</style>
<script setup>
    import * as dayjs from 'dayjs'
    import Please from 'pleasejs'
    import logoWhite from '~/assets/images/logo-w.svg';
    import avatar from '~/assets/images/avatar.jpeg';
    import popupBeach from '~/assets/images/popup.svg';
    import popupBeachM from '~/assets/images/popup-m.svg';
    import lifebuoy from '~/assets/images/lifebuoy.png';
    import beachball from '~/assets/images/beachball.png';
    import moneyBubbleL from '~/assets/images/money-bubbles-l.svg';
    import moneyBubbleR from '~/assets/images/money-bubbles-r.svg';

    import { userAuthStore } from '~/stores/userAuth.js';
    import { storeToRefs } from 'pinia'
    import { categoryDefaultList, regexMap } from '~/globalDatas';
    import { use } from "echarts/core";
    import { CanvasRenderer } from "echarts/renderers";
    import { PieChart, LineChart } from "echarts/charts";
    import {
        TitleComponent,
        TooltipComponent,
        LegendComponent,
        GridComponent
    } from "echarts/components";
    import VChart from "vue-echarts";
    import { graphic } from 'echarts/lib/echarts'
    import { UniversalTransition } from 'echarts/features';

    use([
        CanvasRenderer,
        PieChart,
        LineChart,
        TitleComponent,
        TooltipComponent,
        LegendComponent,
        GridComponent,
        UniversalTransition
    ]);

    const colors = Please.make_scheme(
        {
            h: 13,
            s: .45,
            v: .92
        },
        {
            colors_returned: 10,
            scheme_type: 'analogous',
            format: 'hex'
        }
    );

    const lineOption = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '0',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {
                rotate: 45
            },
            data: ['2023/07/01', '2023/07/01', '2023/07/01', '2023/07/01', '2023/07/01', '2023/07/01', '2023/07/01', '2023/07/01', '2023/07/01', '2023/07/01', '2023/07/01']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 932, 450, 934, 234, 820, 660, 120, 932, 450, 934],
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 5,
                    color: '#FBA47E'
                },
                areaStyle: {
                    opacity: 0.8,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(251, 164, 126)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(251, 164, 126, .1)'
                    }
                    ])
                }
            }
        ]
    };

    const pieOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: 'Traffic Sources',
            type: 'pie',
            radius: ['50%', '95%'],
            center: ['58%', '50%'],
            itemStyle: {
                borderColor: '#E9FFDD',
                borderWidth: 6
            },
            label: {
                show: false,
                position: 'center'
            },
            data: [
              { value: 335, name: 'Direct', itemStyle: { color: colors[0] } },
              { value: 310, name: 'Email' , itemStyle: { color: colors[1] }},
              { value: 234, name: 'Ad Networks', itemStyle: { color: colors[2] } },
              { value: 135, name: 'Video Ads', itemStyle: { color: colors[3] } },
              { value: 1548, name: 'Search Engines', itemStyle: { color: colors[4] } },
            ],
            // emphasis: {
            //   itemStyle: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)',
            //   },
            // },
          },
        ],
    };


    const authStore = userAuthStore ();
    const { setCurrentComponent } = userAuthStore();
    const mobileInputWidth = ref(null);
    const mobileLabelWidth = ref(null);
    const mobileFormBreakpointSm = ref(480);
    const mobileFormBreakpointXs = ref(360);

    const modalShow = ref(false);
    const toggleMenu = ref(false);
    const categoryDrop = ref(false);
    const menuList = ref([
        { title: 'Overview', icon: ['fa-solid', 'fa-layer-group'], isActive: true },
        { title: 'Spending<br>Records', icon: ['fas', 'clipboard-list'], isActive: false },
        { title: 'Analytics<br>Charts', icon: ['fas', 'chart-pie'], isActive: false }
    ]);
    
    const deviceWidth = ref(0);
    const targetCategory = reactive({
        title: '', value: ''
    });
    const chartsPie = ref(null);
    const chartsLine = ref(null);
    const wrapperChartsLine = ref(null);
    const chartsLineWidth = ref(0);
    const categoryDisabled = ref(true);
    const submitSpending = reactive({
        date: '',
        item: '',
        category: '',
        amount: 0,
        memo: ''
    });
    const submitSpendingFinish = ref(false);
    const validInformation = ref('');
    const validForm = ref(true);

    onMounted(() => {
        deviceWidth.value = window.innerWidth;
        chartsLineWidth.value = wrapperChartsLine.value.clientWidth;
        responsiveFormWidth ();

        window.addEventListener('resize', () => {
            deviceWidth.value = window.innerWidth;
            if (deviceWidth.value < 360) toggleMenu.value = true;
            responsiveFormWidth ();
            resizeCharts ();
        })
    })

    function toHome () {
        setCurrentComponent ('home');
    }

    function changeCategory ({
        title, value
    }) {
        targetCategory.title = title;
        targetCategory.value = value;
    }

    function monthToName (number, length) {
        const monthMap = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        return monthMap[number].substring(0, length) ;
    }

    function resizeCharts () {
        chartsLineWidth.value = wrapperChartsLine.value.clientWidth;
        setTimeout(() => {
            chartsPie.value.resize ();
            chartsLine.value.resize ();
        },0)
    }

    watch(toggleMenu, (val,oldVal)=>{
        console.log
        resizeCharts ();
    })


   
    function responsiveFormWidth () {
        mobileInputWidth.value = deviceWidth.value < mobileFormBreakpointXs.value
            ? 'w-[100%]' : deviceWidth.value < mobileFormBreakpointSm.value
            ? 'w-[calc(100%-76px)]' : 'w-[calc(100%-120px)]';
        mobileLabelWidth.value = deviceWidth.value < mobileFormBreakpointXs.value
            ? 'w-0' : deviceWidth.value < mobileFormBreakpointSm.value
            ? 'w-[77px] mr-4' : 'w-[120px] mr-4';
    }

    const regexTester = (regex, value) => regex.test(value);

    function submitSpendingAction () {
        submitSpendingFinish.value = true;
        Object.keys(submitSpending).forEach((value) => console.log(value))
        setTimeout(() => submitSpendingFinish.value = false, 3000)
    }
    
    function validInput (type) { 
        const { regex } = regexMap[type];
        if(!regexTester(regex, submitSpending[type])) validInformation.value = `${regexMap[type].name}格式有誤，或字數太少`;
        if(regexTester(regex, submitSpending[type])) validInformation.value = ``;
    }

</script>