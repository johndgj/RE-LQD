<template>
    <div class="offer-left">
        <h2 class="offer-left-tit">FILTER</h2>
        <div class="offer-left-t2 mt17">CITY</div>
        <ul class="offer-left-ul">
            <li @click="fClick(item,'city')" v-for="(item,index) in city" :key="index" v-bind:class="{'hover': cityHover ==  item}"><a href="#">{{item}}</a></li>
        </ul>
        <div class="offer-left-t2 mt30">PROPERTY TYPE</div>
        <ul class="offer-left-ul">
            <li @click="fClick(item,'property')" v-for="(item,index) in property" :key="index" v-bind:class="{'hover': propertyHover ==  item }"><a href="#">{{item}}</a></li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'OfferingsLeft',
    data() {
        return {
            city:['New York','London','Shenzhen','Tokyo'],
            property:['Commercial','Industrial','Residential'],
            cityHover:"",
            propertyHover:""
        }
    },
    methods: {
    /**
     * [loadDate 选择参数]
     *
     * @return {[type]} [description]
     */
       fClick(val,type){
            let obj = {
                "filterType":type,
                "value":val
            }
            if(type == 'city'){
                this.cityHover = val;
            }else{
                this.propertyHover = val;
            }
            this.$emit('filterComClick', obj); //触发父组建的方法
        }
    }
}
</script>
<style>
.offer-left {
    width: 180px;
    top: 0;
    left: 10px;
    position: absolute;
}

.offer-left-tit {
    font-family: SourceHanSansSC-Bold;
    font-size: 20px;
    color: #212D3E;
    line-height: 29px;
}

.offer-left-t2 {
    font-family: SourceHanSansSC-Bold;
    font-size: 12px;
    color: #57C5FF;
    line-height: 17px;
    border-bottom: 2px solid #57C5FF;
    padding-bottom: 2.5px;
}

.offer-left-ul li {
    height: 24px;
    line-height: 24px;
}

.offer-left-ul li a {
    font-family: SourceHanSansSC-Medium;
    font-size: 16px;
    color: #93AACB;
}

.offer-left-ul li:hover a,.offer-left-ul li.hover a {
    color: #FF7474
}

.mt17 {
    margin-top: 17px;
}

.mt30 {
    margin-top: 30px;
}
</style>
