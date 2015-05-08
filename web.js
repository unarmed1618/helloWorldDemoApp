//Web.js -- Program entOArypoint
var express = require("express");
var logfmt = require("logfmt");
var bodyparser = require("body-parser");
var models = require("./models");
var mongoose = require("mongoose");
var jade = require("jade");
var jadeOptions = {filename: './', pretty: true };
var User, db;
var app = express();
/*This can be used to prevent users from getting to 
 * things they aren't supposed to. 
*/
var pages = ["register","verify","admin"];
console.log("Finished initialization");
function renderJadeFile(template, options) {
    var fn = jade.compile(template, options);
    return fn(options.locals);
}
var dbstr = "mongodb://helloworld:1insecuretest@ds061188.mongolab.com:61188/heroku_app36645575"

app.set('views', __dirname + '/pages');
app.use(bodyparser.json());
app.use(express.static(__dirname + '/static'));
/*
models.defineModels(mongoose, function() {
    app.User = User = mongoose.model('User');
    db = mongoose.connect(app.set('db-uri'));
});
*/
app.get('/app/:dest',function(req,res){
if(pages.indexOf(req.params.dest) != -1)
    res.render(req.params.dest + '.jade');
else
    res.redirect('/404.html')
});
app.post('/register',function(req,res){
var newUser = new User(req.body.user);
//Do some validations
newUser.save();
req.set({'validations' : 'someValidations'});
res.redirect('/app/verify');
});
app.get('/', function(req,res){
res.redirect('/app/register');
});
//app.get('/:dest')
var port = process.env.PORT || 5000;
app.listen(port, function() {
console.log("Listening on " + port);
});
