const gohttp=require('gohttp');
const wxkey=require('./gzhkey');

var token_api=`https://api.weixin.qq.com/cgi-bin/token`+`?grant_type=client_credential`+`&appid=${wxkey.appId}&secret=${wxkey.appsecret}`;

gohttp.get(token_api).then(d=>{
    console.log(d);
})