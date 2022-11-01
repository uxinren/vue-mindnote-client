import axios from 'axios'
import baseURLConfig from "./config-baseURL";
import {Message} from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-from-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL
axios.defaults.withCredentials = true

//接收地址、请求类型/默认get、数据对象/默认空对象,给到promise进行异步处理
export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let option = {
            url,
            method: type,
            //接收状态码，只有状态码在200或400时才执行下面的步骤。
            validateStatus(status) {
                return (status >= 200 && status < 300) || status === 400
            }
        }
        //当参数type为get时
        if (type.toLowerCase() === 'get') {
            option.params = data
        } else {
            option.data = data
        }
        //接收option参数
        axios(option).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                Message.error(res.data.msg)
                reject(res.data)
            }
        }).catch(err => {
            Message.error('网络异常')
            reject({msg: '网络异常'})
        })
    })
}