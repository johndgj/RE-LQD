<template>
    <div>
        <footer class="c-footer">
        <div class="main-width">
<!--             <div class="clear">
                <div class="footer-li fl">
                    <h2>ABOUT US</h2>
                    <div class="footer-line"></div>
                    <div><a href="#" class="footer-link">news</a></div>
                    <div><a href="#" class="footer-link">Career Opportunities</a></div>
                </div>
                <div class="footer-li fl">
                    <h2>LEGAL PROVISIONS</h2>
                    <div class="footer-line"></div>
                    <div><a href="#" class="footer-link">Terms of Service</a></div>
                    <div><a href="#" class="footer-link">Privacy Policy</a></div>
                </div>
                <div class="footer-li fl">
                    <h2>CONTACT US</h2>
                    <div class="footer-line"></div>
                    <div><a href="#" class="footer-link">customer service</a></div>
                    <div><a href="#" class="footer-link">Provide listings</a></div>
                </div>
            </div> -->
            <div class="footer-res">
                <img src="../static/img/Logo.png">
                <span>*US buyers are currently excluded from the RE:LQD platform</span>
                <div class="fr tr footer-share">
                    <a href="#"><img src="../static/img/EM.png"></a>
                    <a href="#"><img src="../static/img/TW.png"></a>
                    <a href="#"><img src="../static/img/FB.png"></a>
                </div>
            </div>
        </div>
    </footer>
    </div>
</template>
<script>
export default {
    name: 'footerView',
    data() {
        return {
            msg:""
        }
    },

    methods: {

    }
}
</script>
<style>
.c-footer{width:100%;height:66px;background:#FFFFFF;padding-top: 24px;}
.footer-li{width:340px;padding-top:30px;}
.footer-li h2{font-family:SourceHanSansSC-Bold;font-size:24px;color:#212D3E;}
.footer-line{margin-top:6px;width:50px;height:4px;background:#57C5FF;border-radius:2px;margin-bottom:8px;}
.footer-link{font-family:SourceHanSansSC-Regular;font-size:18px;color:#212D3E;line-height:33px;}
.footer-link:hover{color:#57C5FF;}
.footer-res{height:38px;line-height:38px;}
.footer-res span{font-family:SourceHanSansSC-Regular;font-size:19px;color:#93AACB;text-align:center;margin-left:10px;}
.footer-share a{margin-left:60px;}
</style>
