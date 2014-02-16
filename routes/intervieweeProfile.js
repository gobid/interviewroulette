var data = require("../users.json");

exports.viewIntervieweeProfile = function(req, res) {
	var pageBefore = req.params.pageBefore;
	console.log("Page before "+pageBefore);

	var numberOfUsers = data["users"].length;
	var mostRecentlyAddedUser = data["users"][numberOfUsers - 1];

	if(pageBefore == "Survey" || pageBefore == "Sidebar") {
		//res.render
		res.render('intervieweeProfile', mostRecentlyAddedUser);
	} else if(pageBefore == "editIntervieweeProfile") { // Survey page OR from sidebar
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
	} else if (pageBefore == "login") {
		// Look up user in data JSON. 
		var unameEmail = req.query.uname;
		for (i = 0; i < numberOfUsers; i++) {
			if (data["users"][i].email == unameEmail) {
				mostRecentlyAddedUser = data["users"][i];
				//Check if user is an interviewER or interviewEE
				if (mostRecentlyAddedUser.interviewer) {
					res.render('interviewerProfile', mostRecentlyAddedUser);
					return;
				}
			}
		}
	}
	res.render('intervieweeProfile', mostRecentlyAddedUser);
}