var express = require('express'),
    sqlite3 = require('sqlite3').verbose(),
    fs = require('fs'),
    path = require('path')
;

var app = express();

var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE place (name TEXT, postcode TEXT)");
});

app.get('/search/:text', function(req, res){
  var searchText = req.params.text;

});

app.get('/plans', function(){
  db.all("SELECT * from place", [], function(err, rows){
    if (!!err) res.json({error: err});
    else res.json({data: rows});
  });
});

app.post('/plans', function(){
  var name = req.data.name;
  var postcode = req.data.postcode;
  db.run("INSERT INTO place VALUES (?)", [name, postcode]);
});

app.delete('/plans/:id')


app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
  console.log('App listening on port 3000');
});
