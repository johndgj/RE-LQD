
/*
----------连接配置文件--------

开发状态：dev开发   build发布

接口仓库：阿里巴巴RAP   http://rap2.taobao.org
 */
 
//devState = 'dev';
devState = 'build';

//注册：填写密码提交返回文件等信息
registeLink =  devState == 'dev' ? '/api/registeLink' : './json/registeLink.json';
//登陆
loginLink =  devState == 'dev' ? '/api/loginLink' : './json/loginLink.json';
//offerings列表
offeringsLink =  devState == 'dev' ? '/api/offerings' : './json/offerings.json';
//offerings详细
offeringsDetailLink =  devState == 'dev' ? '/api/offeringsDetail' : './json/offeringsDetail.json';
//offerings购买
offeringsBuyLink =  devState == 'dev' ? '/api/offeringsBuy' : './json/offeringsBuy.json';
//trade列表
tradeLink =  devState == 'dev' ? '/api/trade' : './json/trade.json';
//trade详细
tradeDetailLink =  devState == 'dev' ? '/api/tradeDetail' : './json/tradeDetail.json';
//trade购买
tradeBuyLink = devState == 'dev' ? '/api/tradeBuy' : './json/tradeBuy.json';
//myholdings列表
myholdingsLink =  devState == 'dev' ? '/api/myholdings' : './json/myholdings.json';


