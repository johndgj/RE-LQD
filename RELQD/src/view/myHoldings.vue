<template>
  <div>
    <div class="hold-top-bg">
      <div class="main-width pr">
        <div class="clear">
          <div class="hold-tab">
            <h2 class="hold-tab-h2">TOTAL DIVIDENDS</h2>
            <div class="hold-tab-mon">
              <span class="bcolo">{{member.totalDividends}}</span>
              <span class="hcolo">ETH</span>
            </div>
          </div>
          <div class="hold-tab">
            <h2 class="hold-tab-h2">TOTAL ASSETS</h2>
            <div class="hold-tab-mon">
              <span class="bcolo">{{member.totalAssets}}</span>
              <span class="hcolo">ETH</span>
            </div>
          </div>
        </div>
        <div class="clear mt30">
          <div class="hold-tab">
            <h2 class="hold-tab-h2">DIVIDENDS OF THIS MONTH</h2>
            <div class="hold-tab-mon">
              <span class="zcolo">{{member.dividendsOfThisMonth}}</span>
              <span class="hcolo">ETH</span>
            </div>
          </div>
          <div class="hold-tab">
            <h2 class="hold-tab-h2">ETH BALANCE</h2>
            <div class="hold-tab-mon">
              <span class="zcolo">{{member.ethBalance}}</span>
              <span class="hcolo">ETH</span>
            </div>
          </div>
        </div>
        <div class="hold-tab-ab tc">
          <BaseButton class="hold-tab-btn" @click="receiveDialogVisible=true;showDialogNum = 1">RECEIVE</BaseButton>
          <el-dialog title="RECEIVE" :visible.sync="receiveDialogVisible" width="538px" :before-close="handleClose">
            <div v-show="showDialogNum == 1">
              <div>
                <img v-bind:src="member.receiveImg">
              </div>
              <div class="receive-key">
                {{member.receiveCode}}
              </div>
              <BaseButton class="tcbuy-success-btn" @click="showDialogNum = 2">COPY ADDRESS</BaseButton>
            </div>
            <div v-show="showDialogNum == 2">
              <div class="tc">
                <img src="../static/img/big-done.png">
                <p class="receive-success-p">Done.</p>
                <p class="receive-success-p">Now your balance has</p>
                <div class="hold-tab-mon"><span class="bcolo">1535.89</span> <span class="hcolo">ETH</span></div>
                <BaseButton class="tcbuy-success-btn" @click="receiveDialogVisible = false">ok</BaseButton>
              </div>
            </div>
          </el-dialog>
          <BaseButton class="hold-tab-btn2" @click="sendDialogVisible=true;showDialogNum = 1">SEND</BaseButton>
          <el-dialog title="SEND" :visible.sync="sendDialogVisible" width="538px" :before-close="handleClose">
            <div class="m0a buy-div tl" v-show="showDialogNum == 1">
              <div class="pr send-option" v-on:mouseover="changeSendActive($event)" v-on:mouseout="removeSendActive($event)">
                ETH
                <i></i>
                <div class="offer-search-objion" style="width:100%;" v-show="isShowSendOption">
                  <h2 class="mt9">SELECT</h2>
                  <ul>
                    <li><a href="#">ETH</a></li>
                    <li><a href="#">XXX</a></li>
                  </ul>
                </div>
              </div>
              <div class="sendTips">
                Recipient address
              </div>
              <div class="sendInput">
                <input type="text">
              </div>
              <div class="sendTips">
                Amount</div>
              <div class="sendInput">
                <input type="text">
              </div>
              <div class="sendTips">
                <span class="fl">Available balance </span><span class="fr">1235.089 ETH </span>
              </div>
              <BaseButton class="send-con-btn" @click="showDialogNum = 2">SEND</BaseButton>
            </div>
            <div v-show="showDialogNum == 2">
              <div class="tc">
                <img src="../static/img/big-done.png">
                <p class="receive-success-p">Done.</p>
                <BaseButton class="tcbuy-success-btn" @click="sendDialogVisible = false">ok</BaseButton>
              </div>
            </div>
          </el-dialog>
          <div class="hold-tab-link">
            <a href="#">History</a>
          </div>
        </div>
      </div>
    </div>
    <div class="offer-bg">
      <div class="main-width">
        <div class="offer-pos">
          <!-- left start -->
          <OfferingsLeft></OfferingsLeft>
          <!-- left end -->
          <!-- Search start -->
          <OfferingsSearch></OfferingsSearch>
          <!-- Search end -->

          <div class="offer-li"  @click="goToLink(item.myholdID)" v-for="(item,index) in myholdings" :key="index">
            <a class="offer-li-link" href="#">
              <img v-bind:src="item.myholdImg"  class="offer-li-img">
              <div class="offer-li-tit">
                <h2>{{item.myholdName}}</h2>
              </div>
              <div class="clear offer-tits">
                <span class="offer-tits1">{{item.myholdPlace}}</span>
                <span class="offer-tits2">{{item.myholdType}}</span>
              </div>
              <div class="clear">
                <div class="offer-info">
                  <h3>Price per token</h3>
                  <b  v-bind:class="{ 'gcolo': item.myholdTrend=='add', 'pcolo': item.myholdTrend=='reduce' }">{{item.myholdPricePerToken}}</b><b class="ml10 hcolo">ETH</b>
                </div>
                <div class="offer-info">
                  <h3>{{item.myholdXXX}}</h3>
                  <b class="bcolo">{{item.myholdEstimatedDividends}}</b><b class="ml10 hcolo">ETH</b>
                  <span>monthly</span>
                </div>
              </div>
              <div class="clear">
                <div class="offer-info">
                  <div class="trade-info1">
                    Floating monthly
                  </div>
                  <div v-bind:class="[{ 'gcolo': item.myholdTrend=='add', 'pcolo': item.myholdTrend=='reduce' },'trade-info2']">
                    {{item.myholdFloatingMonthly}}
                  </div>
                </div>
                <div class="offer-info">
                  <div class="trade-info1">
                    Total dividends
                  </div>
                  <div class="trade-info2 bcolo">
                    {{item.myholdTotalDividends}} <span class="hcolo" style="margin-left:0;font-size:22px;">ETH</span>
                  </div>
                </div>
              </div>
            </a>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../static/css/myholdings.css'
