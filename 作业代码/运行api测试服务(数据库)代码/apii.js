const pg=require('pg');
const titbit=require('titbit');
const ufilter=require('./ufilter');

var app=new titbit({
    debug:true
});

var pgdb=new pg.Pool({
    host:'127.0.0.1',
    port:5432,
    user:'lhx',
    password:'lihanxiao980925',
    database:'lihanxiao'
});

//使用中间件对
app.use(ufilter,{method:['PUT','POST','DELETE']});

//从4.1.4开始可以直接使用app添加路由
//获取用户列表
app.get('/user',async c=>{
    //没有做分页处理 
    let sql='SELECT id,username FROM users';
    let ret=await pgdb.query(sql);
    if(ret.rowCount <= 0){
        c.res.body={
            status:-1,
            errmsg:'failed get users'
        };
    }else{
        c.res.body={
            status:0,
            data:ret.rows
        };
    }
});

//用户详细信息
app.get('/user/:id',async c=>{
    let sql = 'SELECT id,username,email FROM users WHERE id=$1';
    let ret =await pgdb.query(sql,[
        c.param.id
    ]);

    if(ret.rowCount<=0){
        c.res.body={
            status:-1,
            errmsg:'user not found'
        };
    }else{
        c.res.body={
            status:0,
            data:ret.rows[0]
        };
    }
});

//创建新用户
app.post('/user',async c=>{
    let sql='INSERT INTO users (username,email,passwd) VALUES ($1,$2,$3)';
    //创建新用户的数据在body属性中 是POST请求
    let ret=await pgdb.query(sql,[
        c.body.username,c.body.email,c.body.passwd
    ]);
    if(ret.rowCount<=0){
        c.res.body={
            status:-1,
            errmsg:'create user failed'
        };
    }else{
        c.res.body={
            status:0,
            data:'ok'
        };
    }
});

//更新用户信息
app.put('/user/:id',async c=>{
    let sql='UPDATE users SET email=$1 WHERE id=$2';
    let ret=await pgdb.query(sql,[
        c.body.email,c.param.id
    ]);
    if(ret.rowCount<=0){
        c.res.body={
            status:-1,
            errmsg:'update failed'
        };
    }else{
        c.res.body={
            status:0,
            data:'ok'
        };
    }
});

app.delete('/user/:id',async c=>{
    let sql='DELETE FROM users WHERE id=$1';
    let ret=await pgdb.query(sql,[
        c.param.id
    ]);
    if(ret.rowCount<=0){
        c.res.body={
            status:-1,
            errmsg:'can not delete user'
        };
    }else{
        c.res.body={
            status:0,
            data:'ok'
        };
    }
});

//启动服务
app.run(8800);

// 1.接口返回值需要封装成函数统一处理。
// 2.未做分层处理：控制和模型层未分离。
// 3.不要为了分层而分层，要考虑业务需求。
// 4.请求数据未做格式检测处理：是否为空，格式是否合法等。

// 检测数据格式、权限验证、会话处理等操作皆可以使用中间件进行拆分，方便开发和后期维护。