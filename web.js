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
var pages = ["register","confirm","admin"];
console.log("Finished initialization");
function renderJadeFile(template, options) {
    var fn = jade.compile(template, options);
    return fn(options.locals);
}
var dbstr = "mongodb://helloworld:1insecuretest@ds061188.mongolab.com:61188/heroku_app36645575"
app.set('db-uri',dbstr);
app.set('views', __dirname + '/pages');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));

models.defineModels(mongoose, function() {
    app.User = User = mongoose.model('User');
    db = mongoose.connect(app.set('db-uri'));
});

app.get('/app/:dest',function(req,res){
    if(pages.indexOf(req.params.dest) != -1)
	if(req.params.dest == 'admin')
	    User.find({},null,{sort:"-joinDate"}, function(err,users){
		if(users) res.render('admin.jade',{'users':users});
		else      res.render('admin.jade');
	    });
        else if(req.params.dest == 'confirm')
	    User.findOne({'_id':req.query.id},function(err,user){
		if(user) res.render('confirm.jade',{'user':user});
		else res.redirect('/app/register');
	    });
        else if(req.params.dest == 'register')
	    if(req.query.message){
		res.render('register.jade',{'message':req.query.message});
	    }  else
		res.render('register.jade');
    else 
	res.render(req.params.dest + '.jade');
     else
	res.redirect('/404.html');
});
app.post('/register',function(req,res){
    var newUser = new User(req.body.user);
    newUser.validate(function (err) {
	if(err) 
	    res.redirect('/app/register?message='+String(err));
	else {
	    newUser.save();  
	res.redirect('/app/confirm?id='+newUser.id);
	}
    });
});
app.get('/', function(req,res){
    res.redirect('/app/register');
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
