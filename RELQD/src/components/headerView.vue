<template>
  <div>
    <div class="header-fix">
      <header class="c-header">
        <a href="#" @click="goToLink('home')" class="c-header-logo fl"><img src="../static/img/Logo.png"></a>
        <ul class="header-nav clear" v-if="!isSinglePage">
          <li @click="goToLink('offerings')" :class="{ hover: $route.name == 'offerings' }"><a href="#">OFFERINGS</a>
            <span></span>
          </li>
          <li @click="goToLink('trade')" :class="{ hover: $route.name == 'trade' }">
            <a href="#">TRADE</a>
            <span></span>
          </li>
          <li @click="goToLink('myHoldings')" :class="{ hover: $route.name == 'myHoldings' }">
            <a href="#">MY HOLDINGS</a>
            <span v-if="$route.name == 'myHoldings'"></span>
            <div class="nav-wallet-ab" v-if="$route.name != 'myHoldings'">
              <div class="nav-wallet"><i></i>
                <div class="nav-wallet-span">{{member.ethBalance}} ETH</div>
              </div>
            </div>
          </li>
        </ul>
        <ul class="header-nav clear" v-if="isSinglePage" style="margin-left:-272px;">
          <li @click="goToHowItWork('home')" v-if="!isHome">
            <a href="#">HOW IT WORKS</a>
            <span></span>
          </li>
          <li v-if="isHome">
            <a href="#howitwork" id="howitworkLink">HOW IT WORKS</a>
            <span></span>
          </li>
          <li @click="goToLink('disclaimers')" :class="{ hover: $route.name == 'disclaimers' }">
            <a href="#">DISCLAIMERS</a>
            <span></span>
          </li>
          <li @click="goToLink('contactus')" :class="{ hover: $route.name == 'contactus' }">
            <a href="#">CONTACT US</a>
            <span></span>
          </li>
        </ul>
        <div class="user-info" v-if="isLogin"  @click="goToLink('offerings')">
          <div class="user-info-pr">
            <h2>ETH/USD</h2>
            <p>136.18</p>
          </div>
        </div>
        <div class="user-lang" v-if="isLogin">
          <div class="user-lang-pr">
            <img src="../static/img/Shape.png">EN
          </div>
        </div>
        <BaseButton class="c-header-btn" @click="loginDialogNum = 1;dialogLoginVisible = true" v-if="!isLogin">Go To Platform</BaseButton>
      </header>
    </div>
    <el-dialog :title="getDialogTitle()" :visible.sync="dialogLoginVisible" width="538px" :before-close="handleClose">
      <!-- 注册阅读 -->
      <div v-show="loginDialogNum == 1">
        <div class="login-div m0a">
          <div class="login-page-tips-top"></div>
          <div class="login-page-tips-bottom"></div>
          <el-scrollbar class="login-page" style="width:100%;height:280px">
            <agreement></agreement>
          </el-scrollbar>
        </div>
        <div class="login-btn-div m0a pt30">
          <BaseButton class="login-con-btn" @click="loginDialogNum = 2">AGREE AND CONTINUE</BaseButton>
        </div>
      </div>
      <!-- 注册或登录 -->
      <div v-show="loginDialogNum == 2">
        <div class="login-btn-div m0a">
          <div class="login-tab">
            <ul class="clear">
              <li v-bind:class="[formType =='credit' ? 'hover' : '', 'login-tab1']" @click="formType ='credit'">
                Create
              </li>
              <li v-bind:class="[formType !='credit' ? 'hover' : '', 'login-tab2']" @click="formType ='existed';existed.isUploadFile=false">
                Existed
              </li>
            </ul>
          </div>
          <div v-if="formType =='credit'">
            <div class="credit-tips">
              Password
            </div>
            <div class="credit-input">
              <input type="password" v-model="credit.form.password">
            </div>
            <div class="credit-tips">
              Re-enter Password
            </div>
            <div class="credit-input">
              <input type="password" v-model="credit.form.repassword">
            </div>
            <div class="credit-tips">
              Please enter a password between 9 - 20 characters for your new wallet.
            </div>
            <div class="login-btn-div m0a pt20">
              <BaseButton class="login-con-btn" @click="resigterEnter">OK</BaseButton>
            </div>
            <div class="credit-tips" style="color:#eba222" v-if="credit.isPassWorng">
              Please check if the password meets the requirements.
            </div>
          </div>
          <div v-if="formType =='existed'">
            <div class="credit-tips">
              Keystore file
            </div>
            <!-- 文件上传 -->
            <el-upload class="upload-demo" ref="upload" :action="existed.postUrl" :show-file-list="false" :file-list="fileList" :auto-upload="false" :on-change="selectKey" :on-success="loginSucces" :data="existed.form">
              <div class="login-btn-div m0a pt20" v-if="!existed.isUploadFile">
                <BaseButton slot="trigger" type="primary" class="login-con-btn">Click to upload</BaseButton>
              </div>
              <div class="login-btn-div m0a pt20" v-if="existed.isUploadFile">
                <BaseButton class="access-file-btn"><img src="../static/img/right-ok.png"></BaseButton>
              </div>
            </el-upload>
            <div class="credit-tips">
              Password
            </div>
            <div class="credit-input pr">
              <input :type="existed.isShowPas ? 'text' : 'password'" v-model="existed.form.password">
              <i v-bind:class="[existed.isShowPas ? 'show-pass' : 'hide-pass']" @click="existed.isShowPas=!existed.isShowPas"></i>
            </div>
            <div class="credit-tips tr">
              <span>Forgot password?</span>
            </div>
            <div class="login-btn-div m0a pt20">
              <BaseButton class="login-con-btn" @click="loginEnter">OK</BaseButton>
            </div>
            <div class="credit-tips" style="color:#eba222" v-if="existed.loginInfoIsWorng">
              Please fill in the information as required.
            </div>
          </div>
        </div>
      </div>
      <!-- 注册同意 -->
      <div v-show="loginDialogNum == 3">
        <div class="login-btn-div m0a">
          <div class="regit-agree">
            <p>We recommend you to save your KeyStore File safely in a secured file ( or an external disk) on this device. It is encrypted by your password for authorization certificates to tranfer on RE:LQD platform. Please remember:</p>
            <br>
            <p>· Do not lose this KeyStore File, as it cannot be recovered.</p>
            <p>· Do not share this KeyStore File, unless your password strong enough.</p>
            <div class="reg-checkbox">
              <el-checkbox v-model="credit.isAgreeRes">I have read and understand.</el-checkbox>
            </div>
            <div class="login-btn-div m0a pt20" v-if="!credit.isAgreeRes">
              <BaseButton class="no-agree-btn">Download keystore file on this device</BaseButton>
            </div>
            <div class="login-btn-div m0a pt20" v-if="credit.isAgreeRes">
              <BaseButton class="login-con-btn" @click="downloadKey">Download keystore file on this device</BaseButton>
            </div>
          </div>
        </div>
      </div>
      <!-- 注册成功 -->
      <div v-show="loginDialogNum == 4">
        <div class="login-btn-div m0a">
          <div class="regit-agree">
            <p>Customer Identification and Verification</p>
            <p>To the extent reasonable and practicable, we will ensure that we have a reasonable belief that we know the true</p>
            <p>identity of our customers by verifying and documenting the accuracy of the information we receive about our</p>
            <p>customers. In verifying customer identity, we will analyze any logical inconsistencies in the information we obtain.</p>
            <br>
            <p>Simply few steps on xxxx to finish this process.</p>
          </div>
          <div class="login-btn-div m0a pt30">
            <BaseButton class="login-con-btn" @click="regOrLoginOK">OK</BaseButton>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import '../static/css/header.css'
