let iconv = require('iconv-lite');
let http = require('http');
let cheerio = require('cheerio');

function Joke(){
    this.listIndex = 1;
    this.listUrl = [];
    this.url = `http://xiaohua.zol.com.cn/detail32/${this.listIndex}.html`;
    this.getData(this.listUrl);
}

Joke.prototype.getData = function(url){
    console.log(url);
    var req = http.request(url,(res)=>{
        res.on('data',(data)=>{
            let html = iconv.decode(data,'gbk');
            let $ =  cheerio.load(html);
            let content = $('.summary-text').text();
            if(content.length != 0){
                this.listIndex++;
            }
        });
    });
    req.end();
};



module.exports = new Joke();
