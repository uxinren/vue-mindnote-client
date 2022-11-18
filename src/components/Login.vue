<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <div class="title">
              <h3 @click="showLogin" v-bind:class="{show:isShowLogin}">登录</h3>
              <h3 @click="showRegister" v-bind:class="{show:isShowRegister}">注册</h3>
            </div>
            <div class="form-wrapper" v-bind:class="{show:isShowLogin}">
              <transition name="slide">
                <div class="register">
                  <input type="text" placeholder="用户名" v-model="register.username">
                  <input type="password" placeholder="密码" v-model="register.password" @keyup.enter="onRegister">
                  <p>{{ register.notice }}</p>
                  <div class="button" @click="onRegister">创建账号</div>
                </div>
              </transition>
              <transition name="slide">
                <div class="login">
                  <input type="text" placeholder="输入用户名" v-model="login.username">
                  <input type="password" placeholder="密码" v-model="login.password" @keyup.enter="onLogin">
                  <p v-bind:class="{error:login.isError}">{{ login.notice }}</p>
                  <div class="button" @click="onLogin"> 登录</div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth.js";
import Bus from "@/helpers/bus.js";
import {mapGetters, mapState,mapActions} from "vuex";
export default {
  name: 'Login',
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false,
      login: {
        username: '',
        password: '',
        notice: '',
        isError: true
      },
      register: {
        username: '',
        password: '',
        notice: '',
        isError: false
      }
    }
  },
  methods: {
    ...mapActions({
      loginUser:'login',
      registerUser: 'register'
    }),
    showRegister() {
      this.isShowRegister = true
      this.isShowLogin = false
    },
    showLogin() {
      this.isShowLogin = true
      this.isShowRegister = false
    },
    onRegister() {
      let result1 = this.validUserName(this.register.username)
      if (!result1.isValid) {
        this.register.isError = true
        this.register.notice = result1.notice
        return
      }
      let result2 = this.validPassword(this.register.password)
      if (!result2.isValid) {
        this.register.isError = true
        this.register.notice = result2.notice
        return
      }
      this.register.isError = false
      this.register.notice = ''

      this.registerUser({
        username: this.register.username,
        password: this.register.password}).
      then(() => {
        this.register.isError = false
        this.register.notice = ''
        this.$router.push({path:'/notebooks'})
      }).catch(error=>{
        this.register.isError = true
        this.register.notice = error.msg
      })
    },
    onLogin() {
      let result1 = this.validUserName(this.login.username)
      if (!result1.isValid) {
        this.login.isError = true
        this.login.notice = result1.notice
        return
      }
      let result2 = this.validPassword(this.login.password)
      if (!result2.isValid) {
        this.login.isError = true
        this.login.notice = result2.notice
        return
      }
      this.loginUser({
        username: this.login.username,
        password: this.login.password})
      .then(() => {
        this.login.isError = false
        this.login.notice = ''
        // Bus.$emit('userInfo',{username:this.login.username})
        this.$router.push({path:'notebooks'})
      }).catch(error => {
        this.login.isError = true
        this.login.notice = error.msg
      })
    },
    validUserName(username) {
      return {
        isValid: /^[a-zA-Z_0-9\u4e00-\u9fa5]{3,15}$/.test(username),
        notice: '用户名必须是3~15个字符以内，限字母数字中文下划线'
      }
    },
    validPassword(password) {
      return {
        isValid: /^.{6,16}$/.test(password),
        notice: '密码必须是6~16个字符以内'
      }
    }
  }
}
</script>

<style scoped lang="less">
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;

  .main {
    flex: 1;
    background: #36bc64 url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center no-repeat;
    background-size: contain;
  }

  .form {
    width: 270px;
    border-left: 1px solid #ccc;
    overflow: hidden;

    .title {
      margin-top: 20px;
      display: flex;
      justify-content: center;

      h3 {
        width: 40%;
        text-align: center;
        padding: 10px 20px;
        font-weight: normal;
        font-size: 16px;
        cursor: pointer;
        &.show {
          border-bottom: 1px solid #2bb964;
        }
      }
      &:nth-of-type(2) {
        border-bottom: 1px solid #eee;
      }
    }

    .button {
      background-color: #2bb964;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 18px;
      cursor: pointer;
    }

    .form-wrapper {
      display: flex;
      margin-left: 0;
      width: 200%;
      transition: margin-left 0.9s;

      &.show {
        margin-left: -100%;
      }

      .login, .register {
        width: 50%;
        border-top: 1px solid #eee;
        padding: 0 20px;
        overflow: hidden;


        input {
          display: block;
          width: 100%;
          height: 35px;
          line-height: 35px;
          padding: 0 6px;
          border-radius: 4px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 14px;
          margin-top: 16px;
        }

        input:focus {
          border: 3px solid #9dcaf8;
        }

        p {
          font-size: 12px;
          margin-top: 10px;
          color: #444;
        }

        .error {
          color: red;
        }
      }
    }
  }
}
</style>

