var elasticsearch = require('elasticsearch');
var mongoClient = require('../lib/mongo').mongoClient
var findDocuments = require('../lib/mongo').findDocuments
var mongoUrl = require('../config/default.js').mongodb
var collection = 'sina_blog'


var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

mongoClient.connect(mongoUrl, function(err, db) {
    findDocuments(db, collection, function(docs) {
        var elasticArray = []
        docs.forEach(function(value, index) {
            // console.log(value.title)
            if (index) {
                elasticArray.push({
                index: {
                    _index: 'qingyi_article',
                    _type: 'sina_blog',
                    _id: index + 1
                }
            })
            elasticArray.push({
                    url: value.url,
                    title: value.title,
                    content: value.content,
                    createTime: value.createTime
                })
            }
            
        })
        db.close()
        client.bulk({
            body: elasticArray
        },function(err, resp) {
        
        })
        console.log(elasticArray.length)
    });
});