<template>
  <div>
    <div>
      <el-scrollbar style="height:280px;width:100%;" class="scro">
        <div class="det-heng">
          <div><img src="../static/img/trad-det-img1.png"></div>
          <div><img src="../static/img/trad-det-img2.png"></div>
          <div><img src="../static/img/trad-det-img3.png"></div>
          <div><img src="../static/img/trad-det-img4.png"></div>
          <div><img src="../static/img/trad-det-img1.png"></div>
          <div><img src="../static/img/trad-det-img2.png"></div>
          <div><img src="../static/img/trad-det-img3.png"></div>
          <div><img src="../static/img/trad-det-img4.png"></div>
        </div>
      </el-scrollbar>
    </div>
    <div class="detail-bg">
      <div class="main-width">
        <div class="det-tit">
          <h1>{{tradeDetail.tradeName}}</h1>
          <BaseButton class="det-tit-btn" @click="changeBuySell('BUY')">BUY</BaseButton>
          <BaseButton class="det-tit-btn2" @click="changeBuySell('SELL')">SELL</BaseButton>
          <el-dialog :title="getDialogTitle()" :visible.sync="dialogVisible" width="538px" :before-close="handleClose">
            <!-- 第一块 -->
            <div class="m0a buy-div" v-show="tradDialogNum == 1">
              <div class="buy-tit">
                Changer Status
              </div>
              <div class="buy-con">
                <div class="buy-mon">
                  <span class="bcolo">{{showBuyOrSell.ChangerStatusETH}}</span>
                  <span class="hcolo">ETH </span>
                  <span class="hcolo">: </span>
                  <span class="bcolo">{{showBuyOrSell.ChangerStatusKAT}}</span>
                  <span class="hcolo">KAT</span>
                </div>
                <div class="buy-time">
                  Updated at <span>{{showBuyOrSell.ChangerStatusUpdated}}</span>
                </div>
              </div>
              <div class="buy-tit mt15">
                KAT Amount
              </div>
              <div class="buy-con2 pr">
                <span class="addus"></span>
                <span class="minus"></span>
                <input type="text" class="buy-con-input" v-model="showBuyOrSell.KATAmount">
              </div>
              <div class="clear buy-con-tips">
                <span class="fl">Available balance </span>
                <span class="fr">{{showBuyOrSell.AvailableBalance}} ETH</span>
              </div>
              <div class="clear buy-con-tips">
                <span class="fl">Required ETH</span>
                <span class="fr">{{showBuyOrSell.RequiredETH}} ETH</span>
              </div>
              <BaseButton v-bind:class="[actionType=='BUY' ? 'buy-con-btn' : 'sell-con-btn']" @click="buyOrSellClick">{{actionType}}</BaseButton>
            </div>
            <!-- 第二块 -->
            <div class="m0a buy-div" v-show="tradDialogNum == 2">
              <div class="loading">
                <span class="load1"></span>
                <span class="load2"></span>
                <span class="load3"></span>
              </div>
            </div>
            <!-- 第三块 -->
            <div class="m0a buy-div" v-show="tradDialogNum == 3">
              <div class="tc">
                <img src="../static/img/big-done.png">
                <p v-if="actionType=='BUY'" class="tcbuy-success-p">PURCHASE SUCCESS</p>
                <p v-if="actionType=='SELL'" class="tcbuy-success-p2">We have received your request and we will process it as soon as possible. Please wait patiently.</p>
                <BaseButton class="tcbuy-success-btn" @click="dialogVisible = false">ok</BaseButton>
              </div>
            </div>
          </el-dialog>
        </div>
        <div class="det-tit-tips clear">
          <span class="fl det-tit-place">{{tradeDetail.tradePlace}}</span>
          <!--                     <span class="fr" style="font-size: 14px;">Ends in 19 days </span> -->
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
                  <p>{{tradeDetail.tradeBuildingType}}</p>
                </div>
                <div class="detbe3-w2">
                  <h2>Region</h2>
                  <p>{{tradeDetail.tradeRegion}}</p>
                </div>
                <div class="detbe3-w3">
                  <h2>Building size</h2>
                  <p>{{tradeDetail.tradeBuildingSize}}</p>
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
                  <h3>Estimated dividends </h3> <b class="bcolo">{{tradeDetail.tradeEstimatedDividends}}</b><b class="ml10 hcolo">ETH</b><span>monthly</span>
                </div>
                <div class="offer-info" style="width:240px;">
                  <h3>Capitalization rate</h3> <b class="bcolo">{{tradeDetail.tradeCapitalizationRate}}</b>
                </div>
                <div class="offer-info" style="width:240px;">
                  <h3>Price per token</h3> <b class="gcolo">{{tradeDetail.tradePricePerToken}}</b><b class="ml10 hcolo">ETH</b>
                </div>
                <div class="offer-info" style="width:240px;">
                  <h3>Floating monthly </h3> <b class="gcolo">{{tradeDetail.tradeFloatingMonthly}}</b>
                </div>
              </div>
              <div class="clear">
                <div class="offer-info" style="width:240px;">
                  <h3>Hoilding</h3> <b class="bcolo">{{tradeDetail.tradeHoilding}}</b><b class="ml10 hcolo">GAR</b>
                </div>
                <div class="offer-info" style="width:240px;">
                  <h3>Total</h3> <b class="bcolo">{{tradeDetail.tradeTotal}}</b><b class="ml10 hcolo">GAR</b>
                </div>
              </div>
            </div>
          </div>
          <div class="detab4 mt30">
            <div class="p15-3">
              <h2 class="detb-tit">Documents</h2>
              <div class="dbt3-line"></div>
              <ul class="dtb4-ul clear">
                <li style="padding-left:0">
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
import '../static/css/tradeDetail.css'
import BaseButton from '../components/BaseButton.vue'
export default {
  name: 'tradeDetail',
  data() {
    return {
      tradeDetail: {},
      showBuyOrSell: {},
      BuyInfo: {}, //buy 的信息
      sellInfo: {}, //sell 的信息
      dialogVisible: false,
      tradDialogNum: 1,
      actionType: '', //SELL,BUY
      params: {
        id: this.$route.params.id //接收id
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


      _this.$http.get(tradeDetailLink, _this.params).then(function(response) { //请求成功

        _this.tradeDetail = response.data.data;

      }).catch(function(error) { //请求失败

      });


      //加载购买出售的数据
      _this.$http.get(tradeBuyLink).then(function(response) { //请求成功
        _this.BuySellInfo = response.data.data;
        _this.BuyInfo = response.data.data.BUY;
        _this.sellInfo = response.data.data.SELL;

      }).catch(function(error) { //请求失败

      });

    },
    /**
     * [buyOrSell 购买或者出售按钮]
     *
     * @return {[type]} [description]
     */
    buyOrSellClick() {

      //进行请求ajax

      //成功跳转
      var _this = this;
      _this.tradDialogNum = 2;
      setTimeout(function() {
        _this.tradDialogNum = 3;
      }, 1500);
    },

    /**
     * [loadDate 初始化数据]
     *
     * @return {[type]} [description]
     */
    changeBuySell(val) {

      this.tradDialogNum = 1;
      this.dialogVisible = true;
      this.actionType = val;
      if (val == 'BUY') {
        this.showBuyOrSell = this.BuyInfo;
      } else {
        this.showBuyOrSell = this.sellInfo;
      }
    },
    /**
     * [获取弹出框的标题]
     *
     * @return {[type]} [description]
     */
    getDialogTitle() {

      if (this.actionType == 'SELL') {
        return 'SELL';
      } else {
        return 'BUY KAT';
      }

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
