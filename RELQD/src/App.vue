<template>
  <div id="app">
    <headerView :isSinglePage="isSinglePageFun($route.name)" :isLogin="isHasToken()" :isHome="$route.name == 'home'"></headerView>
    <el-scrollbar class="main-scroll" :style="{ width: '100%', height: curHeight + 'px' }">
      <router-view />
      <footerView></footerView>
    </el-scrollbar>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  name: 'App',
  data() {
    return {
      curHeight: 0
    }
  },
  created() {},
  mounted() {
    // 获取浏览器可视区域高度
    this.getHeight(60)
    let _this = this;
    window.onresize = function temp() {
      _this.getHeight(60)
    };
  },
  methods: {
    getHeight(height) {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight = h - height; //减去页面上固定高度height
    },
    isSinglePageFun(thisNAme) {
      if (thisNAme == 'home' || thisNAme == 'disclaimers' || thisNAme == 'contactus') {
        return true;
        console.log('1');
      } else {
        return false;
        console.log('0');
      }
    },
    //判断是否已经登陆
    isHasToken() {
        if(Cookies.get('token')){
            return true;
        }else{
            return false;
        }
    },
  }

}

</script>
<style>
/*css reset*/

* {
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-family: Arial, Verdana;
  word-break: break-all;
}

@font-face {
  font-family: 'SourceHanSansSC-Regular';
  src: url('./static/font/SourceHanSansK-Regular-subfont.ttf');
}

@font-face {
  font-family: 'SourceHanSansSC-Bold';
  src: url('./static/font/SourceHanSansK-Bold-subfont.ttf');
}

@font-face {
  font-family: 'SourceHanSansSC-Heavy';
  src: url('./static/font/SourceHanSansK-Heavy-subfont.ttf');
}

@font-face {
  font-family: 'SourceHanSansSC-Medium';
  src: url('./static/font/SourceHanSansK-Medium-subfont.ttf');
}

@font-face {
  font-family: 'LeagueGothic-Regular';
  src: url('./static/font/LeagueGothic-Regular.ttf');
}

html,
body {
  margin: 0;
  /*height: 100%;*/
}

table {
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
}

thead {
  display: table-header-group;
}

th {
  border: 1px solid #e2e2e2;
  font-size: 14px;
  line-height: 20px;
  min-height: 20px;
  padding: 9px 0;
}

tbody {
  display: table-row-group;
}

.m20 {
  margin: 20px;
}

.p20 {
  padding: 20px;
}

.p10 {
  padding: 10px;
}

.pt30 {
  padding-top: 30px;
}

.m10 {
  margin: 10px;
}

.mt10 {
  margin-top: 10px;
}

.mt15 {
  margin-top: 15px;
}

.mt20 {
  margin-top: 20px;
}

.ml30 {
  margin-left: 30px;
}

.ml10 {
  margin-left: 10px;
}

.mr10 {
  margin-right: 10px;
}

.mt30 {
  margin-top: 30px;
}

.mt40 {
  margin-top: 40px;
}

a {
  outline: none;
}

:focus {
  outline: 0;
}

.cupoint {
  cursor: pointer;
}

.tc {
  text-align: center;
}

.tr {
  text-align: right;
}

.tl {
  text-align: left;
}

img {
  border: 0;
  vertical-align: middle;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

li {
  list-style: none;
}

.fr {
  float: right;
}

.fl {
  float: left;
}

.m0a {
  margin: 0 auto;
}

.bg-white {
  background-color: white;
}

.webp {
  display: none;
}

.ofh {
  overflow: hidden;
}

.pa {
  position: absolute;
}

.pr {
  position: relative;
}

.ofa {
  overflow: auto;
}

.owt {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.clear {
  *height: 1%;
  _height: 1%;
  *zoom: 1;
  *float: none;
  display: inline-table;
  display: block;
}

.clear:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

.main-width {
  width: 1020px;
  margin: 0 auto;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
  orphans: 3;
  widows: 3;
}

.hiddom {
  display: none;
}

.app-bg {
  background-color: #f2f3fa;
}

.main-div {
  padding: 10px;
}

.bcolo {
  color: #57C5FF;
}

.gcolo {
  color: #7ECE58;
}

.hcolo {
  color: #4C5663;
}

.pcolo {
  color: #FF7474;
}

.zcolo {
  color: #93AACB;
}

.dbcolo {
  color: #212D3E
}

.qhcolo {
  color: #93AACB
}

.pinkcolor {
  color: #FF7474
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


/*解决滚动条bug*/

.el-scrollbar__wrap {
  overflow-x: auto;
}

.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}


/*改变滚动条颜色*/

.scro .el-scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(87, 197, 255, 1);
  -webkit-transition: .3s background-color;
  transition: .3s background-color
}

.scro .el-scrollbar__thumb:hover {
  background-color: rgba(87, 197, 255, .5)
}

.main-scroll .el-scrollbar__thumb,
.login-page .el-scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(87, 197, 255, 1);
  -webkit-transition: .3s background-color;
  transition: .3s background-color
}




.main-scroll {
  margin-top: 60px;
}

/*公用文章详细*/
.spa-conetnt {
  padding-top: 65px;
  background: #EEF0F3;
  padding-bottom: 45px;
  border-bottom: 1px solid #F0F0F0;
}

.spa-conetnt h1 {
  font-family: SourceHanSansSC-Heavy;
  font-size: 28px;
  color: #212D3E;
  text-align: center;
  line-height: 40px;
  margin-bottom: 43px;
}

.spa-conetnt div {
  margin-bottom: 30px;
}

.spa-conetnt div p {
  font-family: SourceHanSansSC-Regular;
  font-size: 18px;
  color: #212D3E;
  text-align: justify;
  line-height: 30px;
}

/*重构弹出框*/
.el-dialog__title {
  font-family: SourceHanSansSC-Bold;
  font-size: 40px;
  line-height: 30px;
  color: #212D3E;
}

.el-dialog {
  background: #fafafa
}

.el-dialog__header {
  padding: 20px 20px 0 20px;
  text-align: left;
}

.el-dialog__body {
  padding: 20px;
}

</style>
