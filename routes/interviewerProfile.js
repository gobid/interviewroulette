var data = require("../users.json");

exports.viewInterviewerProfile = function(req, res) {
	var pageBefore = req.params.pageBefore;
	console.log(req.params.pageBefore);

	var numberOfUsers = data["users"].length;
	var mostRecentlyAddedUser = data["users"][numberOfUsers - 1];

	if(pageBefore == "Survey") {
		var company = req.query.company;
		mostRecentlyAddedUser.company = company;
	} else if (pageBefore == "editInterviewerProfile"){ 
		if (req.query.fname != "") {
			mostRecentlyAddedUser .firstname = req.query.fname;
		}

		if (req.query.lname != "") {
			mostRecentlyAddedUser .lastname = req.query.lname;
		}

		if (req.query.email != "") {
			mostRecentlyAddedUser .email = req.query.email;
		}

		if (req.query.education != "") {
			mostRecentlyAddedUser .education = req.query.education;
		}

		if (req.query.occupation != "") {
			mostRecentlyAddedUser .occupation = req.query.occupation;
		}

		if (req.query.location != "") {
			mostRecentlyAddedUser.location = req.query.location;
		}

		if (req.query.company != "") {
			mostRecentlyAddedUser.company = req.query.company;
		}
	} 		
	res.render('interviewerProfile', mostRecentlyAddedUser);
}