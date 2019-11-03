const pg=require('pg');

var pdb= new pg.Pool({//pg.Client
    host:'127.0.0.1',
    port:5432,
    user:'lhx',
    database:'lihanxiao',
    password:'lihanxiao980925'
});

pdb.on('error',err=>{
    console.log(err);
    process.exit(1);
});

//pdb.connect();

;(async ()=>{
    /*
    let sql='INSERT INTO users(username,passwd)'
          +'VALUES ($1,$2)';
    let retdata=await pdb.query(sql,[
        `u${Date.now()}`,'123456'
    ]);
    */
    let sql='SELECT username,email FROM users where id>1';
    let retdata=await pdb.query(sql);
    console.log(retdata);
    pdb.end();
})();