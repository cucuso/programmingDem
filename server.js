var express = require('express')
    ,fs = require('fs')
    ,request = require('request')
    ,cheerio = require('cheerio')
    ,app = express();



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/test/',function(req,res,next){

console.log(req.params.tech);
res.json({indian:4,hispanic:2,white:5,black:3});
});


app.get('/graph/:technology', function(req, res) {

  var user;
  var json = {
    "users": []
  };
  url = 'http://www.stackoverflow.com/search?q=' + req.params.technology;

  request(url, function(error, response, html) {



    if (!error) {


      var $ = cheerio.load(html);



      $('a[href*="users"]').filter(function() {


        var data = $(this);


        user += data.text();


        json.users.push({
          "user": user
        });


        console.log(json);



      });


      res.json(json);
    }

  });


});



app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
