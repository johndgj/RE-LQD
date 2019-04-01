<template>
    <div>

    
<div>
                <el-scrollbar style="height:280px;width:100%;" class="scro">
                    <div class="det-heng">
                        <div><img src="../static/img/detail-img1.png"></div>
                        <div><img src="../static/img/detail-img2.png"></div>
                        <div><img src="../static/img/detail-img3.png"></div>
                        <div><img src="../static/img/detail-img4.png"></div>
                        <div><img src="../static/img/detail-img1.png"></div>
                        <div><img src="../static/img/detail-img2.png"></div>
                        <div><img src="../static/img/detail-img3.png"></div>
                        <div><img src="../static/img/detail-img4.png"></div>
                    </div>
                </el-scrollbar>
            </div>



        <div class="detail-bg">
        <div class="main-width">
            <div class="det-tit">
                <h1>KATALYSEN</h1>
                <BaseButton class="det-tit-btn" @click="goToLink('mywallet')">BUY</BaseButton>
            </div>
            <div class="det-tit-tips clear">
                <span class="fl">New York City</span>
                <span class="fr" style="font-size: 14px;">Ends in 19 days </span>
            </div>
            <div class="clear">
                <div class="detail-tab fl">
                    <div class="detab1">
                        <div class="p15-3">
                            <h2 class="detb-tit">Financials</h2>
                            <div class="dbt3-line"></div>
                            <div class="clear detb-tips">
                                <span class="fl">Sold</span>
                                <span class="fr">Total</span>
                            </div>
                            <div class="clear detb-money">
                                <span class="fl bcolo">24.000</span>
                                <span class="fr hcolo">50.000</span>
                            </div>
                            <div class="det-jd">
                                <el-tooltip content="80%" placement="bottom" effect="light">
                <el-progress :percentage="50" color="#57C5FF" :stroke-width="6" :show-text="false"></el-progress>
            </el-tooltip>
                            </div>
                            <!-- <div class="det-hctit">Sales status chart</div>
                            <div style="width: 470px;height: 75px;">图表chart</div> -->
                            <div class="clear">
                                <div class="det-char fl">
                                    <div class="clear det-char-tips">
                                        <span class="fl">Per</span>
                                        <span class="fr">Floating P/L</span>
                                    </div>
                                    <div class="clear detb-money">
                                        <span class="fl gcolo">12.350 <b class="hcolo">ETH</b></span>
                                        <span class="fr gcolo" style="margin-top: 2px;">+0.23%</span>
                                    </div>
                                    <!-- <div class="detb-chart-tips">Price chart</div>
                                    <div style="width: 225px;height: 75px;">图表chart</div> -->
                                </div>
                                <div class="det-char fr">
                                    <div class="clear det-char-tips">
                                        <span class="fl">Estimated Monthly Dividends</span>
                                    </div>
                                    <div class="clear detb-money">
                                        <span class="fl gcolo">0.022 <b class="hcolo">ETH</b></span>
                                    </div>
                                    <!-- <div class="detb-chart-tips">Return chart</div>
                                    <div style="width: 225px;height: 75px;">图表chart</div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="detab2">
                        <div class="p15-3">
                            <h2 class="detb-tit">Offering Highlights</h2>
                            <div class="dbt3-line"></div>
                            <div class="dbt2-con">
                                <p>Located in the center of the city, the surrounding facilities are fully <br> equipped. With the development of the economy, the rents in the <br> nearby areas are rising, which is suitable for long-term holding.</p>
                                <p>Sitting on the bar under the old-fashioned light bulb, you can enjoy <br> the rich and hot coffee. The interior is designed with soft design as <br> the main body, and the white is the base tone. It is clean and neat. <br> Although the suite space is limited, the sparrow is small and <br> complete, so it is called “pupil”by the landlord. The nest. The<br>  indoor photography and pictures are all created, and there are <br> more homemade designs in the bookcase for the residents to <br> enjoy.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-tab fr">
                    <div class="detab3">
                        <div class="p15-3">
                            <h2 class="detb-tit">Offering Highlights</h2>
                            <div class="dbt3-line"></div>
                            <ul class="dbt3-ul">
                                <li>
                                    <img src="../static/img/photo1.jpg">
                                    <span class="dbt3-ul-span1">Kayla</span>
                                    <span class="dbt3-ul-span2">4.12</span>
                                </li>
                                <li>
                                    <img src="../static/img/photo2.jpg">
                                    <span class="dbt3-ul-span1">Ronald Jackson</span>
                                    <span class="dbt3-ul-span2">8.84</span>
                                </li>
                                <li>
                                    <img src="../static/img/photo3.jpg">
                                    <span class="dbt3-ul-span1">Ezio</span>
                                    <span class="dbt3-ul-span2">4.70</span>
                                </li>
                                <li>
                                    <img src="../static/img/photo4.jpg">
                                    <span class="dbt3-ul-span1">Robert Harris</span>
                                    <span class="dbt3-ul-span2">7.85</span>
                                </li>
                                <li>
                                    <img src="../static/img/photo5.jpg">
                                    <span class="dbt3-ul-span1">ina</span>
                                    <span class="dbt3-ul-span2">5.35</span>
                                </li>
                                <li>
                                    <img src="../static/img/photo6.jpg">
                                    <span class="dbt3-ul-span1">Deborah Moore</span>
                                    <span class="dbt3-ul-span2">3.20</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="detab4">
                        <div class="p15-3">
                            <h2 class="detb-tit">Documents</h2>
                            <div class="dbt3-line"></div>
                            <ul class="dtb4-ul">
                                <li>
                                    <img src="../static/img/files-icon.png">
                                    <span>Proof of real estate</span>
                                    <BaseButton class="dtb4-btn">DOWNLOAD</BaseButton>
                                </li>
                                <li>
                                    <img src="../static/img/files-icon.png">
                                    <span>Value assessment</span>
                                    <BaseButton class="dtb4-btn">DOWNLOAD</BaseButton>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    </div>
