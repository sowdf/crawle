let app = require('express')();
let http = require('http');
let iconv = require('iconv-lite');
let cheerio = require('cheerio');
let mongoose = require('mongoose');
let Cold = require('./models/Cold');
let page  = 1;
let timer = null;
let contentAry = [];
let count = 30;
let intiUrl = createUrl(37);

mongoose.connect('mongodb://localhost:27017/joke',(err)=>{
    console.log(err);
    getData(intiUrl);

});


function saveData(data){
/*    let data = [];
    for(let i=0; 0 < count; i++){
        let item = contentAry.shift();
        let obj = {};
        obj.content = item;
        data.push(obj);
    };*/
    let save = {content:data};
    new Cold(save).save().then(()=>{
        console.log('保存成功~');
    });
}


function getData(url){
    let req = http.request(url,(res)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            page++;
            getData(createUrl(page));
        },3000);

        if(res.statusCode == 302){
            page++;
            getData(createUrl(page));
            return false;
        }

        res.on('data',(data)=>{
            getContent(data);
        });
    });
    req.end();
}

function getContent(data){
    let html = iconv.decode(data,'gbk');
    let $ = cheerio.load(html);
    let content = $('.article-text').text();
    if(content.length != 0){
        let item = content.trim().replace(/[\r\n]/g,"");
        saveData(item);
        page++;
        contentAry.push(item);
        getData(createUrl(page));
        console.log(contentAry);
        console.log(page);
    }
}

function createUrl(index){
    let url = 'http://xiaohua.zol.com.cn/detail32/'+index+'.html';
    return url;
}


