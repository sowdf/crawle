let app = require('express');
let router = app.Router();



request('http://www.jokeji.cn/jokehtml/bxnn/2015122523082259.htm',(err,response,body)=>{
    let $ = cheerio.load(body,{decodeEntities:false});
    let test = $('#text110').html();
    console.log(test);
});

let server = app.listen(3000,()=>{
    console.log('this is port 3000 start');
});