import BaseButton from '../components/BaseButton.vue'
import Cookies from 'js-cookie'
export default {
  name: 'myHoldings',
  data() {
    return {
      receiveDialogVisible: false,
      sendDialogVisible: false,
      showDialogNum: 1,
      isShowSendOption: false, //是否默认显示SEND弹出框的option
      myholdings: [], //数据数组
      params: {
        city: "", //过滤:city:New York London Shenzhen Tokyo
        propertyType: "", //过滤:propertyType: Commercial  Industrial  bResidential
        sortBy: "", //排序Newest  Ending soon  Low to high  High to low
        searchKey: "", //关键词
        rows: 3, //一页数量
        page: 1 //页码
      },
      member:{
        totalDividends:Cookies.get('totalDividends'),
        totalAssets:Cookies.get('totalAssets'),
        dividendsOfThisMonth:Cookies.get('dividendsOfThisMonth'),
        ethBalance:Cookies.get('ethBalance'),
        receiveImg:Cookies.get('receiveImg'),
        receiveCode:Cookies.get('receiveCode'),
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
      var qs = require('querystring');

      console.log(_this.params);
      _this.$http.get(myholdingsLink, _this.params).then(function(response) { //请求成功

        _this.myholdings = response.data.data;

      }).catch(function(error) { //请求失败

      });
    },
    /**
     * [loadDate 点击左边筛选]
     *
     * @return {[type]} [description]
     */
    filterClick(item) {
      // console.log(item);

      //重置数据并加载数据 
      if (item.filterType == "city") {
        this.params.city = item.value;
      } else {
        this.params.propertyType = item.value;
      }

      this.loadDate();
    },
    /**
     * [loadDate 点击排序]
     *
     * @return {[type]} [description]
     */
    sortClick(item) {

      //重置数据并加载数据 
      this.params.sortBy = item;
      this.loadDate();
    },
    goToLink(offerID) {
      let _this = this;
      setTimeout(function() {
        _this.$router.push({
          name: 'offeringsDetail',
          params: {
            id: offerID
          }
        });
      }, 200);
    },
    //是否默认显示SEND弹出框的option
    changeSendActive($event) {
      this.isShowSendOption = true;
    },
    removeSendActive($event) {
      this.isShowSendOption = false;
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
