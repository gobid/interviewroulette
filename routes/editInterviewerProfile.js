var data = require("../users.json");

exports.viewEditInterviewerProfile = function(req, res) {   
	console.log(data);
	// Add user to dummy database
	var numberOfUsers = data["users"].length;
	var mostRecentlyAddedUser = data["users"][numberOfUsers - 1];
	res.render('editInterviewerProfile', mostRecentlyAddedUser);
 }