function eventMsg(wxmsg, retmsg){
    //把返回消息的类型设置为text
    retmsg.msgType='text';

    switch(wxmsg.Event){
        case 'subscribe':
            retmsg.msg='你好，我没用';
            return formatMsg(retmsg);
        
        case 'unsubscribe':
            console.log(wxmsg.FromUserName,'取消关注');
            break;

        case 'CLICK':
            retmsg.msg=wxmsg.EventKey;
            return formagMsg(retmsg);

        case 'VIEW':
            console.log('用户浏览',wrong.EventKey);
            break;
        
        default:
            return '';
    }
    return '';
}