module.exports=async (c,next)=>{
    if(c.query.apipass==='10001'){
        await next(c);
    }else{
        c.res.body={
            status:-1,
            errmsg:'deny'
        };
    }
};