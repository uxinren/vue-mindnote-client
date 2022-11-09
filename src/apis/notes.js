import request from '@/helpers/request'
import {friendlyDate} from '@/helpers/util'

const URL = {
    GET:'/notes/from/:notebookId/',
    ADD:'/notes/to/:notebookId/',
    UPDATE:'/notes/:noteId',
    DELETE:'/notes/:noteId',
}

export default {
    getAll({notebookId}){
        return new Promise((resolve, reject)=>{
            request(URL.GET.replace(":notebookId",notebookId))
                .then(res=>{
                    res.data = res.data.map(note=>{
                        note.createdAtFriendly = friendlyDate(note.createdAt)
                        note.updatedAtFriendly = friendlyDate(note.updatedAt)
                        return note
                    }).sort((note1, note2)=>{
                        return note1.updatedAt<note2.updatedAt
                    })
                    resolve(res)
                }).catch((err) =>{
                reject(err)
            })
            })
        },
    //传参：如果不传参数则为后面的值，如果传空对象则为前面默认值。
    updateNote({noteId},{title,content}){
        return request(URL.UPDATE.replace(':noteId',noteId),'PATCH',{title,content})

    },
    deleteNote({noteId}){
        return request(URL.DELETE.replace(':noteId',noteId),'DELETE')
    },
    addNote({notebookId},{title='',content='',}={title:'',content:''}){
        return new Promise((resolve, reject)=>{
            request(URL.ADD.replace(':notebookId',notebookId),'POST',{title,content})
                .then(res=>{
                    res.data.note.createdAtFriendly = friendlyDate(res.data.note.createdAt)
                    res.data.note.updatedAtFriendly = friendlyDate(res.data.note.updatedAt)
                    resolve(res)
                }).catch(err=>{
                    reject(err)
            })
        })
        // return request(URL.ADD.replace(':notebookId',notebookId),'POST',{title,content})
    }
}