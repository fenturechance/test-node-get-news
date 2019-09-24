let https = require('https');
let http = require('http');
let fs = require('fs');
let circular = require('circular');
let server = http.createServer((req,resp) => {
    https.get('https://news.google.com/?hl=zh-TW&gl=TW&ceid=TW:zh-Hant',(rs) => {
        if(rs.statusCode !== 200){
            resp.writeHead(404);
            resp.write('Contents you are looking are Not Found');
        }else{
            resp.writeHead(200,{ 'Content-Type': 'text/html' });
            let str = JSON.stringify(rs, circular())
            resp.write(str);
        }
        resp.end();
    })
})

server.listen(5050);

console.log('server started listening on 5050');