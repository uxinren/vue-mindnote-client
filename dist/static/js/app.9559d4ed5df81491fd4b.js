webpackJsonp([5],{"//ys":function(t,e){},Hkgy:function(t,e){},ITFw:function(t,e){},Jdfc:function(t,e){t.exports={baseURL:"//note-server.hunger-valley.com"}},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("7+uW"),r=n("Dd8w"),a=n.n(r),u=n("Q98j"),s=n("NYxO"),i=(n("q+T5"),{data:function(){return{}},created:function(){this.checkLogin()},methods:a()({},Object(s.b)(["checkLogin"])),computed:a()({},Object(s.c)(["username","slug"]))}),c={render:function(){var t=this.$createElement;return(this._self._c||t)("span",{attrs:{title:this.username}},[this._v(this._s(this.slug))])},staticRenderFns:[]};var d={components:{Avatar:n("VU/8")(i,c,!1,function(t){n("//ys")},"data-v-451a83ec",null).exports},methods:a()({},Object(s.b)(["logout"]),{onLogout:function(){this.logout({path:"/login"})}})},f={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"sidebar"}},[e("Avatar"),this._v(" "),e("div",{staticClass:"icons"},[e("router-link",{attrs:{to:"/note",title:"笔记"}},[e("i",{staticClass:"iconfont icon-note"})]),this._v(" "),e("router-link",{attrs:{to:"/notebooks",title:"笔记本"}},[e("i",{staticClass:"iconfont icon-notebook"})]),this._v(" "),e("router-link",{attrs:{to:"/trash",title:"回收站"}},[e("i",{staticClass:"iconfont icon-trash"})])],1),this._v(" "),e("div",{staticClass:"logout"},[e("i",{staticClass:"iconfont icon-logout",on:{click:this.onLogout}})])],1)},staticRenderFns:[]};var l={name:"App",components:{Sidebar:n("VU/8")(d,f,!1,function(t){n("ITFw")},"data-v-70edf9d2",null).exports}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("Sidebar"),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var b=n("VU/8")(l,h,!1,function(t){n("Hkgy")},null,null).exports,p=n("/ocq");o.default.use(p.a);var k=new p.a({routes:[{path:"/",alias:"/notebooks",component:function(){return n.e(3).then(n.bind(null,"sc4I"))}},{path:"/login",component:function(){return n.e(2).then(n.bind(null,"xJsL"))}},{path:"/note",component:function(){return n.e(0).then(n.bind(null,"Gb2o"))}},{path:"/trash",component:function(){return n.e(1).then(n.bind(null,"WMg/"))}}]}),m=n("//Fk"),v=n.n(m),g=n("c1eD"),N=n("zL8q"),I=n.n(N),T={state:{notebooks:null,curBookId:null},getters:{notebooks:function(t){return t.notebooks||[]},curBook:function(t){return Array.isArray(t.notebooks)?t.curBookId?t.notebooks.find(function(e){return e.id===+t.curBookId}):t.notebooks[0]||{}:{}}},mutations:{setNotebooks:function(t,e){t.notebooks=e.notebooks},addNotebook:function(t,e){t.notebooks.unshift(e.notebook)},updateNotebook:function(t,e){(t.notebooks.find(function(t){return t.id===e.notebookId})||{}).title=e.title},deleteNotebook:function(t,e){t.notebooks=t.notebooks.filter(function(t){return t.id!==e.notebookId})},setCurBook:function(t,e){t.curBookId=e.curBookId}},actions:{getNotebooks:function(t){var e=t.commit;return null!==t.state.notebooks?v.a.resolve():g.a.getAll().then(function(t){e("setNotebooks",{notebooks:t.data})})},addNotebook:function(t,e){var n=t.commit;return g.a.addNotebook({title:e.title}).then(function(t){n("addNotebook",{notebook:t.data}),N.Message.success(t.msg)})},updateNotebook:function(t,e){var n=t.commit;return g.a.updateNotebook(e.notebookId,{title:e.title}).then(function(t){n("updateNotebook",{notebookId:e.notebookId,title:e.title}),N.Message.success(t.msg)})},deleteNotebook:function(t,e){var n=t.commit;return g.a.deleteNotebook(e.notebookId).then(function(t){n("deleteNotebook",{notebookId:e.notebookId}),N.Message.success(t.msg)})}}},A=n("p+dL"),E=n("VmfC"),O={GET:"/notes/from/:notebookId/",ADD:"/notes/to/:notebookId/",UPDATE:"/notes/:noteId",DELETE:"/notes/:noteId"},j=function(t){var e=t.notebookId;return new v.a(function(t,n){Object(A.a)(O.GET.replace(":notebookId",e)).then(function(e){e.data=e.data.map(function(t){return t.createdAtFriendly=Object(E.a)(t.createdAt),t.updatedAtFriendly=Object(E.a)(t.updatedAt),t}).sort(function(t,e){return t.updatedAt<e.updatedAt}),t(e)}).catch(function(t){n(t)})})},w=function(t,e){var n=t.noteId,o=e.title,r=e.content;return Object(A.a)(O.UPDATE.replace(":noteId",n),"PATCH",{title:o,content:r})},D=function(t){var e=t.noteId;return Object(A.a)(O.DELETE.replace(":noteId",e),"DELETE")},L=function(t){var e=t.notebookId,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{title:"",content:""},o=n.title,r=void 0===o?"":o,a=n.content,u=void 0===a?"":a;return new v.a(function(t,n){Object(A.a)(O.ADD.replace(":notebookId",e),"POST",{title:r,content:u}).then(function(e){e.data.friendlyCreatedAt=Object(E.a)(e.data.createdAt),e.data.friendlyUpdatedAt=Object(E.a)(e.data.updatedAt),t(e)}).catch(function(t){n(t)})})},C={state:{notes:null,curNoteId:null},getters:{notes:function(t){return t.notes||[]},curNote:function(t){return Array.isArray(t.notes)?t.curNoteId?t.notes.find(function(e){return e.id===+t.curNoteId})||{}:t.notes[0]||{}:{}}},mutations:{setNote:function(t,e){t.notes=e.notes},addNote:function(t,e){t.notes.unshift(e.note)},updateNote:function(t,e){var n=t.notes.find(function(t){return t.id===e.noteId})||{};n.title=e.title,n.content=e.content},deleteNote:function(t,e){t.notes=t.notes.filter(function(t){return t.id!==e.noteId})},setCurNote:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.curNoteId=e.curNoteId}},actions:{getNotes:function(t,e){var n=t.commit,o=e.notebookId;return j({notebookId:o}).then(function(t){n("setNote",{notes:t.data})})},addNote:function(t,e){var n=t.commit,o=e.notebookId,r=e.title,a=e.content;return L({notebookId:o},{title:r,content:a}).then(function(t){n("addNote",{note:t.data})})},updateNote:function(t,e){var n=t.commit,o=e.noteId,r=e.title,a=e.content;return w({noteId:o},{title:r,content:a}).then(function(t){n("updateNote",{noteId:o,title:r,content:a})})},deleteNote:function(t,e){var n=t.commit,o=e.noteId;return D({noteId:o}).then(function(t){n("deleteNote",{noteId:o}),N.Message.success(t.msg)})}}},y={GET:"/notes/trash",REVERT:"/notes/:noteId/revert",DELETE:"/notes/:noteId/confirm"},U=function(){return new v.a(function(t,e){Object(A.a)(y.GET).then(function(e){e.data=e.data.sort(function(t,e){return t.updatedAt<e.updatedAt?1:-1}),e.data.forEach(function(t){t.friendlyCreatedAt=Object(E.a)(t.createdAt),t.friendlyUpdatedAt=Object(E.a)(t.updatedAt)}),t(e)}).catch(function(t){e(t)})})},M=function(t){var e=t.noteId;return Object(A.a)(y.DELETE.replace(":noteId",e),"DELETE")},_=function(t){var e=t.noteId;return Object(A.a)(y.REVERT.replace(":noteId",e),"PATCH")},P={state:{trashNotes:null,curTrashNoteId:null},getters:{trashNotes:function(t){return t.trashNotes||[]},curTrashNote:function(t,e){return t.curTrashNoteId?t.trashNotes.find(function(e){return e.id===+t.curTrashNoteId})||{}:e.trashNotes[0]||{}},belongTo:function(t,e,n,o){return(o.notebooks.find(function(t){return t.id===e.curTrashNote.notebookId})||{}).title||""}},mutations:{setTrashNotes:function(t,e){t.trashNotes=e.trashNotes},addTrashNote:function(t,e){setTrashNotes.unshift(e.note)},deleteTrashNote:function(t,e){t.trashNotes=t.trashNotes.filter(function(t){return t.id!==+e.noteId})},setCurTrashNote:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.curTrashNoteId=e.curTrashNoteId}},actions:{getTrashNotes:function(t){var e=t.commit;return U().then(function(t){e("setTrashNotes",{trashNotes:t.data})})},deleteTrashNote:function(t,e){var n=t.commit,o=e.noteId;return M({noteId:o}).then(function(t){n("deleteTrashNote",{noteId:o}),N.Message.success(t.msg)})},revertTrashNote:function(t,e){var n=t.commit,o=e.noteId;return _({noteId:o}).then(function(t){n("deleteTrashNote",{noteId:o}),N.Message.success(t.msg)})}}},F={user:null},R={state:F,getters:{username:function(t){return null===t.user?"未登录":t.user.username},slug:function(t){return null===t.user?"未":t.user.username.charAt(0)}},mutations:{setUser:function(t,e){t.user=e.user}},actions:{login:function(t,e){var n=t.commit,o=e.username,r=e.password;return u.a.login({username:o,password:r}).then(function(t){n("setUser",{user:t.data})})},logout:function(t,e){var n=t.commit;return u.a.logout().then(function(t){n("setUser",{user:null}),k.push(e)})},register:function(t,e){var n=t.commit,o=e.username,r=e.password;return u.a.register({username:o,password:r}).then(function(t){n("setUser",{user:t.data})})},checkLogin:function(t,e){var n=t.commit;return null!==F.user?v.a.resolve():u.a.getInfo().then(function(t){t.isLogin?n("setUser",{user:t.data}):k.push(e)})}}};o.default.use(s.a);var G=new s.a.Store({modules:{notebook:T,note:C,trash:P,user:R}});n("Xcu2");o.default.use(I.a),o.default.config.productionTip=!1,new o.default({el:"#app",router:k,store:G,components:{App:b},template:"<App/>"})},Q98j:function(t,e,n){"use strict";var o=n("p+dL"),r="/auth/register",a="/auth/login",u="/auth/logout",s="/auth";e.a={register:function(t){var e=t.username,n=t.password;return Object(o.a)(r,"POST",{username:e,password:n})},login:function(t){var e=t.username,n=t.password;return Object(o.a)(a,"POST",{username:e,password:n})},logout:function(){return Object(o.a)(u)},getInfo:function(){return Object(o.a)(s)}}},VmfC:function(t,e,n){"use strict";e.a=function(t){var e=("object"===(void 0===t?"undefined":r()(t))?t:new Date(t)).getTime(),n=Date.now()-e,o="";switch(!0){case n<6e4:o="刚刚";break;case n<36e5:o=Math.floor(n/6e4)+"分钟前";break;case n<864e5:o=Math.floor(n/36e5)+"小时前";break;case n<31536e5:o=Math.floor(n/864e5)+"天前";break;default:o=Math.floor(n/31536e6)+"年前"}return o};var o=n("pFYg"),r=n.n(o)},Xcu2:function(t,e){},c1eD:function(t,e,n){"use strict";var o=n("//Fk"),r=n.n(o),a=n("p+dL"),u=n("VmfC"),s={GET:"/notebooks",ADD:"/notebooks",UPDATE:"/notebooks/:id",DELETE:"/notebooks/:id"};e.a={getAll:function(){return new r.a(function(t,e){Object(a.a)(s.GET).then(function(e){e.data=e.data.sort(function(t,e){return t.updatedAt<e.updatedAt?1:-1}),e.data.forEach(function(t){t.friendlyCreatedAt=Object(u.a)(t.createdAt),t.friendlyUpdatedAt=Object(u.a)(t.updatedAt)}),t(e)}).catch(function(t){e(t)})})},updateNotebook:function(t){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{title:""}).title,n=void 0===e?"":e;return Object(a.a)(s.UPDATE.replace(":id",t),"PATCH",{title:n})},deleteNotebook:function(t){return Object(a.a)(s.DELETE.replace(":id",t),"DELETE")},addNotebook:function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{title:""}).title,e=void 0===t?"":t;return new r.a(function(t,n){Object(a.a)(s.ADD,"POST",{title:e}).then(function(e){e.data.friendlyCreatedAt=Object(u.a)(e.data.createdAt),e.data.friendlyUpdatedAt=Object(u.a)(e.data.updatedAt),t(e)}).catch(function(t){n(t)})})}}},"p+dL":function(t,e,n){"use strict";e.a=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new r.a(function(o,r){var a={url:t,method:e,validateStatus:function(t){return t>=200&&t<300||400===t}};"get"===e.toLowerCase()?a.params=n:a.data=n,u()(a).then(function(t){200===t.status?o(t.data):(c.Message.error(t.data.msg),r(t.data))}).catch(function(t){c.Message.error("网络异常"),r({msg:"网络异常"})})})};var o=n("//Fk"),r=n.n(o),a=n("mtWM"),u=n.n(a),s=n("Jdfc"),i=n.n(s),c=n("zL8q");n.n(c);u.a.defaults.headers.post["Content-Type"]="application/x-www-from-urlencoded",u.a.defaults.baseURL=i.a.baseURL,u.a.defaults.withCredentials=!0}},["NHnr"]);
//# sourceMappingURL=app.9559d4ed5df81491fd4b.js.map