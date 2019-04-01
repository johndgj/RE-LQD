<template>
    <div>
        <div class="index-banner">
            <h2>OWN A PIECE OF IT.</h2>
            <p class="mt20">YOU CAN NOW OWN AND TRADE PARTS OF PROPERTIES </p>
            <p>ACROSS THE WORLD - EASILY, SECURELY AND</p>
            <p>INEXPENSIVELY.</p>
            <div class="index-banner-down"></div>
        </div>
        <div class="index-tab1-1" id="howitwork">
            <div class="main-width clear">
                <h1 class="index-tab-h1">Buy tokens backed by real estate across the world with as little as $100.</h1>
                <p class="index-tab-p">RE:LQD securely tokenizes commercial properties worldwide. Buying and selling property is done with ease, unlocking a level of liquidity that has <br> never  been seen before in real estate.</p>
            </div>
        </div>
        <div class="index-tab2">
            <div class="main-width">
                <div class="index-tab2-li">
                    <div class="p20">
                        <h2>Why RE:LQD</h2>
                        <div class="itb2-line"></div>
                        <p>Placeholder text for competitive advantage
                            <br> (technology, user focus, team with
                            <br> blockchain & legal expertise) and how it
                            <br>differs from REITS and other companies
                            <br>(include Cayman-based advantage) </p>    
                    </div>
                </div>
                <div class="index-tab2-li">
                    <div class="p20">
                        <h2>What's the technology?</h2>
                        <div class="itb2-line"></div>
                        <p>RE:LQD draws on blockchain technology, including smart contracts that integrate and automate jurisdiction-specific compliance and complex real estate processes, greatly reducing fees and transaction timelines.</p>
                    </div>
                </div>
                <div class="index-tab2-li" style="margin-right: 0;">
                    <div class="p20">
                        <h2>How do I participate?</h2>
                        <div class="itb2-line"></div>
                        <p>RE:LQD launches early Q2 and will be open to all non-US persons. Follow our blog for updates on featured RE:LQD properties and to join our countdown to the big launch! </p> 
                    </div>
                </div>
            </div>
        </div>
        <div class="main-width ">
            <div class="index-tab3">
                <div class="index-tab3-con">
                    <span class="itb3-l"></span>
                    <span class="itb3-r"></span> Our vision is to make commercial real estate investment accessible for people in every corner of the world. All you’ll need is a little cash or crypto and a smartphone to own and trade properties in and outside of the US.
                </div>
                <div class="index-tab3-name">
                    <span class="itb3-line"></span> XYX, CEO of RE:LQD
                </div>
            </div>
        </div>
        <div class="index-tab4">
            <div class="itb4-line-top"></div>
            <div class="itb4-line-bottom"></div>
            <div class="main-width ">
                <div class="index-tab4-fl">
                    <div class="itb4-li">
                        <div class="p20">
                            <img src="../static/img/itb4-1.png" class="itb4-img">
                            <h2>User Focused</h2>
                            <div class="itb4-line"></div>
                            <p>Investors can buy and trade real estate securely and easily
                                <br> anywhere they are.</p>
                        </div>
                    </div>
                    <div class="itb4-li">
                        <div class="p20">
                            <img src="../static/img/itb4-2.png" class="itb4-img">
                            <h2>Caymans Built</h2>
                            <div class="itb4-line"></div>
                            <p>Based in the Caymans, RE:LQD follows local laws which enable
                                <br> investment opportunities in select jurisdictions without lock-up
                                <br> periods. Country specific real estate compliance is integrated into
                                <br> smart contract technology.</p>
                        </div>
                    </div>
                </div>
                <div class="index-tab4-fr">
                    <div class="itb4-li">
                        <div class="p20">
                            <img src="../static/img/itb4-3.png" class="itb4-img">
                            <h2>Blockchain Powered</h2>
                            <div class="itb4-line"></div>
                            <p>Decentralized technology, built by leading blockchain technologist, powers the intuitive site and mobile app to allow for easy trading
                                <br> and fair pricing.</p>
                        </div>
                    </div>
                    <div class="itb4-li">
                        <div class="p20">
                            <img src="../static/img/itb4-4.png" class="itb4-img">
                            <h2>Asset Backed</h2>
                            <div class="itb4-line"></div>
                            <p>Check out our growing list of commercial property listings on
                                <br> RE:LQD</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import '../static/css/home.css'
export default {
    name: 'home',
    data() {
        return {}
    },
    created() {
        if(this.$route.params.anchor == 'HowItWork'){
            //存在苗点
            console.log('asd');
            window.location.hash = "#howitwork";
        }
    },
    methods: {

        goToLink() {
            let _this = this;
            setTimeout(function() {
                _this.$router.push({
                    name: 'home2',
                    params: {
                        id: '2'
                    }
                });
            }, 200);

        }

    }
}
</script>
<style scoped>

</style>
