const http=require('http');

var routeTable={
    '/':(req,res)=>{
        res.end('Hey,this is home page.')
    },
    'help':(req,res)=>{
        res.end('there is no help.')
    }
}

http.createServer((req,res)=>{
    console.log(req.url);
    let path_split=req.url.split('?');
    let path=path_split[0];

    res.setHeader('Access-control-allow-origin','*');

    if(routeTable[path]==undefined){
        res.statusCode=404;
        res.end('page not found');
        return;
    }
    routeTable[path](req,res);
}).listen(8080);