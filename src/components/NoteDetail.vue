<template>
  <div id="note" class="detail">
    <note-sidebar  @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty"  v-show="!curNote.id">请选择笔记</div>
      <div  class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期:{{ curNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
          <span> {{statusText}}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model:value="curNote.title" @input="onUpdateNote" @keydown="statusText='正在输入...'" placeholder="输入标题">
        </div>
        <div class="editor">
          <div class="preview markdown-body"  v-show="isShowPreview" v-html="previewContent">
          </div>
          <textarea v-show="!isShowPreview"  v-model:value="curNote.content" @input="onUpdateNote" @keydown="statusText='正在输入...'" placeholder="输入内容, 支持 markdown 语法"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from "@/components/NoteSidebar";
import _ from 'lodash';
import MarkdownIt from "markdown-it";
import {mapGetters,mapActions,mapMutations} from 'vuex'

let md = new MarkdownIt()

export default {
  components: {NoteSidebar},
  data () {
    return {
      statusText:'未保存',
      isShowPreview:false
    }
  },
  created() {
    this.checkLogin({path:'/login'})
    // Auth.getInfo()
    //     .then(res =>{
    //       if (!res.isLogin){
    //         this.$router.push({path:'/login'})
    //       }
    //     })
    // Bus.$once('update:notes' ,val =>{
    //   this.curNote = val.find(note => note.id === +this.$route.query.noteId ) || {}
    // })
  },
  computed:{
    ...mapGetters([
       'notes',
       'curNote'
    ]),
    previewContent(){
      return md.render(this.curNote.content || '')
    }
  },
  methods:{
    ...mapMutations([
        'setCurNote'
    ]),
    ...mapActions([
        'updateNote',
        'deleteNote',
        'checkLogin'
    ]),
    onUpdateNote:_.debounce(function(){
      this.updateNote({noteId:this.curNote.id,title:this.curNote.title,content:this.curNote.content})
      .then(() => {
        this.statusText = '已保存'
      })
      .catch(() => {
        this.statusText = '保存出错'
      })
    },300),
    onDeleteNote(){
      this.deleteNote({noteId:this.curNote.id})
      .then(() => {
        this.$router.replace({path: '/note'})
      })
    }
  },
  beforeRouteUpdate(to,from,next){
    this.setCurNote({curNoteId:to.query.noteId})
    // this.curNote = this.notes.find(note => note.id === +to.query.noteId) || {}
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