import BaseButton from '../components/BaseButton.vue'
import Cookies from 'js-cookie'
export default {
  name: 'headerView',
  data() {
    return {
      fileList: [], //文件上传的文件列表
      dialogLoginVisible: false, //是否显示弹出层
      loginDialogNum: 1, //显示第几个弹出层
      formType: 'credit', //credit  existed 判断该表单是注册还是登陆
      credit: {
        form: {
          password: '', //密码
          repassword: '', //重复密码
        },
        isPassWorng: false, //填写的密码是否错误
        isAgreeRes: false, //是否同意协议
        downLoadUrl: '', //注册返回的key文件
      },
      existed: {
        loginInfoIsWorng: false, //登陆时候判断是否已经上传文件和填写密码
        isShowPas: false, //输入密码是是否明文
        postUrl: loginLink, //登陆提交的路径
        isUploadFile: false, //登陆的话是否上传了文件
        form: {
          password: '' //密码
        }
      },
      member:{
        ethBalance:Cookies.get('ethBalance')
      }

    }
  },
  props: ['isSinglePage', 'isHome', 'isLogin'], //用作顶部菜单的变化
  methods: {

    //获取弹出框的标题
    getDialogTitle() {
      if (this.loginDialogNum == 1) {
        return 'DECLAIMER';
      }
      if (this.loginDialogNum == 2) {
        return 'MY WALLET';
      }
      if (this.loginDialogNum == 3) {
        return 'CREATED';
      }
      if (this.loginDialogNum == 4) {
        return 'VERIFICATION';
      }
    },
    //顶部的描点
    goToHowItWork(pageNAme) {
      let _this = this;
      setTimeout(function() {
        _this.$router.push({
          name: pageNAme,
          params: {
            anchor: 'HowItWork'
          }
        });
      }, 200);
    },

    //上传文件,并提交到服务器
    loginEnter() {
      if (this.existed.isUploadFile && this.existed.form.password.length > 0) {
        //this.existed.loginInfoIsWorng = false;
        this.$refs.upload.submit();
      } else {
        console.log('response');
        this.existed.loginInfoIsWorng = true;
      }

    },
    //上传文件post成功后返回的信息
    loginSucces(response, file, fileList) {

      //console.log(response);
      this.setMemberInfo(response.token,response.totalDividends,response.totalAssets,response.dividendsOfThisMonth,response.ethBalance,response.receiveImg,response.receiveCode)

      this.regOrLoginOK(); //跳转会员的页面
    },
    //上传key文件时改变状态
    selectKey() {
      //console.log(this.fileList);
      this.existed.isUploadFile = true
    },
    //输入密码并注册
    resigterEnter() {

      let pas = this.credit.form.password;
      let repas = this.credit.form.repassword;
      let _this = this;
      //9-20个字符之间的密码  , 并相等
      if (pas.length > 8 && pas.length < 21 && pas == repas) {
        //提交请求 返回key文件等
        _this.$http.get(registeLink, _this.credit.form).then(function(response) { //请求成功

          if (response.status == '200') {

            _this.credit.downLoadUrl = response.data.data.kefFile; //下载key文件

            _this.setMemberInfo(response.data.data.token,response.data.data.totalDividends,response.data.data.totalAssets,response.data.data.dividendsOfThisMonth,response.data.data.ethBalance,response.data.data.receiveImg,response.data.data.receiveCode)

            _this.loginDialogNum = 3;
          }

        }).catch(function(error) { //请求失败

        });

      } else {
        this.credit.isPassWorng = true;
      }
    },
    //设置会员登陆的信息
    setMemberInfo(token,totalDividends,totalAssets,dividendsOfThisMonth,ethBalance,receiveImg,receiveCode){

       Cookies.set('token', token); 
       Cookies.set('totalDividends', totalDividends); 
       Cookies.set('totalAssets',totalAssets ); 
       Cookies.set('dividendsOfThisMonth',dividendsOfThisMonth ); 
       Cookies.set('ethBalance',ethBalance ); 
       Cookies.set('receiveImg',receiveImg ); 
       Cookies.set('receiveCode',receiveCode ); 
    },
    //下载key文件
    downloadKey() {
      window.location.href = this.credit.downLoadUrl; // 下载key
      //console.log(this.credit.downLoadUrl)
      this.loginDialogNum = 4;
    },
    //注册/登陆成功并跳转
    regOrLoginOK() {

      this.resetSatue();
      this.goToLink('offerings');
    },
    //重置页面的状态
    resetSatue() {
      this.credit.isAgreeRes = false;
      this.existed.isUploadFile = false;
      this.credit.isPassWorng = false;
      this.credit.downLoadUrl = '';
      this.existed.loginInfoIsWorng = false;
      this.formType = 'credit';
      this.dialogLoginVisible = false;
    },
    //关闭探出层
    handleClose(done) {
      this.resetSatue()
      done();
    },
    //通用跳转
    goToLink(pageNAme) {
      let _this = this;
      setTimeout(function() {
        _this.$router.push({
          name: pageNAme,
          params: {}
        });
      }, 200);
    },

  },
  components: {

    BaseButton
  }
}

</script>
<style>
</style>