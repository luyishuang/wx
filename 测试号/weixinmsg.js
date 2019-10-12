const formatMsg = require('./fmtwxmsg');

function help() {
    return `你好，这是一个微信测试号(消息回复测试程序)，会把消息原样返回，但是目前不支持视频类型和自己添加的表情包的消息`;
}

//处理用户发过来的消息
//第一个参数是解析后的用户消息，
//第二个参数是要返回的消息对象，
//基本处理过程:根据用户发过来的消息判断消息类型并进行处理
function userMsg(wxmsg, retmsg) {
    /*
        关键词自动回复，检测是否为文本消息，如果是文本消息则先要检测是不是支持的关键词回复。
    */
    if (wxmsg.MsgType == 'text') {
        if (wxmsg.Content == 'help' || wxmsg.Content == '?' || wxmsg.Content == '？' || wxmsg.Content == '帮助') {
            retmsg.msg = help();
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        } else if (wxmsg.Content == 'hello' || wxmsg.Content == '你好'){

            retmsg.msg = '你好，你可以输入一些关键字测试消息回复，输入help/?获取帮助';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);

        } else if (wxmsg.Content == 'about' ){
            retmsg.msg = '你好，我是这个测试号的开发者';
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);

        } else if (wxmsg.Content == 'who' || wxmsg.Content == 'Who' || wxmsg.Content == 'WHO'){
            retmsg.msg = '你好，我是2017级四班卢毅双，学号是2017011858';
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);

        }
        else {
            //非关键词返回样式
            retmsg.msg = wxmsg.Content;
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);
        }
    } 
    //非文本类型的消息处理
    else{
        switch(wxmsg.MsgType) {
            case 'image':
            case 'voice':
            case 'audio':
                retmsg.msg = wxmsg.MediaId;
                retmsg.msgtype = wxmsg.MsgType;
                return formatMsg(retmsg);
            default:
                //因为消息为空，所以会返回默认的文本信息
                retmsg.msg = '不支持的类型';
                return formatMsg(retmsg);
        }
    }
}

exports.userMsg = userMsg;
exports.help = help;

exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    return userMsg(wxmsg, retmsg);
};

