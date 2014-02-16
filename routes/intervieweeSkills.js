var data = require("../users.json");

exports.viewIntervieweeSkills = function(req, res){
	// Look up user in data JSON. 
	var numberOfUsers = data["users"].length;
	var unameEmail = req.params.uname;
	for (i = 0; i < numberOfUsers; i++) {
		if (data["users"][i].email == unameEmail) {
			var mostRecentlyAddedUser = data["users"][i];
			res.render('intervieweeSkills', mostRecentlyAddedUser);
			return;
		}
	}
};