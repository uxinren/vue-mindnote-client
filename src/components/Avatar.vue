<template>
    <span :title="username">{{slug}}</span>
  </template>

<script>
import Auth from '@/apis/auth';
import {mapGetters,mapActions} from 'vuex'
import {methods} from "babel-plugin-transform-runtime/lib/definitions";
    export default {
    data() {
        return {}
      },
      created() {
      //监听用户名称
      // Bus.$on('userInfo',user=>{
      //   this.username = user.username
      // })
      // Auth.getInfo()
      //     .then(res => {
      //     if (res.isLogin){
      //       this.username = res.data.username
      //     }
      // })
        this.checkLogin()
      },
      methods:{
      ...mapActions([
          'checkLogin'
      ])
      },
      computed: {
      ...mapGetters([
         'username',
         'slug'
      ])
      // slug(){
      //   return this.username.charAt(0)
      //   }
      }
  }
</script>

<style scoped>

span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
