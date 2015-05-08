var crypto = require('crypto'),
    User;
function defineModels(mongoose, fn) {
    var Schema = mongoose.Schema,  ObjectId = Schema.ObjectId;
/**
* Model : User
*/
    User = new Schema({
	'firstName' : String,
	'lastName' : String,
	'address1' : String,
	'address2' : String,
	'city' : String,
	'state' : String,
	'zip' : String,
	'country' : String
    });
    User.virtual('id')
	.get(function() {
	    return this._id.toHexString();
	});
    mongoose.model('User',User);
    fn();
}
exports.defineModels = defineModels;
