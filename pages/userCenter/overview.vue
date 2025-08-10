<template>
     <section class="w-full lg:h-[42%] rounded-[12px] md:rounded-[20px] lg:rounded-[50px]  bg-linear flex flex-wrap xl:flex-nowrap">
        <div class="w-full lg:w-[48%] lg:h-[100%] p-[16px] md:p-[24px] xl:pt-[33px] xl:py-[26px] xl:pl-[50px]">
            <article class="text-xl md:text-2xl  lg:h-[100%] flex flex-col">
                <div class="mb-4 md:mb-5 xl:mb-6">
                    <font-awesome-icon :icon="['fa-regular', 'fa-calendar-days']" />
                    <span class="mx-2 md:mx-3 text-center font-extrabold transition-all duration-300">
                        Sums Up Spending
                    </span>
                </div>
                <div class="flex flex-wrap items-stretch lg:flex-nowrap flex-1">
                    <div class="w-full md:w-[calc(50%-10px)] mb-[20px] md:mb-0 md:mr-[10px] h-[100%] flex flex-col justify-between rounded-[30px] border-[4px] border-quaternary p-[20px]">
                        <div class="w-full flex justify-between">
                            <p class="text-sm sm:text-base  font-semibold text-[#9a9a9a] leading-[16px] sm:leading-[14px] lg:leading-[18px]">
                                Total Amount<br>
                                <span v-if="overviewMergedRecords.length" class="text-xs">
                                    {{ overviewMergedRecords[overviewMergedRecords.length-1].date }} - {{ overviewMergedRecords[0].date.substring(5) }}</span>
                            </p>
                                
                            <font-awesome-icon class="text-secondary text-3xl" :icon="['fa-solid', 'fa-ellipsis']" />
                        </div>
                        <div class="font-extrabold text-secondary mt-[10px] md:mt-[20px]">
                            <span class="border-b-4 border-secondary">NTD</span>
                            <div class="mt-4 w-full flex justify-between">
                                <span>$</span>
                                <span class="text-3xl xl:text-4xl">
                                    {{ toCommas(amountDatas.overview) }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-[calc(50%-10px)] md:ml-[10px] flex flex-col justify-between rounded-[30px] border-[4px] border-quaternary p-[20px]">
                        <div class="w-full flex justify-between">
                            <p class="text-sm sm:text-base  font-semibold text-[#9a9a9a] leading-[16px] sm:leading-[14px] lg:leading-[18px]">Numbers of<br>Spending<br>Records</p>
                            <font-awesome-icon class="text-secondary text-3xl" :icon="['fa-solid', 'fa-ellipsis']" />
                        </div>
                        <div class="font-extrabold text-secondary text-right">
                            <span class="text-5xl">{{ overviewMergedRecords.length }}</span>
                        </div>
                    </div>
                </div>
            </article>
        </div>
        <div class="w-full lg:w-[52%] lg:h-[100%] p-[16px] pr-0 pb-0 md:p-x[24px] md:pr-0 xl:pt-[33px] xl:pl-[25px]">
            <article class="text-xl md:text-2xl  w-full h-[100%] flex flex-col rounded-br-[50px]">
                <div class="mb-4 md:mb-5 xl:mb-6">
                    <font-awesome-icon icon="fa-solid fa-clock" />
                    <span class="mx-2 md:mx-3 text-center font-extrabold transition-all duration-300">
                        Recent Spending
                    </span>
                </div>
                <div class="w-full lg:w-full lg:pr-6 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 scrollbar-rounded-lg">
                    <div class="w-full lg:w-full max-h-[600px] sm:h-[320px] pr-4 lg:pr-0">
                        <div v-for="({
                            id,
                            item,
                            date,
                            createdDate,
                            category,
                            selfDefinedCategory,
                            amount,
                            memo,
                            isOpen,
                            isEdit
                        }, index) in spendingRecords.filter((item, index) => index <11)" :key="index" class="rounded-[30px] bg-white w-full md:h-[58px] flex flex-wrap md:flex-nowrap mb-[10px]">
                            <div class="text-xs sm:text-sm text-[#9a9a9a] font-semibold flex items-center h-[calc(100%-30px)] justify-between w-full md:w-[55%] m-[10px] sm:m-[15px] sm:mr-0 mr-0 mb-0 md:mb-[15px] md:border-r-[1px] border-secondary">
                                <p class="w-[250px] overflow-hidden truncate">
                                    {{ date }}<br>
                                    {{ item }}
                                </p>
                                <font-awesome-icon
                                    class="text-base sm:text-lg md:text-xl text-secondary mr-[15px] border-b-[1px] md:border-b-0 border-secondary pb-[8px] sm:pb-[15px] md:pb-0 md:mb-0"
                                    :icon="getIconForCategory(category)" />
                            </div>
                            <div class="text-2xl sm:text-2xl text-secondary font-black flex items-center h-[100%] justify-between w-full md:w-[45%] p-[15px]">
                                <p>$</p>
                                <span>{{ toCommas(amount) }}</span>
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
                        <span class="mx-2 md:mx-3 font-extrabold transition-all duration-300">
                            Category Rating
                        </span>
                    </h3>
                    <div class="relative flex flex-col sm:flex-row sm:items-center" style="flex: 1 1 auto" @mouseleave="resetDataName()">
                        <v-chart ref="chartsPie" class="py-4" style="width: 100%; height: 300px;" :option="pieOption" :init-options="{ width: 'auto', height: 'auto' }"/>
                        <div class="sm:absolute sm:bottom-[5%] pl-[calc(50%-(130px/2)+6px)] sm:pl-0 sm:left-0 w-[30px] flex flex-col pointer-events-none">
                            <div v-for="({ color, name, rate }, index) in categoryPieConsist.overview" :key="index"
                                class="w-[15px] h-[15px] rounded-full my-2 transition-all duration-300 relative z-[5] group" :style="`background-color: ${color}`" :class="[ dataName === name ? 'my-6 sm:my-4' : 'sm:my-1' ]">
                                <div class="absolute -top-[13.5px] -left-[8px] z-[4] w-[130px] h-[42px] rounded-full flex items-center justify-between px-2" :class="[ dataName === name ? 'bg-white opacity-100 sm:opacity-80 shadow' : 'sm:bg-transparent sm:opacity-0' ]">
                                    <div class="w-[15px] h-[15px] rounded-full" :style="`background-color: ${color}`" ></div>
                                    <div class="flex justify-between items-center flex-grow-2 w-[100px] font-bold">
                                       <div class="flex items-center">
                                            <font-awesome-icon class="text-[#999] text-base md:text-xl w-[20px] pl-2 pr-1" :icon="getIconForCategory(name)" />
                                            <!-- <span class="text-xs">{{ name.charAt(0).toUpperCase() + name.slice(1) }}</span> -->
                                        </div>
                                        <span class="text-lg font-extrabold text-secondary">{{ rate }}%</span>
                                    </div>
                                </div>
                            </div>
                            
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
                        <span class="mx-2 md:mx-3 text-center font-extrabold transition-all duration-300">
                            Daily Spending Amount
                        </span>
                    </h3>
                    <div ref="wrapperChartsLine" class="flex items-center" style="flex: 1 1 auto">
                        <v-chart ref="chartsLine" class="py-4" style="width: 100%; height: 300px;" :width="chartsLineWidth" :option="lineOption" :init-options="{ width: 'auto', height: 'auto' }"/>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>
