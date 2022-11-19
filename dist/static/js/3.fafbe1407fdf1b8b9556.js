webpackJsonp([3],{c6Eh:function(t,o){},sc4I:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=e("Dd8w"),i=e.n(n),a=(e("Q98j"),e("c1eD"),e("VmfC"),e("NYxO")),s={name:"NoteBookList",data:function(){return{}},created:function(){this.checkLogin({path:"/login"}),this.getNotebooks()},computed:i()({},Object(a.c)(["notebooks"])),methods:i()({},Object(a.b)(["getNotebooks","addNotebook","updateNotebook","deleteNotebook","checkLogin"]),{onCreate:function(){var t=this;this.$prompt("请输入笔记本标题","创建笔记",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^.{1,30}$/,inputErrorMessage:"笔记本标题不能为空,且不超过30个字符"}).then(function(o){var e=o.value;t.addNotebook({title:e})})},onEdit:function(t){var o=this;this.$prompt("请输入笔记本标题","修改笔记",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^.{1,30}$/,inputValue:t.title,inputErrorMessage:"笔记本标题不能为空,且不超过30个字符"}).then(function(e){var n=e.value;n,o.updateNotebook({notebookId:t.id,title:n}),o.$router.go(0)})},onDelete:function(t){var o=this;this.$confirm("确认删除该笔记本吗?","删除笔记本",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){o.deleteNotebook({notebookId:t.id})})}})},c={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"detail",attrs:{id:"notebook-list"}},[e("header",[e("a",{staticClass:"btn",attrs:{href:"#"},on:{click:function(o){return o.preventDefault(),t.onCreate.apply(null,arguments)}}},[e("i",{staticClass:"iconfont icon-plus"}),t._v("新建笔记本")])]),t._v(" "),e("main",[e("div",{staticClass:"layout"},[e("h3",[t._v("笔记本("+t._s(t.notebooks.length)+")")]),t._v(" "),e("div",{staticClass:"book-list"},t._l(t.notebooks,function(o){return e("router-link",{key:o.id,staticClass:"notebook",attrs:{to:"/note?notebookId="+o.id}},[e("div",{staticClass:"notebook-left"},[e("span",{staticClass:"iconfont icon-notebook"}),t._v(t._s(o.title)+"\n            "),e("span",[t._v(t._s(o.noteCounts))])]),t._v(" "),e("div",{staticClass:"notebook-right"},[e("span",{staticClass:"date"},[t._v(t._s(o.friendlyUpdatedAt))]),t._v(" "),e("span",{staticClass:"action",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.onEdit(o)}}},[t._v("编辑")]),t._v(" "),e("span",{staticClass:"action",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.onDelete(o)}}},[t._v("删除")])])])}),1)])])])},staticRenderFns:[]};var r=e("VU/8")(s,c,!1,function(t){e("c6Eh")},"data-v-267eed81",null);o.default=r.exports}});
//# sourceMappingURL=3.fafbe1407fdf1b8b9556.js.map