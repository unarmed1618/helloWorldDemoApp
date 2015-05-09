var crypto = require('crypto'),
    User;

var textVal = /[a-z]+/i;
var stateVal = /(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|AS|DC|FM|GU|MH|MP|PW|PR|VI)/i;
var zipVal = /^[0-9]{5}(?:-[0-9]{4})?$/;
function defineModels(mongoose, fn) {
    var Schema = mongoose.Schema,  ObjectId = Schema.ObjectId;

/**
* Model : User
*/
    User = new Schema({
	'firstName' : {type: String, match:textVal,  required: "First Name is required."},
	'lastName' : {type: String, match:textVal,  required: "Last Name is required."},
	'address1' : {type: String, match: textVal, required: "Address 1 is required."},
	'address2' : String,
	'city' : {type: String, match: textVal, required: "City is required."},
	'state' : {type: String, match: stateVal, required: "State is required."},
	'zip' : {type: String, match: zipVal, required: "Zip is required."},
	'country' : {type: String, default: "US", required: "Country is required."},
	'joinDate' : Date
    });
    User.virtual('id')
	.get(function() {
	    return this._id.toHexString();
	});
    mongoose.model('User',User);
    fn();
}
exports.defineModels = defineModels;
