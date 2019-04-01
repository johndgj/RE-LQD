<template>
  <div>
    <div class="offer-bg">
      <div class="main-width">
        <div class="offer-pos">
          <!-- left start -->
          <OfferingsLeft v-on:filterComClick="filterClick"></OfferingsLeft>
          <!-- left end -->
          <!-- Search start -->
          <OfferingsSearch v-on:sortComClick="sortClick"></OfferingsSearch>
          <!-- Search end -->
          <div class="offer-li" @click="goToLink(item.offerID)" v-for="(item,index) in offerings" :key="index">
            <a class="offer-li-link" href="#">
              <img v-bind:src="item.offerImg" class="offer-li-img">
              <div class="offer-li-tit">
                <h2>{{item.offerName}}</h2>
              </div>
              <div class="clear offer-tits">
                <span class="offer-tits1">{{item.offerPlace}}</span>
                <span class="offer-tits2">Commercial</span>
                <span class="offer-tits3">{{item.offerDate}}</span>
              </div>
              <div class="clear">
                <div class="offer-info">
                  <h3>Price per token</h3>
                  <b class="bcolo">{{item.offerPricePerToken}}</b><b class="ml10 hcolo">ETH</b>
                </div>
                <div class="offer-info">
                  <h3>Estimated dividends </h3>
                  <b class="bcolo">{{item.offerEstimatedDividends}}</b><b class="ml10 hcolo">ETH</b>
                  <span>monthly</span>
                </div>
              </div>
              <div class="offer-tips clear">
                <span class="fl">Sold <b>{{item.offerSold}}</b></span>
                <span class="fr tr">Total <b>{{item.offerTotal}}</b></span>
              </div>
              <div class="offer-zt-line">
                <el-tooltip :content="item.offerPercent+'%'" placement="bottom" effect="light">
                  <el-progress :percentage="item.offerPercent" color="#57C5FF" :stroke-width="12" :show-text="false"></el-progress>
                </el-tooltip>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../static/css/offerings.css'
export default {
  name: 'offrings',
  data() {
    return {
      offerings: [], //数据数组
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

      // console.log(_this.params);
      _this.$http.get(offeringsLink, _this.params).then(function(response) { //请求成功

        _this.offerings = response.data.data;

        //console.log(response.data.data);

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
    }
  },
  components: {


  }
}

</script>
<style>
</style>
