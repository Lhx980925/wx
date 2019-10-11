'/submit':(req,res)=>{
    if(req.method !== 'POST'){
        res.statusCode=405;
        res.end('method must be POST');
        return;
    }
}