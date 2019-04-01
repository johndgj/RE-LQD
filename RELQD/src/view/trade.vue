<template>
  <div>
    <div class="offer-bg">
      <div class="main-width">
        <div class="offer-pos">
          <!-- left start -->
          <OfferingsLeft></OfferingsLeft>
          <!-- left end -->
          <!-- Search start -->
          <OfferingsSearch></OfferingsSearch>
          <!-- Search end -->


          <div class="offer-li"  @click="goToLink(item.tradeID)" v-for="(item,index) in trade" :key="index">
            <a class="offer-li-link" href="#">
              <img v-bind:src="item.tradeImg" class="offer-li-img">
              <div class="offer-li-tit">
                <h2>{{item.tradeName}}</h2>
              </div>
              <div class="clear offer-tits">
                <span class="offer-tits1">{{item.tradePlace}}</span>
                <span class="offer-tits2">{{item.tradeType}}</span>
              </div>
              <div class="clear">
                <div class="offer-info">
                  <h3>Price per token</h3>
                  <b v-bind:class="{ 'gcolo': item.tradeTrend=='add', 'pcolo': item.tradeTrend=='reduce' }">{{item.tradePricePerToken}}</b><b class="ml10 hcolo">ETH</b>
                </div>
                <div class="offer-info">
                  <h3>Estimated dividends </h3>
                  <b class="bcolo">{{item.tradeEstimatedDividends}}</b><b class="ml10 hcolo">ETH</b>
                  <span>monthly</span>
                </div>
              </div>
              <div class="trade-info1">
                Floating monthly
              </div>
              <div v-bind:class="[{ 'gcolo': item.tradeTrend=='add', 'pcolo': item.tradeTrend=='reduce' },'trade-info2']">
                {{item.tradeFloatingMonthly}}
              </div>
            </a>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../static/css/trade.css'
export default {
  name: 'trade',
  data() {
    return {
      trade: [], //数据数组
      params: {
        city: "", //过滤:city:New York London Shenzhen Tokyo
        propertyType: "", //过滤:propertyType: Commercial  Industrial  bResidential
        sortBy: "", //排序Newest  Ending soon  Low to high  High to low
        searchKey: "", //关键词
        rows: 3, //一页数量
        page: 1 //页码
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
      _this.$http.get(tradeLink, _this.params).then(function(response) { //请求成功

        _this.trade = response.data.data;

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

    goToLink(tradeID) {
      let _this = this;
      setTimeout(function() {
        _this.$router.push({
          name: 'tradeDetail',
          params: {
            id: tradeID
          }
        });
      }, 200);
    }
  },
  components: {


  }
}

</script>
<style>
</style>
