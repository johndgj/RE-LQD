<template>
    <div>
        <ve-line :data="chartData" :extend="Extend" width="400px" height="200px"></ve-line>
        
        <div>
            <BaseButton class="homelink" @click="goToLink">Base</BaseButton>
            <el-tooltip content="80%" placement="bottom" effect="light">
                <el-progress :percentage="80" color="#57C5FF" :show-text="false"></el-progress>
            </el-tooltip>
            <div>
                <el-scrollbar style="height:200px;width:200px;">
                    <div class="idsP">
                    </div>
                </el-scrollbar>
            </div>
            <div>
                <el-scrollbar style="height:200px;width:100%;" class="scro">
                    <div class="heng">
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>
<script>
import BaseButton from '../components/BaseButton.vue'
import VeLine from 'v-charts/lib/line'

export default {
    name: 'home',
    data() {
        return {
            chartData: {
                columns: ['日期', '销售量'],
                rows: [{
                    '日期': '周1',
                    '销售量': 123
                }, {
                    '日期': '周2',
                    '销售量': 1223
                }, {
                    '日期': '周3',
                    '销售量': 2123
                }, {
                    '日期': '周4',
                    '销售量': 4123
                }, {
                    '日期': '周5',
                    '销售量': 3123
                }, {
                    '日期': '周6',
                    '销售量': 7123
                }, {
                    '日期': '周7',
                    '销售量': 8123
                }]
            },
            Extend: {
                'legend.show': false,
                'xAxis.0.axisLabel.show': false,
                'xAxis.0.splitLine.show': true,
                'xAxis.0.splitLine.lineStyle.color': '#E7E6E6',
                'yAxis.0.show': false,
                'xAxis.0.boundaryGap': false,
                'series.0.areaStyle': {},
                'color': {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'green' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'white' // 100% 处的颜色
                    }]
                },
                'tooltip': {
                    trigger: 'axis',
                    formatter: '{c}',
                    backgroundColor: "green",
                    textStyle: {
                        color: '#fff',
                        fontSize: "12"
                    }
                }
            }
        }
    },
    created() {

    },
    methods: {
        goToLink() {
            let _this = this;
            setTimeout(function() {
                _this.$router.push({
                    name: 'home',
                    params: {
                        id: '1'
                    }
                });
            }, 200);
        }
    },
    components: {

        BaseButton,
        VeLine
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homelink {
    background-color: #9D3D9C;
    color: #fff;
}

.idsP {
    height: 500px;
    background-color: #DA2F2F;
    width: 150px;
}

.heng {
    width: 2000px;
    height: 180px;
}

.heng div {
    width: 200px;
    height: 180px;
    background-color: #5EC3ED;
    float: left;
    margin-right: 10px;
}

.view-box {
    color: #fff;
}
</style>
