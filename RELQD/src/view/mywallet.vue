<template>
    <div>
        <div class="hold-top-bg">
            <div class="main-width clear">
                <div class="hold-tab ml50">
                    <h2 class="hold-tab-h2">TOTAL ASSETS</h2>
                    <div class="hold-tab-mon">
                        <span class="gcolo">288.325</span>
                        <span class="hcolo">ETH</span>
                    </div>
                    
                </div>
                <div class="hold-tab ml50">
                    <h2 class="hold-tab-h2">TOTAL DIVIDENDS</h2>
                    <div class="hold-tab-mon">
                        <span class="zcolo">0.892</span>
                        <span class="hcolo">ETH</span>
                    </div>
                </div>
                <div class="hold-tab ml50">
                    <h2 class="hold-tab-h2">BALANCE</h2>
                    <div class="hold-tab-mon">
                        <span class="zcolo">12.350</span>
                        <span class="hcolo">ETH</span>
                    </div>
                    <!-- <h3 class="hold-tab-h3">Return chart</h3>
            <div style="width: 300px;height: 118px;">图表chart</div> -->
                </div>
                <div class="hold-tab tc">
                    <BaseButton class="hold-tab-btn">DEPOSIT</BaseButton>
                    <BaseButton class="hold-tab-btn2">WITHDRAW</BaseButton>
                    <div class="hold-tab-link">
                        <a href="#">History</a>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="hold-bg">
            <div class="main-width">
                <div>
                    <h2 class="hold-tit">Holdings</h2>
                    <!-- <button class="hold-buy-btn">BUY MORE</button> -->
                </div>
                <div class="hold-list">
                    <ul>
                        <li>
                            <div class="hold-block blue-block">
                                <div class="p-21-30">
                                    <h2 class="hold-block-h2">KATALYSEN</h2>
                                    <p class="hold-block-p">New York City</p>
                                </div>
                            </div>
                            <div class="pr pt14">
                                <h2 class="hold-list-tit1">Dividends of this month / Total dividends</h2>
                                <div class="hold-list-mon">
                                    <span class="gcolo">0.021</span>
                                    <span class="dbcolo">ETH </span>
                                    <span class="dbcolo">/</span>
                                    <span class="qhcolo">0.812</span>
                                    <span class="dbcolo">ETH</span>
                                </div>
                                <h2 class="hold-list-tit2">Current price / Cost</h2>
                                <div class="hold-list-mon">
                                    <span class="gcolo">24.000</span>
                                    <span class="dbcolo">ETH </span>
                                    <span class="dbcolo">/</span>
                                    <span class="qhcolo">23.800</span>
                                    <span class="dbcolo">ETH</span>
                                </div>
                                <div class="hold-btn-group">
                                    <BaseButton class="hold-detail-btn" @click="goToLink('detail')">DETAILS</BaseButton>
                                    <BaseButton class="hold-sell-btn">SELL</BaseButton>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="hold-block gray-block">
                                <div class="p-21-30">
                                    <h2 class="hold-block-h2">BROWNSTEIN</h2>
                                    <p class="hold-block-p">Calgary</p>
                                </div>
                            </div>
                            <div class="pr pt14">
                                <h2 class="hold-list-tit1">Dividends of this month / Total dividends</h2>
                                <div class="hold-list-mon">
                                    <span class="pinkcolor">0.028</span>
                                    <span class="dbcolo">ETH </span>
                                    <span class="dbcolo">/</span>
                                    <span class="qhcolo">0.823</span>
                                    <span class="dbcolo">ETH</span>
                                </div>
                                <h2 class="hold-list-tit2">Current price / Cost</h2>
                                <div class="hold-list-mon">
                                    <span class="pinkcolor">32.000</span>
                                    <span class="dbcolo">ETH </span>
                                    <span class="dbcolo">/</span>
                                    <span class="qhcolo">33.900</span>
                                    <span class="dbcolo">ETH</span>
                                </div>
                                <div class="hold-btn-group">
                                    <BaseButton class="hold-detail-btn" @click="goToLink('detail')">DETAILS</BaseButton>
                                    <BaseButton class="hold-sell-btn">SELL</BaseButton>
                                </div>
                                <!-- <div class="hold-detail-chart">
                                图表chart
                            </div> -->
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BaseButton from '../components/BaseButton.vue'
export default {
    name: 'mywallet',
    data() {
        return {
            msg: ""
        }
    },
    methods: {
        goToLink(pageNAme) {
            let _this = this;
            setTimeout(function() {
                _this.$router.push({
                    name: pageNAme,
                    params: {
                        id: '1'
                    }
                });
            }, 200);
        }
    },
    components: {

        BaseButton
    }
}
</script>
<style>


