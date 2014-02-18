var data = require("../users.json");

exports.kickoffWithInterviewee = function(req, res){
	// Look up user in data JSON. 
	var numberOfUsers = data["users"].length;
	var unameEmail = req.params.uname;
	console.log(unameEmail);
	for (i = 0; i < numberOfUsers; i++) {
		if (data["users"][i].email == unameEmail) {
			var mostRecentlyAddedUser = data["users"][i];
			res.render('intervieweeSkills', mostRecentlyAddedUser);
			return;
		}
	}
};