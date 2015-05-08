//Web.js -- Program entrypoint
var express = require("express");
var logfmt = require("logfmt");
var models = require("./models");
var mongoose = require("connect-mongodb");
var jade = require("jade");
var jadeOptions = {filename: './', pretty: true };
var User, db;
var app = express();
//This can be used to prevent users from getting to 
// things they aren't supposed to.
var pages = ["register","verify","admin"];
function renderJadeFile(template, options) {
    var fn = jade.compile(template, options);
    return fn(options.locals);
}
var dbstr = ""
app.configure('development',function() {
    app.use(express.errorHandler({ dumpExceptions: true }));
});
app.configure(function() {
    app.set('views', __dirname + '/pages');
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
});
models.defineModels(mongoose, function() {
    app.User = User = mongoose.model('User');
    db = mongoose.connect(app.set('db-uri'));
});

app.get('/app/:dest',function(req,res){
if(pages.contains(dest))
    res.render('shared/theme',{'page' : dest});
else
    res.redirect('/404.html')
});
app.post('/register',function(req,res){
var newUser = new User(req.body.user);
//Do some validations
newUser.save();
res.redirect('/app/verify',{validations : 'someValidations'});
});
//app.get('/:dest')
var port = process.env.PORT || 5000;
app.listen(port, function() {
console.log("Listening on " + port);
});
