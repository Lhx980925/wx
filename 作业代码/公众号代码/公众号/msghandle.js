const formatMsg=require('./fmtwxmsg');

function help(){
    //字符串形式返回帮助信息。
    //还可以是以读取文件的形式来返回。
    return '你好，这是一个测试号，目前回原样返回用户输入的消息。'
}

//@param {object} wxmsg 解析XML消息的对象
//@param {object} retmsg 要返回的数据对象
function userMsg(wxmsg,retmsg){
    //关键字自动回复
    if(wxmsg.MsgType == 'text'){
        switch(wxmsg.Content){
            case '帮助':
            case 'help':
            case '?':
                retmsg.msg=help();
                retmsg.msgtype='text';
                return formatMsg(retmsg);
            case 'about':
                retmsg.msgtype='text';
                retmsg.msg='我是这个测试号的开发者。';
                return formatMsg(retmsg);
            case 'who':
                retmsg.msgtype='text';
                retmsg.msg='开发者基本信息:'+'\n'+'姓名:李汉霄'+'\n'+'学号:2017011962';
                return formatMsg(retmsg);
            default:
                retmsg.msgtype='text';
                retmsg.msg=wxmsg.Content;
                return formatMsg(retmsg);
        }
    }

    //处理其他类型的信息
    switch(wxmsg.MsgType){
        case 'image':
        case 'voice':
            retmsg.msgtype=wxmsg.MsgType;
            retmsg.msg=wxmsg.MediaId;
            return formatMsg(retmsg);
        default:
            //retmsg.msgtype类型为空
            //格式化数据会返回default处的数据
            //提示用户该类型不被支持
            return formatMsg(retmsg);
    }
}

exports.help=help;
exports.userMsg=userMsg;

//后续还会加入事件信息支持
exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    return userMsg(wxmsg, retmsg);
};