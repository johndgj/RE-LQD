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
          <h1>{{offDetail.offerName}}</h1>
          <BaseButton class="det-tit-btn" @click="offerDialogNum = 1;dialogVisible = true">BUY</BaseButton>
          <el-dialog title="BUY KAT" :visible.sync="dialogVisible" width="538px" :before-close="handleClose">
            <!-- 第一块 -->
            <div class="m0a buy-div" v-show="offerDialogNum == 1">
              <div class="buy-tit">
                Changer Status
              </div>
              <div class="buy-con">
                <div class="buy-mon">
                  <span class="bcolo">{{BuyInfo.ChangerStatusETH}}</span>
                  <span class="hcolo">ETH </span>
                  <span class="hcolo">: </span>
                  <span class="bcolo">{{BuyInfo.ChangerStatusKAT}}</span>
                  <span class="hcolo">KAT</span>
                </div>
                <div class="buy-time">
                  Updated at <span>{{BuyInfo.ChangerStatusUpdated}}</span>
                </div>
              </div>
              <div class="buy-tit mt15">
                KAT Amount 
              </div>
              <div class="buy-con2 pr">
                <span class="addus"></span>
                <span class="minus"></span>
                <input type="text" class="buy-con-input"  v-model="BuyInfo.KATAmount">
              </div>
              <div class="clear buy-con-tips">
                <span class="fl">Available balance </span>
                <span class="fr">{{BuyInfo.AvailableBalance}} ETH</span>
              </div>
              <div class="clear buy-con-tips">
                <span class="fl">Required ETH</span>
                <span class="fr">{{BuyInfo.RequiredETH}} ETH</span>
              </div>
              <BaseButton class="buy-con-btn" @click="buyClick">BUY</BaseButton>
            </div>
            <!-- 第二块 -->
            <div class="m0a buy-div" v-show="offerDialogNum == 2">
              <div class="loading">
                <span class="load1"></span>
                <span class="load2"></span>
                <span class="load3"></span>
              </div>
            </div>
            <!-- 第三块 -->
            <div class="m0a buy-div" v-show="offerDialogNum == 3">
              <div class="tc">
                <img src="../static/img/big-done.png">
                <p class="tcbuy-success-p">PURCHASE SUCCESS</p>
                <BaseButton class="tcbuy-success-btn" @click="dialogVisible = false">ok</BaseButton>
              </div>
            </div>
          </el-dialog>
        </div>
        <div class="det-tit-tips clear">
          <span class="fl det-tit-place" style="width:500px;text-align:left;">{{offDetail.offerPlace}}</span>
          <span class="fr" style="font-size: 14px;width:150px;text-align:right;">{{offDetail.offerDate}}</span>
        </div>
        <div class="mt30">
          <div class="detab2">
            <div class="p15-3">
              <h2 class="detb-tit">Offering hightlight</h2>
              <div class="dbt3-line"></div>
              <div class="dbt2-con">
                <p> Spend a unforgettable holiday in the enchanting surroundings of the town of Cisternino (reachable from the near airports of Bari and Brindisi). Trullo Edera offers a heaven of peace and tranquillity, set in an elevated position with a stunning view. </p>
                <p>
                  It's the perfect place if you like nature. You can stay under an olive tree reading a good book, you can have a walk in the small country streets or go to the nearest beaches. </p>
                <p>
                  You can even easily visit any of the sights in Apulia such as the caves of Castellana, the trulli of Alberobello, the baroque cities of Lecce and Martina Franca, the excavations of Egnazia, the zoosafari of Fasano, Castel del Monte with Frederick's castle, Grottaglie famous for its ceramics, Taranto, Brindisi and Lecce museums.</p>
              </div>
            </div>
          </div>
          <div class="detab3 mt30">
            <div class="p15-3">
              <h2 class="detb-tit">Performance data</h2>
              <div class="dbt3-line"></div>
              <div class="detbe3">
                <div class="detbe3-w1">
                  <h2>Building Type</h2>
                  <p>{{offDetail.offerBuildingType}}</p>
                </div>
                <div class="detbe3-w2">
                  <h2>Region</h2>
                  <p>{{offDetail.offerRegion}}</p>
                </div>
                <div class="detbe3-w3">
                  <h2>Building size</h2>
                  <p>{{offDetail.offerBuildingSize}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="detab5">
            <div class="p15-3">
              <h2 class="detb-tit">Overview</h2>
              <div class="dbt3-line"></div>
              <div class="clear">
                <div class="offer-info" style="width:240px;">
                  <h3>Estimated dividends </h3> <b class="bcolo">{{offDetail.offerEstimatedDividends}}</b><b class="ml10 hcolo">ETH</b><span>monthly</span>
                </div>
                <div class="offer-info" style="width:240px;">
                  <h3>Capitalization rate</h3> <b class="bcolo">{{offDetail.offerCapitalizationRate}}</b>
                </div>
                <div class="offer-info" style="width:240px;">
                  <h3>Price per token</h3> <b class="gcolo">{{offDetail.offerPricePerToken}}</b><b class="ml10 hcolo">ETH</b>
                </div>
              </div>
              <div class="clear">
                <div class="offer-sak-d fl">
                  <h3>Sold</h3> <b class="bcolo">{{offDetail.offerSold}}</b><b class="ml10 hcolo">KAT</b>
                </div>
                <div class="offer-sak-d tr fr">
                  <h3 class="">KAT</h3> <b class="bcolo">{{offDetail.offerKAT}}</b><b class="ml10 hcolo">KAT</b>
                </div>
              </div>
              <div>
                <el-tooltip :content="offDetail.offerPercent+'%'" placement="bottom" effect="light">
                  <el-progress :percentage="offDetail.offerPercent" color="#57C5FF" :stroke-width="12" :show-text="false"></el-progress>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="detab4 mt30">
            <div class="p15-3">
              <h2 class="detb-tit">Documents</h2>
              <div class="dbt3-line"></div>
              <ul class="dtb4-ul clear">
                <li style="padding-left:0;">
                  <div>
                    <img src="../static/img/files-icon.png">
                    <span>Proof of real estate</span>
                    <BaseButton class="dtb4-btn">OPEN</BaseButton>
                  </div>
                </li>
                <li style="padding-left:0;margin-right:0;">
                  <div>
                    <img src="../static/img/files-icon.png">
                    <span>Value assessment</span>
                    <BaseButton class="dtb4-btn">OPEN</BaseButton>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../static/css/offeringsDetail.css'
import BaseButton from '../components/BaseButton.vue'
export default {
  name: 'offeringsDetail',
  data() {
    return {
      offDetail: {}, 
      BuyInfo: {}, //buy 的信息
      dialogVisible: false,
      offerDialogNum: 1,
      params:{
        id:this.$route.params.id//接收id
      }
    }
  },
  created() {
    this.loadDate();
  },
  methods: {
    /**
     * [loadDate 初始化数据]
     *
     * @return {[type]} [description]
     */
    loadDate() {
      var _this = this;

      _this.$http.get(offeringsDetailLink, _this.params).then(function(response) { //请求成功

        _this.offDetail = response.data.data;

      }).catch(function(error) { //请求失败

      });

      //加载购买出售的数据
      _this.$http.get(offeringsBuyLink).then(function(response) { //请求成功

        _this.BuyInfo = response.data.data;

      }).catch(function(error) { //请求失败

      });

    },
    /**
     * [点击购买]
     *
     * @return {[type]} [description]
     */
    buyClick(){
      var _this = this;
      _this.offerDialogNum = 2;
      setTimeout(function() {
        _this.offerDialogNum = 3;
      }, 1500);
    },

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
    },
    handleClose(done) {

      done();

    }
  },
  components: {

    BaseButton
  }
}

</script>
<style>
</style>
