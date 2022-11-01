export function friendlyDate(dateStr) {
    let dateObj = typeof dateStr === 'object'?dateStr:new Date(dateStr)
    //修改时间序列化
    let time = dateObj.getTime()
    //当前时间
    let now = Date.now()
    //时间差
    let space = now-time
    //展示时间
    let str = ''
    switch (true){
        case space < 60*1000:
        str = '刚刚'
            break
        case space < 60*60*1000:
            str = Math.floor(space/60000)+'分钟前'
            break
        case space < 24*60*60*1000:
            str = Math.floor(space/(60*60*1000))+'小时前'
            break
        case space < 365*360000*24:
            str = Math.floor(space/(60*60*1000*24))+'天前'
            break
        default:
            str = Math.floor(space/(60*60*1000*24*365))+'年前'
    }
    return str
}