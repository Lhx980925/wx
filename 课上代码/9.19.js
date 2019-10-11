const http=require('http');
const qs=require('querystring');
const url=require('url');

var routeTable={
    '/':(req,res)=>{

    },

    '/help':(req,res)=>{

    }
};

http.createServer((req,res)=>{
    let path=req.url.split('?')[0];
    if(routeTable[path]===undefined){
        req.statusCode=404;
        return;
    }

    let urlobj=url.parse(req.url,true);
    var hasBody=false;
    var bodyData='';
    if(req.method=='POST'||req.method=='PUT'||req.method==='DELETE'){
        hasBody=true;
        req.on('data',data=>{
            bodyData+=data.toString('utf8');
        });
    }else{
        req.on('data',d=>{});
    }

    req.on('end',()=>{
        let formType='application/x-www-form-urlencoded';
        if(hasBody && bodyData.length>0 && req.headers['content-type']===formType){
            bodyData=qs.parse(bodyData);
        }
    })
    routeTable[path](req,res);
}).listen(8000,'localhost');