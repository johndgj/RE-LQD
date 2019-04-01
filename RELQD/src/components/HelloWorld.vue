<template>
    <div class="hello">
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
        <div>
            <BaseButton style="background-color:#9D3D9C;color:#fff;">Base</BaseButton>
            <TypeButton @click="defaul" type="defaul">defaul</TypeButton>
            <TypeButton @click="primary" type="primary">primary</TypeButton>
            <TypeButton @click="info" type="info">info</TypeButton>
            <TypeButton @click="success" type="success">success</TypeButton>
            <TypeButton @click="warning" type="warning">warning</TypeButton>
            <TypeButton @click="danger" type="danger">danger</TypeButton>
        </div>
        <h1>{{ msg }}</h1>
        <h2>Essential Links11122</h2>
        <ul>
            <li>
                <a href="https://vuejs.org" target="_blank">
          Core Docs
        </a>
            </li>
            <li>
                <a href="https://forum.vuejs.org" target="_blank">
          Forum
        </a>
            </li>
            <li>
                <a href="https://chat.vuejs.org" target="_blank">
          Community Chat
        </a>
            </li>
            <li>
                <a href="https://twitter.com/vuejs" target="_blank">
          Twitter
        </a>
            </li>
            <br>
            <li>
                <a href="http://vuejs-templates.github.io/webpack/" target="_blank">
          Docs for This Template
        </a>
            </li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li>
                <a href="http://router.vuejs.org/" target="_blank">
          vue-router
        </a>
            </li>
            <li>
                <a href="http://vuex.vuejs.org/" target="_blank">
          vuex
        </a>
            </li>
            <li>
                <a href="http://vue-loader.vuejs.org/" target="_blank">
          vue-loader
        </a>
            </li>
            <li>
                <a href="https://github.com/vuejs/awesome-vue" target="_blank">
          awesome-vue
        </a>
            </li>
        </ul>
    </div>
</template>
<script>
import TypeButton from './TypeButton.vue'
import BaseButton from './BaseButton.vue'

export default {
    name: 'HelloWorld',
    data() {
        return {
            propertyUrl: productsPropertyLink, //筛选条件的json地址
            msg: 'Welcome to Your Vue.js App',
            params: {
                pageCon: 10, //一页数量
                pageNum: 0, //页码
                kedWord: "",
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

            _this.$http.get(productsPropertyLink, _this.params).then(function(response) {　　 //请求成功

                console.log(response.data);

            }).catch(function(error) {　　 //请求失败

            });
        },
        defaul() {
            console.log('defaul')
        },
        primary() {
            console.log('primary')
        },
        info() {
            console.log('info')
        },
        success() {
            console.log('success')
        },
        warning() {
            console.log('warning')
        },
        danger() {
            console.log('danger')
        },
    },
    components: {
        TypeButton,
        BaseButton
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
