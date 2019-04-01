<template>
  <div class="offer-search-pr">
    <input type="text" placeholder="Search real estate or city." class="offer-search-input">
    <div v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">
      <button class="offer-search-btn">SORT BY</button>
      <div class="offer-search-objion" v-show="isShowOption">
        <h2 class="mt9">TIMING</h2>
        <ul>
          <li @click="sClick('Newest')"  v-bind:class="{'hover': sortHover ==  'Newest' }">
            <a href="#">Newest</a>
          </li>
          <li @click="sClick('Ending soon')" v-bind:class="{'hover': sortHover ==  'Ending soon' }">
            <a href="#">Ending soon</a>
          </li>
        </ul>
        <h2 class="mt14">PRICE</h2>
        <ul>
          <li @click="sClick('Low to high')" v-bind:class="{'hover': sortHover ==  'Low to high' }">
            <a href="#">Low to high</a>
          </li>
          <li @click="sClick('High to low')" v-bind:class="{'hover': sortHover ==  'High to low' }">
            <a href="#">High to low</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OfferingsSearch',
  data() {
    return {
      isShowOption: false, //是否显示下拉选项
      sortHover: ""
    }
  },

  methods: {


    /**
     * [loadDate 选择参数]
     *
     * @return {[type]} [description]
     */
    sClick(val) {

      this.sortHover = val;

      this.$emit('sortComClick', val); //触发父组建的方法
    },



    // 鼠标移入加入class
    changeActive($event) {
      this.isShowOption = true;
    },
    removeActive($event) {
      this.isShowOption = false;
    }
  }
}

</script>
<style>
.offer-search-pr {
  position: relative;
  padding-left: 680px;
  height: 38px;
  margin-bottom: 14px;
}

.offer-search-input {
  width: 670px;
  height: 36px;
  line-height: 36px;
  position: absolute;
  left: 0;
  top: 1px;
  background: #FAFAFA;
  box-shadow: inset 0 1px 3px 0 rgba(147, 170, 203, 0.50);
  border-radius: 4px;
  text-indent: 8px;
  font-family: SourceHanSansSC-Medium;
  border: 0;
}

.offer-search-input::-webkit-input-placeholder {
  font-family: SourceHanSansSC-Medium;
  font-size: 18px;
  color: #BDC4CC;
}

.offer-search-btn {
  cursor: pointer;
  width: 130px;
  height: 38px;
  border: 0;
  border-radius: 4px;
  background: url(../static/img/offer-search-btn.png) no-repeat -10px -7px;
  font-family: SourceHanSansSC-Bold;
  font-size: 18px;
  color: #FFFFFF;
  text-align: left;
  padding-left: 17px;
}

.offer-search-objion {
  background: #FFFFFF;
  box-shadow: 0 6px 14px 0 rgba(86, 98, 102, 0.25);
  border-radius: 4px;
  padding-bottom: 15px;
  position: absolute;
  right: 0;
  width: 130px;
  z-index: 999;
}

.offer-search-objion h2 {
  font-family: SourceHanSansSC-Bold;
  font-size: 12px;
  color: #57C5FF;
  line-height: 17px;
  padding-bottom: 1.5px;
  border-bottom: 2px solid #57C5FF;
  margin-left: 17px;
  margin-right: 8px;
}

.offer-search-objion li {
  height: 24px;
  line-height: 24px;
  padding: 0 8px 0 17px;
}

.offer-search-objion ul {
  margin-top: 5.5px;
}

.offer-search-objion li:hover,.offer-search-objion li.hover {
  background-color: #57C5FF
}

.offer-search-objion li:hover a,.offer-search-objion li.hover a {
  color: #fff;
}

.offer-search-objion li a {
  font-family: SourceHanSansSC-Medium;
  font-size: 16px;
  color: #93AACB;
}

.mt9 {
  margin-top: 9px;
}

.mt14 {
  margin-top: 14px;
}

</style>
