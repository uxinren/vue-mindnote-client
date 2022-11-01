# 项目开发步骤
开发过程问题： 
* 身份鉴权时，不保存cookie；
```
1. 域名设置为https
2. 修改build/webpack.dev.conf 文件，在devServer里添加https: true,
3. 执行 npm start， 浏览器输入 https://localhost:8080 。注意是https， 不是 http。
4. 出现不是私密链接时，在当前页面用键盘输入 thisisunsafe ，
```
* data里的数组值修改成功，
## 一、项目初始化
    
### 1. 全局安装vue-cli
```
npm install -g vue-cli@2.9.1
```
### 2. 创建模板
```
vue init webpack vue-evernote-client
```
### 3. 项目所需模块
* less样式
```
npm install --save-dev less-loader@4
```
* vue数据调试插件：谷歌搜索Vue.js devtools
* axios:基于promise的HTTP库
```
  npm install --save axios@0.18.0
  ```
## 二、项目路由搭建
### 1. 新建所有页面
* 注册登录页
* 笔记本列表页
* 笔记详情页
* 回收站笔记详情页
### 2. 配置router页面关系
```js
  routes: [
    {
      path: '/',
      component: HelloWorld},
    {
      path: '/login',
      component: Login},
    {
      path: '/notebooks',
      component: Notebooks},
    {
      path: '/note/:noteId',
      component: Note},
    {
      path: '/trash/:noteId',
      component: Trash}
  ]

```
## 三、样式与组件调试
### 1. 侧边栏组件
1. 新增 sidebar组件
2. App.vue 里引入 sidebar 组件
3. 添加 sidebar 样式
```js
//方法:点击调用登出方法,引用身份鉴权公共组件。
 logout(){
      Auth.getInfo()
      .then(data => {
        console.log(data);
      })
    }
```

#### 侧边栏头像
1. 封装 Avatar 组件
```
数据：返回user{username},头像
```
2. Sidebar 组件引入 Avatar 组件

### 2. 登录组件 
1. data、methods 的用法 
```
数据：
注册模块/登录模块是否展示布尔值
登录模块对象：{用户名,密码,错误提示,是否错误控制值}
注册模块对象：{用户名,密码,错误提示,是否错误控制值}
方法：
注册模块展示方法
登录模块展示方法
点击登录验证方法
点击注册验证方法
```
2. 交互、校验的实现 ：添加合理动效
### 3. 生命周期与事件传递
#### 3.1登录后跳转默认页
```js
this.$router.push({path:'notebooks'})
```
#### 3.2未登录跳转登录页
```js
created() {
    Auth.getInfo()
        .then(res =>{
          if (!res.isLogin){
            this.$router.push({path:'/login'})
          }
        })
  }
```
#### 3.3获取用户信息
```js
//触发数据名称发生改变
Bus.$emit('userInfo',{username:this.login.username})
//监听用户名称发生变化
Bus.$on('userInfo',user=>{
    this.username = user.username
})
```

## 接口封装
### 请求接口
引入 axios，并使用 Promise 进行封装，便于后续使用
```
设置POST请求统一content-Type的内容；
设置请求地址前面部分
设置跨域是否携带cookie
方法：
导出request(url,get,data={}){
    promise异步处理接过来的参数
}
```
注意：存在跨域，请求不带有cookie，需设置``axios.defaults.withCredentials = true``
`
### 身份鉴权接口
把 Login 用到的接口封装成 API 便于维护管理。
```js
const URL = {
    REGISTER : '/auth/register',
    LOGIN : '/auth/login',
    LOGOUT : '/auth/logout',
    GET_INFO:'/auth'
}
export default {
    register({username, password}){
        return request(URL.REGISTER,'POST',{username,password})
    },
    login({username, password}){
        return request(URL.LOGIN,'POST',{username,password})
    },
    logout() {
        return request(URL.LOGOUT)
    },
    getInfo() {
        return request(URL.GET_INFO)
    }

}
```
### 开发生产环境切换 
开发环境和生产环境下baseURL 的自动切换：在build中新增mock.config.js文件


