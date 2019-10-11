const titbit=require('titbit');
const fs=require('fs');

async=function readFile(filename,encoding='utf8'){
    return new Promise((rv,rj)=>{
        fs.readFile(filename,{encoding:encoding},(err,data)=>{
            if(err){
                rj(err);
            }else{
                rv(data);
            }
        });
    });
};

var app=new titbit({
    debug:true
});

var {router}=app;

router.get('/upload',async c=>{
    try{
    c.res.body=await readFile('./pages/upload.html');
    }catch(err){
        console.error(err.message);
        c.res.status(404);
    }
});

router.post('/upload',async c=>{
    try{
        let imgfile=c.getFile('image');
        c.res.body=await c.moveFile(imgfile,{
            path:'images'
        });
    }catch(err){
        console.log(err);
        c.res.status(500);
    }
});

app.run(8000,'localhost');