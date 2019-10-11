const titbit = require('titbit');
const fs = require('fs');

var app = new titbit({
    debug: true //调试模式，会输出错误信息
});

var {router} = app;

router.get('/upload', async c => {
    try {
        c.res.body = await new Promise((rv, rj) => {
            fs.readFile('./pages/upload.html', {encoding:'utf8'}, 
                (err, data) => {
                    if (err) {
                        rj(err);
                    } else {
                        rv(data);
                    }
                });
        });
    } catch (err) {
        console.log(err);
        c.res.status(404);
    }
});

router.post('/upload', async c => {
    try {
        c.res.body = await c.moveFile(c.getFile('image'), {
            path : 'images'
        });
    } catch (err) {
        console.log(err);
        c.res.body = err.message;
    }
});

app.daemon(8000, 6);
