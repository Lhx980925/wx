const http=require('http');

http.createServer((req,res)=>{
    //输出请求头信息
    console.log(req.headers);

    res.end('Hello Node.js');
}).listen(8080);