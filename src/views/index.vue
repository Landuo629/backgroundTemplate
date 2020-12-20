<template>
  <div class="homebg">
    <br />
    <br />
  </div>
</template>
<style>
.content{
  padding: 0;
}
.homebg{
  /* background-image: url(" <li><a href="./blog-details.html">装修</a></li>"); */
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.hongbao_zanzhu {
  display: block;
  position: fixed;
  text-align: center;
  bottom: 336px;
  width: 230px;
  right: 0;
  font-size: 23px;
  color: #505458;
}
.hongbao {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 330px;
  width: 230px;
}
.zanzhulist{
  border:1px dashed gray;
  display: inline-block;
}
.zanzhutb  tr td:first-child{
  text-align: right;
}
.zanzhutb  tr td:nth-child(2){
  width:80px;
}
</style>
<script>
import apis from "@/apis/apis";
export default {
  data() {
    return {
      zanzhu:[]
    }
  },
  methods: {
    openZanZhu(){
      this.$common.OpenNewPage(this,'zanzhu');
    },
    getZanZhu(){
      apis.mayiApi.getZanZhu().then(res=>{
        if(res.status=="200"){
          if(res.data.dataList){
            this.zanzhu=res.data.dataList;
          }
        }
      }).catch(
        
      );
    },
    getDate(param){
      return this.$common.toDate(param);
    } 
  },
  mounted() {
    this.getZanZhu();
  },
  computed:{
    
  }
};
</script>
