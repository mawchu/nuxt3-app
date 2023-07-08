<template>
     <section class="w-full lg:h-[42%] rounded-[12px] md:rounded-[20px] lg:rounded-[50px]  bg-linear flex flex-wrap xl:flex-nowrap">
        <div class="w-full lg:w-[48%] lg:h-[100%] p-[16px] md:p-[24px] xl:pt-[33px] xl:py-[26px] xl:pl-[50px]">
            <article class="text-xl md:text-2xl  lg:h-[100%] flex flex-col">
                <div class="mb-4 md:mb-5 xl:mb-6">
                    <font-awesome-icon :icon="['fa-regular', 'fa-calendar-days']" />
                    <span class="mx-2 md:mx-4 text-center font-extrabold transition-all duration-300">
                        Monthly Spending
                    </span>
                </div>
                <div class="flex flex-wrap items-stretch lg:flex-nowrap flex-1">
                    <div class="w-full md:w-[calc(50%-10px)] mb-[20px] md:mb-0 md:mr-[10px] h-[100%] flex flex-col justify-between rounded-[30px] border-[4px] border-quaternary p-[20px]">
                        <div class="w-full flex justify-between">
                            <p class="text-sm sm:text-base  font-semibold text-[#9a9a9a] leading-[16px] sm:leading-[14px] lg:leading-[18px]">{{ monthToName(dayjs().month(), 3) }} {{ dayjs().year() }}<br>Total Amount</p>
                            <font-awesome-icon class="text-secondary text-3xl" :icon="['fa-solid', 'fa-ellipsis']" />
                        </div>
                        <div class="font-extrabold text-secondary mt-[10px] md:mt-[20px]">
                            <span class="border-b-4 border-secondary">NTD</span>
                            <div class="mt-4 w-full flex justify-between">
                                <span>$</span>
                                <span class="text-3xl xl:text-4xl">12,345</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-[calc(50%-10px)] md:ml-[10px] flex flex-col justify-between rounded-[30px] border-[4px] border-quaternary p-[20px]">
                        <div class="w-full flex justify-between">
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
        <div class="w-full lg:w-[52%] lg:h-[100%] p-[16px] pr-0 pb-0 md:p-x[24px] md:pr-0 xl:pt-[33px] xl:pl-[25px]">
            <article class="text-xl md:text-2xl  w-full h-[100%] flex flex-col rounded-br-[50px]">
                <div class="mb-4 md:mb-5 xl:mb-6">
                    <font-awesome-icon icon="fa-solid fa-clock" />
                    <span class="mx-2 md:mx-4 text-center font-extrabold transition-all duration-300">
                        Recently Spending
                    </span>
                </div>
                <div class="w-full lg:w-full lg:pr-6 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 scrollbar-rounded-lg">
                    <div class="w-full lg:w-full max-h-[600px] sm:h-[320px] pr-4 lg:pr-0">
                        <div v-for="(item, index) in 10" :key="index" class="rounded-[30px] bg-white w-full md:h-[58px] flex flex-wrap md:flex-nowrap mb-[10px]">
                            <div class="text-xs sm:text-sm text-[#9a9a9a] font-semibold flex items-center h-[calc(100%-30px)] justify-between w-full md:w-[55%] m-[15px] mr-0 mb-0 md:mb-[15px] md:border-r-[1px] border-secondary">
                                <p>
                                    2023.07.21<br>
                                    泰舍晚餐
                                </p>
                                <font-awesome-icon
                                    class="text-xl md:text-2xl text-secondary mr-[15px] border-b-[1px] md:border-b-0 border-secondary pb-[8px] sm:pb-[15px] md:pb-0 md:mb-0"
                                    :icon="['fa-solid', 'fa-burger']" />
                            </div>
                            <div class="text-2xl sm:text-2xl text-secondary font-black flex items-center h-[100%] justify-between w-full md:w-[45%] p-[15px]">
                                <p>$</p>
                                <span>1,234</span>
                            </div>
                        </div>
                    </div> 
                </div>
            </article>
        </div>
        
    </section>
    <section class="w-full h-[calc(54%-8px)] md:h-[calc(54%-30px)] flex flex-wrap mt-[8px] md:mt-[30px]">
        <div class="w-full lg:w-[calc(38%-0.75rem)] rounded-[12px] md:rounded-[20px] lg:rounded-[50px] bg-linear lg:mr-3 mt-4 md:mt-0">
            <article class="h-[100%] text-xl md:text-2xl p-[16px] md:p-[24px] xl:py-[26px] xl:px-[50px]">
                <div class="h-[100%] flex flex-col">
                    <h3 class="flex justify-start">
                        <font-awesome-icon :icon="['fas', 'ranking-star']" />
                        <span class="mx-2 md:mx-4 font-extrabold transition-all duration-300">
                            Category Rating
                        </span>
                    </h3>
                    <div class="relative flex items-center" style="flex: 1 1 auto">
                        <v-chart ref="chartsPie" class="w-full h-[300px] py-4" :option="pieOption" />
                        <div class="absolute bottom-[5%] left-0 w-[30px] flex flex-col">
                            <div v-for="(index) in 5" :key="index" class="w-[15px] h-[15px] rounded-full my-1 hover:my-3" :style="`background-color: ${colors[index]}`"></div>
                        </div>
                    </div>
                    
                </div>
            </article>
        </div>
        <div class="w-full lg:w-[calc(62%-0.75rem)] rounded-[12px] md:rounded-[20px] lg:rounded-[50px]  bg-linear lg:ml-3 mt-[24px] lg:mt-0">
            <article class="h-[100%] text-xl md:text-2xl  p-[16px] md:p-[24px] xl:py-[26px] xl:px-[50px]">
                <div class="h-[100%] flex flex-col">
                    <h3>
                        <font-awesome-icon :icon="['fas', 'chart-area']" />
                        <span class="mx-2 md:mx-4 text-center font-extrabold transition-all duration-300">
                            Daily Spending Amount
                        </span>
                    </h3>
                    <div ref="wrapperChartsLine" class="flex items-center" style="flex: 1 1 auto">
                        <v-chart ref="chartsLine" class="w-full h-[300px] py-4" :width="chartsLineWidth" :option="lineOption" />
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>
<style lang="scss" scoped>
</style>
<script setup>
    import dayjs from 'dayjs'
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
    import Please from 'pleasejs'
    import { storeToRefs } from 'pinia'

    import { userCenterStore } from '~/stores/userCenter.js';

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

    const { toggleMenu } = storeToRefs(userCenterStore());
    const colors = Please.make_scheme(
        {
            h: 13,
            s: .50,
            v: .92
        },
        {
            colors_returned: 10,
            format: 'hex'
        }
    );
    const deviceWidth = ref(0);

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
                    width: 4,
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
    
    const chartsPie = ref(null);
    const chartsLine = ref(null);
    const wrapperChartsLine = ref(null);
    const chartsLineWidth = ref(0);
    function resizeCharts () {
        chartsLineWidth.value = wrapperChartsLine.value.clientWidth;
        setTimeout(() => {
            chartsPie.value.resize ();
            chartsLine.value.resize ();
        },0)
    }
    function monthToName (number, length) {
        const monthMap = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        return monthMap[number].substring(0, length) ;
    }
    onMounted(() => {
        deviceWidth.value = window.innerWidth;
        chartsLineWidth.value = wrapperChartsLine.value.clientWidth;

        window.addEventListener('resize', () => {
            deviceWidth.value = window.innerWidth;
            resizeCharts ();
        })
    })
    watch(toggleMenu, (val,oldVal)=>{
        chartsLineWidth.value = wrapperChartsLine.value.clientWidth;
        resizeCharts ();
    })
</script>