<template>
  <div id="notebook-list" class="detail">
    <header>
      <a class="btn" href="#" @click.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" :key="notebook.id" :to="`/note?notebookId=${notebook.id}`" class="notebook">
            <div class="notebook-left">
              <span class="iconfont icon-notebook"></span>{{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
            </div>
            <div class="notebook-right">
              <span class="date">{{ notebook.friendlyUpdatedAt }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>

  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Notebooks from "@/apis/notebooks";
import {friendlyDate} from "@/helpers/util";
import {mapGetters, mapState,mapActions} from "vuex";

export default {
  name: 'NoteBookList',
  data() {
    return {}
  },

  created() {
    this.checkLogin({path: '/login'})
    // Auth.getInfo()
    //     .then(res => {
    //       if (!res.isLogin) {
    //         this.$router.push({path: '/login'})
    //       }
    //     })
    // Notebooks.getAll()
    //     .then(res => {
    //       this.notebooks = res.data
    //     })
    // console.log(Store)
    // Store.dispatch('getNotebooks')
    this.getNotebooks()
  },
  computed:{
    ...mapGetters(['notebooks'])
  },
  methods: {
    ...mapActions([
        'getNotebooks',
        'addNotebook',
        'updateNotebook',
        'deleteNotebook',
        'checkLogin'
    ]),
    onCreate() {
      this.$prompt('请输入笔记本标题', '创建笔记', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '笔记本标题不能为空,且不超过30个字符'
      }).then(({value}) => {
        this.addNotebook({title:value})
        // return Notebooks.addNotebook({title: value})
      })
      //     .then(res => {
      //   res.data.friendlyUpdatedAt = friendlyDate(res.data.updatedAt)
      //   this.notebooks.unshift(res.data)
      //   this.$message.success(res.msg)
      // })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('请输入笔记本标题', '修改笔记', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: '笔记本标题不能为空,且不超过30个字符'
      }).then(({value}) => {
        title = value
        this.updateNotebook({notebookId:notebook.id, title:value })
        this.$router.go(0)
      })
      //     .then(res => {
      //   notebook.title = title
      //   this.notebooks.unshift(res.data)
      //   this.notebooks.sort((notebook1, notebook2)=>{
      //     return  notebook1.updatedAt < notebook2.updatedAt ? 1 : -1
      //   })
      //   this.$router.go(0)
      //   this.$message.success(res.msg)
      // })
    },
    onDelete(notebook) {
      this.$confirm('确认删除该笔记本吗?', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNotebook({notebookId:notebook.id})
      })
      //     .then(res => {
      //   this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
      //   this.$message.success(res.msg)
      // })
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../assets/css/notebook-list.less");
</style>
