var request = require('superagent');
var cheerio = require('cheerio')
var mongoClient = require('../lib/mongo').mongoClient
var insertDocuments = require('../lib/mongo').insertDocuments
var mongoUrl = require('../config/default.js').mongodb
var collection = 'sina_blog'

var startUrl = 'http://blog.sina.com.cn/s/blog_4f7cd6a10102vf9a.html'

function crawl(url) {
    request.get(url)
        .set('Accept', 'application/html')
        .end(function(err, res) {
            // console.log(res.text)
            let $ = cheerio.load(res.text)
            let documnetObj = {}

            documnetObj.url = url
            documnetObj.title = $('.articalTitle h2').text()
            documnetObj.content = $('#sina_keyword_ad_area2').text()
            documnetObj.createTime = $('.time').text().slice(1, -1)

            // console.log(documnetObj.title)
            // console.log(documnetObj.content)
            // console.log(documnetObj.createTime)
            // console.log(documnetObj.url)

            mongoClient.connect(mongoUrl, function(err, db) {
                insertDocuments(db, collection, documnetObj, function() {
                    db.close();
                });
            });
            if ($('.articalfrontback2 .SG_floatR').text() != '') {
                nextUrl = $('.articalfrontback2 .SG_floatR a').attr('href')
                console.log(nextUrl)
                setTimeout(() => {
                    crawl(nextUrl)
                }, 3000)
            }
        })
}
crawl(startUrl)