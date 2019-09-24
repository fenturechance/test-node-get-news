let https = require('https');
let http = require('http');
let request = require('request');
let fs = require('fs');
let circular = require('circular');
const cheerio = require('cheerio')
let server = http.createServer((req,resp) => {
    request('https://news.google.com/?hl=zh-TW&gl=TW&ceid=TW:zh-Hant',(err, res, body) => {
        if(err){
            resp.writeHead(404);
            resp.write('Contents you are looking are Not Found');
        }else{
            resp.writeHead(200,{ 'Content-Type': 'text/html' });
            const $ = cheerio.load(body)
            let str = '';
            $('body').each(function(i, elem) {
                str += $(this).text().split('\n');
            })
            resp.write(str);
        }
        resp.end();
    })
})

server.listen(5050);

console.log('server started listening on 5050');