<style lang="scss" scoped>
</style>
<script setup>
    import { getIconForCategory, monthToName, toCommas } from '~/utility';
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

    import { storeToRefs } from 'pinia'
    import { userCenterStore } from '~/stores/userCenter.js';

    const {
        spendingRecords,
        amountDatas,
        categoryPieConsist,
        overviewMergedRecords
    } = storeToRefs(userCenterStore());

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

    const deviceWidth = ref(0);
    const dataName = ref('');
    const lineOption = ref({
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                const [ series ] = params;
                const { value, axisValue } = series;
                return `<div class="text-right">${axisValue}<br />
                    <span class="text-secondary font-extrabold text-lg">$ ${toCommas(series.value)}</span>
                </div>`
            }
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
            number: 3,
            axisLabel: {
                rotate: 45,
                fontSize: 10,
                fontWeight: 'bolder',
                color: '#aaa',
                interval: 1
            },
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 3,
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
    });

    const pieOption = ref({
        tooltip: {
          trigger: 'item',
          formatter: function({ name }) {
            dataName.value = name;
          },
        //   show: false
        },
        selectedMode: 'single',
        series: {
            name: '花費佔比',
            type: 'pie',
            radius: ['45%', '85%'],
            center: ['50%', '50%'],
            itemStyle: {
                borderColor: '#E9FFDD',
                borderWidth: 6
            },
            label: {
                show: false,
                position: 'center'
            },
            data: [],
            color: [],
            emphasis: {
                scale: true, 
                itemStyle: {
                    // shadowBlur: 10,
                    // shadowOffsetX: 0,
                    // shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
                label: {
                    show: true,
                    fontSize: 14,
                    fontWeight: 'bolder',
                    textBorderColor: 'transparent',
                    lineHeight: 20,
                    formatter: function (params) {
                        // console.log(params)
                        const { name, value, color } = params.data;
                        return `${name.charAt(0).toUpperCase() + name.slice(1)}\n$ ${toCommas(value)}`
                        
                    }
                }
            },
          },
        
    });
  
    const chartsPie = ref(null);
    const chartsLine = ref(null);
    const wrapperChartsLine = ref(null);
    const chartsLineWidth = ref(0);
    function resizeCharts () {
        chartsLineWidth.value = wrapperChartsLine.value.clientWidth;
        
        setTimeout(() => {
            chartsPie.value && chartsPie.value.resize ();
            chartsLine.value && chartsLine.value.resize ();
        },10)
    }

    onMounted(() => {
        nextTick(() => {
            deviceWidth.value = window.innerWidth;
            categoryPieConsist.value &&
            categoryPieConsist.value.overview &&
            categoryPieConsist.value.overview
                .forEach(({ name, value, color }) => {
                    pieOption.value.series.data.push({ name, value });
                    pieOption.value.series.color.push(color);
                })
            overviewMergedRecords.value.forEach(({ amount, date }) => {
                lineOption.value.xAxis.data.push(date);
                lineOption.value.series[0].data.push(amount);
            })
            
            window.addEventListener('resize', () => {
                deviceWidth.value = window.innerWidth;
                if (wrapperChartsLine.value && chartsLine.value && chartsPie.value) resizeCharts ();
            })
            
        })
    })

    watch(toggleMenu, (val,oldVal)=>{
        resizeCharts ();
    })

    watch(deviceWidth, () => {
        resizeCharts ();
    })

    function resetDataName () {
        dataName.value = '';
    }
</script>