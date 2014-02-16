var data = require("../users.json");

exports.viewEditProfile = function(req, res) {   
	console.log(data);
	// Add user to dummy database
	res.render('editProfile', data);
 }
