import request from '@/helpers/request'
import {friendlyDate} from '@/helpers/util'

const URL = {
  GET:'/notebooks',
  ADD:'/notebooks',
  UPDATE:'/notebooks/:id',
  DELETE:'/notebooks/:id',
}

export default {
    getAll(){
        return new Promise((resolve, reject)=>{
            request(URL.GET)
                .then(res=>{
                    res.data = res.data.sort((notebook1, notebook2) =>
                        notebook1.updatedAt < notebook2.updatedAt ? 1 : -1)
                        res.data.forEach((notebook)=>{
                            notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt)
                            notebook.friendlyUpdatedAt = friendlyDate(notebook.updatedAt)
                        })
                    resolve(res)
                }).catch((err) =>{
                    reject(err)
            })
        })
    },
    //传参：如果不传参数则为后面的值，如果传空对象则为前面默认值。
    updateNotebook(notebookId,{title=''}={title: ''}){
        return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title})

    },
    deleteNotebook(notebookId){
        return request(URL.DELETE.replace(':id',notebookId),'DELETE')
    },
    addNotebook({title=''}={title:''}){
        return new Promise((resolve, reject)=>{
            request(URL.ADD,'POST',{title})
                .then(res=>{
                    res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
                    res.data.friendlyUpdatedAt = friendlyDate(res.data.updatedAt)
                    resolve(res)
                }).catch(err=>{
                    reject(err)
            })
        })
    }
}