.hold-tab-mon {
    margin-top: 4px;
    margin-bottom: 10px;
}

.hold-tab-mon span {
    font-family: LeagueGothic-Regular;
    font-size: 38px;
    letter-spacing: -0.2px;
    line-height: 46px;
}



.hold-tab-h3 {
    font-family: SourceHanSansSC-Medium;
    font-size: 14px;
    color: #BDC4CC;
}

.hold-bg {
    background: #93AACB;
    padding-top: 21px;
    padding-bottom: 20px;
}

.hold-tit {
    font-family: SourceHanSansSC-Medium;
    font-size: 32px;
    color: #FFFFFF;
    letter-spacing: -0.1px;
    line-height: 46px;
    display: inline-block;
}

.hold-buy-btn {
    width: 130px;
    height: 48px;
    background: #FFFFFF;
    border: 0;
    cursor: pointer;
    border-radius: 4px;
    font-family: SourceHanSansSC-Bold;
    font-size: 20px;
    color: #212D3E;
    text-align: center;
    float: right;
}

.hold-buy-btn:hover {
    color: #57C5FF
}

.hold-list {
    margin-top: 23px;
}

.hold-list li {
    height: 120px;
    margin-bottom: 16px;
    background: #fff;
    position: relative;
    padding-left: 326px;
    background: #FAFAFA;
    box-shadow: 0 6px 14px 0 rgba(86, 98, 102, 0.50);
    border-radius: 4px;
}

.hold-block {
    width: 311px;
    height: 120px;
    position: absolute;
    left: 0;
    top: 0;
}

.blue-block {
    background: url(../static/img/blue-block.png)
}

.gray-block {
    background: url(../static/img/gray-block.png)
}

.p-21-30 {
    padding-left: 21px;
    padding-top: 30px;
}

.hold-block-h2 {
    font-family: SourceHanSansSC-Bold;
    font-size: 29px;
    color: #FEFEFE;
    letter-spacing: 2px;
    line-height: 42px;
}

.hold-block-p {
    opacity: 0.8;
    font-family: SourceHanSansSC-Medium;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
}

.pt14 {
    padding-top: 14px;
}

.hold-list-tit1 {
    font-family: SourceHanSansSC-Medium;
    font-size: 14px;
    color: #959DA8;
    margin-bottom: 2px;
}

.hold-list-mon span {
    font-family: LeagueGothic-Regular;
    font-size: 20px;
    letter-spacing: 0.71px;
}

.hold-list-tit2 {
    margin-top: 7px;
    font-family: SourceHanSansSC-Medium;
    font-size: 14px;
    color: #959DA8;
}

.hold-btn-group {
    width: 332px;
    height: 100%;
    position: absolute;
    ;
    right: 0;
    top: 0
}

.hold-detail-btn {
    width: 130px;
    height: 48px;
    line-height: 48px;
    border: 0;
    cursor: pointer;
    background-image: linear-gradient(-90deg, #94DAFF 0%, #57C5FF 100%);
    box-shadow: 0 4px 10px 0 rgba(112, 185, 221, 0.46);
    border-radius: 4px;
    font-family: SourceHanSansSC-Bold;
    font-size: 20px;
    color: #FFFFFF;
    text-align: center;
    display: inline-block;
    float: left;
    margin-top: 36px;
    margin-right: 16px;
}

.hold-detail-btn:hover {
    background-image: linear-gradient(-90deg, #94DAFF 60%, #57C5FF 100%);
}

.hold-sell-btn {
    width: 130px;
    height: 48px;
    line-height: 48px;
    border: 0;
    cursor: pointer;
    background-image: linear-gradient(-90deg, #FF9CA4 0%, #FF7474 100%);
    box-shadow: 0 4px 10px 0 rgba(221, 112, 112, 0.46);
    border-radius: 4px;
    font-family: SourceHanSansSC-Bold;
    font-size: 20px;
    color: #FFFFFF;
    text-align: center;
    display: inline-block;
    float: left;
    margin-top: 36px;
}

.hold-sell-btn:hover {
    background-image: linear-gradient(-90deg, #FF9CA4 60%, #FF7474 100%);
}

.hold-detail-chart {
    width: 266px;
    height: 83px;
    position: absolute;
    right: 60px;
    top: 21px;
    border: 1px solid #D3CFCF
}

</style>
