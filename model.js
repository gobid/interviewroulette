var Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
    "firstname": String, 
	"lastname": String,
	"email": String,
	"password": String,
	"ghangout": String,
	"interviewer": Boolean,
	"education": String,
	"occupation": String,
	"company": String,
	"location": String,
	"programmingLang": String,
	"softSkills": String,
	"frameworks": String,
	"improvements": String,
	"mission": String,
	"hobbies": String,
	"description1": String,
	"description2": String,
	"feedback": String
});

exports.User = Mongoose.model('User', UserSchema);