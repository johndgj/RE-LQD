import Vue from 'vue'
import Router from 'vue-router'
import homeView from '../view/home'
import offeringsView from '../view/offerings'

import tradeDetailView from '../view/tradeDetail'
import offeringsDetailView from '../view/offeringsDetail'


import myHoldingsView from '../view/myHoldings'

import tradeView from '../view/trade'

import disclaimersView from '../view/disclaimers'
import contactusView from '../view/contactus'



Vue.use(Router)

//如首页和登录页和一些不用权限的公用页面    meta参数：role权限 -member 需要登陆
export default new Router({
    routes: [{
        path: '/',
        redirect: {
            name: 'home'
        },
        title: "default-Home-Page",
        meta: { role: []}
    }, {
        path: '/home',
        name: 'home',
        component: homeView,
        title: "Home-Page",
        meta: { role: []}
    },{
        path: '/disclaimers',
        name: 'disclaimers',
        component: disclaimersView,
        title: "disclaimers-Page",
        meta: { role: []}
    }
    ,{
        path: '/contactus',
        name: 'contactus',
        component: contactusView,
        title: "contactus-Page",
        meta: { role: []}
    }
   , {
        path: '/offerings',
        name: 'offerings',
        component: offeringsView,
        title: "offerings-Page",
        meta: { role: ['member']}
    }, {
        path: '/offeringsDetail/:id',
        name: 'offeringsDetail',
        component: offeringsDetailView,
        title: "offeringsDetail-Page",
        meta: { role: ['member']}
    },{
        path: '/trade',
        name: 'trade',
        component: tradeView,
        title: "trade-Page",
        meta: { role: ['member']}
    }, {
        path: '/tradeDetail/:id',
        name: 'tradeDetail',
        component: tradeDetailView,
        title: "tradeDetail-Page",
        meta: { role: ['member']}
    },{
        path: '/myHoldings',
        name: 'myHoldings',
        component: myHoldingsView,
        title: "myHoldings-Page",
        meta: { role: ['member']}
    }
    

    ]
})
