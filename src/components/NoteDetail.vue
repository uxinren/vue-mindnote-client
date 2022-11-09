<template>
  <div id="note" class="detail">
    <note-sidebar  @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty"  v-show="!cruNote.id">请选择笔记</div>
      <div  class="note-detail-ct" v-show="cruNote.id">
        <div class="note-bar">
          <span> 创建日期:{{ cruNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ cruNote.updatedAtFriendly }}</span>
          <span> {{statusText}}</span>
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <div class="note-title">
          <input v-model:value="cruNote.title" placeholder="输入标题" type="text" @input="updateNote">
        </div>
        <div class="editor">
          <div class="preview markdown-body"  v-show="isShowPreview" v-html="previewContent">
          </div>
          <textarea v-show="!isShowPreview"  v-model:value="cruNote.content" @input="updateNote" @keydown="statusText='正在输入...'" placeholder="输入内容, 支持 markdown 语法"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import NoteSidebar from "@/components/NoteSidebar";
import Bus from "@/helpers/bus";
import _ from 'lodash';
import Notes from "@/apis/notes";
import MarkdownIt from "markdown-it";


let md = new MarkdownIt()

export default {
  components: {NoteSidebar},
  data () {
    return {
      cruNote:{},
      notes: [],
      statusText:'未保存',
      isShowPreview:false
    }
  },
  created() {
    Auth.getInfo()
        .then(res =>{
          if (!res.isLogin){
            this.$router.push({path:'/login'})
          }
        })
    Bus.$once('update:notes' ,val =>{
      this.cruNote = val.find(note => note.id === +this.$route.query.noteId ) || {}
    })
  },
  computed:{
    previewContent(){
      return md.render(this.cruNote.content || '')
    }
  },
  methods:{
    updateNote:_.debounce(function(){
      Notes.updateNote({noteId:this.cruNote.id},
          {title:this.cruNote.title,content:this.cruNote.content})
      .then(data => {
        this.statusText = '已保存'
      })
      .catch(data => {
        this.statusText = '保存出错'
      })
    },300),
    deleteNote(){
      Notes.deleteNote({noteId:this.cruNote.id})
      .then(data => {
        this.$message.success(data.msg)
        this.notes.splice(this.notes.indexOf(this.cruNote),1)
        this.$router.replace({path: '/note'})
      })
    }
  },
  beforeRouteUpdate(to,from,next){
    this.cruNote = this.notes.find(note => note.id === +to.query.noteId) || {}
    next()
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail);
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
