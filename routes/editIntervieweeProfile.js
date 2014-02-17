var data = require("../users.json");

exports.viewEditIntervieweeProfile = function(req, res) {   
	console.log(data);
	// Add user to dummy database

	var numberOfUsers = data["users"].length;
	var unameEmail = req.params.uname;
	for (i = 0; i < numberOfUsers; i++) {
		if (data["users"][i].email == unameEmail) {
			var mostRecentlyAddedUser = data["users"][i];
			res.render('editIntervieweeProfile', mostRecentlyAddedUser);
			return;
		}
	}
 }
