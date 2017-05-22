var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

router.get('/', function(req, res) {
  res.render('index', {});
});

router.get('/search', function(req, res) {
  client.search({
    index: 'qingyi_article',
    body: {
      "from" : req.query.page ? 10 * (req.query.page - 1) : 0,
      "size" : 10,
      "query": {
        "multi_match": {
          "query": req.query.q,
          "fields": ["title", "content"]
        }
      },
      "highlight": {
        "fields": {
          "title": {},
          "content": {
            "fragment_size" : 50,
            "number_of_fragments" : 3,
            "no_match_size": 0
          }
        }
      }
    }
  }).then(function (body) {
      let articleList = body.hits.hits
      console.log(articleList.length)
      console.log(req.query.page)
      res.render('article_list', {
        pageNo: Math.ceil(body.hits.total/10),
        searchStr: req.query.q,
        articles: articleList
    })
  }, function (error) {
    console.trace(error.message);
  });


});



module.exports = router;