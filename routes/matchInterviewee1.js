var data = require("../users.json");

exports.viewMatchInterviewee1Page = function(req, res){
	// Look up user in data JSON. 
	var numberOfUsers = data["users"].length;
	console.log(req);
	var unameEmail = req.params.uname;
	console.log(unameEmail);
	for (i = 0; i < numberOfUsers; i++) {
		if (data["users"][i].email == unameEmail) {
			var mostRecentlyAddedUser = data["users"][i];
			res.render('matchInterviewee1', mostRecentlyAddedUser);
			return;
		}
	}
};