</template>
<script>
import BaseButton from '../components/BaseButton.vue'
export default {
    name: 'offrings',
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
.detail-bg{background:#EEF0F3;padding-top:58px;padding-bottom:40px;}
.det-tit h1{font-family:SourceHanSansSC-Bold;font-size:52px;color:#212D3E;display:inline-block;}
.det-tit-btn{border:0;cursor:pointer;width:130px;height:48px;line-height:48px;text-align:center;background-image:linear-gradient(-90deg,#94DAFF 0%,#57C5FF 100%);box-shadow:0 4px 10px 0 rgba(112,185,221,0.46);border-radius:4px;font-family:SourceHanSansSC-Bold;font-size:20px;color:#FFFFFF;text-align:center;float:right;}
.det-tit-btn:hover{background-image:linear-gradient(-90deg,#94DAFF 60%,#57C5FF 100%);}
.det-tit-tips{padding-right:10px;}
.det-tit-tips span{font-family:SourceHanSansSC-Medium;font-size:18px;color:#959DA8;text-align:center;}
.detail-tab{width:500px;margin-top:56px;}
.detab1{width:500px;height:200px;background:#FAFAFA;box-shadow:0 6px 14px 0 rgba(189,211,218,0.70);border-radius:4px;margin-bottom:20px;}
.detab2{width:500px;height:325px;background:#FAFAFA;box-shadow:0 6px 14px 0 rgba(189,211,218,0.70);border-radius:4px;}
.detab3{width:500px;height:370px;background:#FAFAFA;box-shadow:0 6px 14px 0 rgba(189,211,218,0.70);border-radius:4px;margin-bottom:20px;}
.detab4{width:500px;height:188px;background:#FAFAFA;box-shadow:0 6px 14px 0 rgba(189,211,218,0.70);border-radius:4px;}
.p15-3{padding:3px 15px;}
.detb-tit{font-family:SourceHanSansSC-Bold;font-size:16px;color:#212D3E;line-height:24px;}
.detb-tips{margin-top:5px;}
.detb-tips span{font-family:SourceHanSansSC-Medium;font-size:10px;color:#797979;text-align:right;}
.detb-money{margin-top:4px;}
.detb-money span{font-family:LeagueGothic-Regular;font-size:28px;letter-spacing:-1px;}
.det-jd{margin-top:2px;width:100%;height:6px; }
.det-hctit{font-family:SourceHanSansSC-Medium;font-size:14px;color:#BDC4CC;margin-top:12px;}
.det-char{width:225px;margin-top:19px;}
.det-char-tips span{font-family:SourceHanSansSC-Medium;font-size:10px;color:#797979;text-align:right;}
.detb-chart-tips{font-family:SourceHanSansSC-Medium;font-size:14px;color:#BDC4CC;}
.dbt2-con{margin-top:7px;}
.dbt2-con p{font-family:SourceHanSansSC-Regular;font-size:15px;color:#212D3E;text-align:justify;margin-bottom:10px;letter-spacing:-0.2px;}
.dbt3-line{height:1px;background:#EEF0F3;margin-top:3px;}
.dbt3-ul{margin-top:10px;}
.dbt3-ul li{height:40px;position:relative;padding-left:48px;line-height:40px;margin-bottom:15px;}
.dbt3-ul li img{width:38px;height:38px;border-radius:19px;position:absolute;left:0;top:0;}
.dbt3-ul-span1{font-family:SourceHanSansSC-Medium;font-size:16px;color:#212D3E;letter-spacing:0.5px;}
.dbt3-ul-span2{font-family:LeagueGothic-Regular;font-size:16px;color:#57C5FF;letter-spacing:0.5px;text-align:right;position:absolute;right:10px;top:5px;}
.dtb4-ul{margin-top:9.5px;}
.dtb4-ul li{height:54px;padding-left:62px;position:relative;line-height:54px;text-align:left;font-family:SourceHanSansSC-Medium;font-size:18px;color:#212D3E;margin-bottom:20px;}
.dtb4-ul li img{width:44px;height:54px;position:absolute;left:0;top:3px;}
.dtb4-btn{cursor:pointer;width:144px;height:48px;line-height:48px;border:0;font-family:SourceHanSansSC-Bold;font-size:20px;color:#FFFFFF;text-align:center;background-image:linear-gradient(-90deg,#94DAFF 0%,#57C5FF 100%);box-shadow:0 4px 10px 0 rgba(112,185,221,0.46);border-radius:4px;float: right;display: inline-block;}
.dtb4-btn:hover{background-image:linear-gradient(-90deg,#94DAFF 60%,#57C5FF 100%);}


.det-heng {
    width: 2953px;
    height: 280px;
    background:#EEF0F3;
}

.det-heng div {
    width: 359px;
    height: 270px;
    background-color: #5EC3ED;
    float: left;
    margin-right: 10px;
}
.det-heng div img{
    width: 100%;
    height: 100%
}
</style>
