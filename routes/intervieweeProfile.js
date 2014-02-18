var data = require("../users.json");

function get_interviewee_session(req, res) {
	var pageBefore = req.params.pageBefore;
	console.log("Page before "+pageBefore);

	var numberOfUsers = data["users"].length;
	var mostRecentlyAddedUser = data["users"][numberOfUsers - 1];

	if(pageBefore == "Sidebar") {
		var unameEmail = req._parsedUrl.query;
		console.log("Email: "+unameEmail);
		for (i = 0; i < numberOfUsers; i++) {
			if (data["users"][i].email == unameEmail) {
				mostRecentlyAddedUser = data["users"][i];
				//Check if user is an interviewER or interviewEE
				if (mostRecentlyAddedUser.interviewer) {
					break;
				}
			}
		}
	} else if(pageBefore == "editIntervieweeProfile") { // Survey page OR from sidebar
		var unameEmail = req.query.email;
		console.log("Email: "+unameEmail);
		for (i = 0; i < numberOfUsers; i++) {
			if (data["users"][i].email == unameEmail) {
				mostRecentlyAddedUser = data["users"][i];
				//Check if user is an interviewER or interviewEE
				if (mostRecentlyAddedUser.interviewer) {
					break;
				}
			}
		}
		
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
			mostRecentlyAddedUser.occupation = req.query.occupation;
		}

		if (req.query.location != "") {
			mostRecentlyAddedUser.location = req.query.location;
		}
	} else if(pageBefore == "Skills"){
		var unameEmail = req.query.email;
		console.log("Email: "+unameEmail);
		for (i = 0; i < numberOfUsers; i++) {
			if (data["users"][i].email == unameEmail) {
				mostRecentlyAddedUser = data["users"][i];
				//Check if user is an interviewER or interviewEE
				if (mostRecentlyAddedUser.interviewer) {
					break;
				}
			}
		}

		console.log("Reached Skills");
		if (req.query.programmingLang != "") {
			console.log("Reached programming langs "+req.query.programmingLang);
			mostRecentlyAddedUser.programmingLang = req.query.programmingLang;
		}
		if (req.query.frameworks != "") {
			mostRecentlyAddedUser.frameworks  = req.query.frameworks;
			console.log("Reached frameworks "+mostRecentlyAddedUser.frameworks);
		}
		if (req.query.softSkills != "") 
			mostRecentlyAddedUser.softSkills  = req.query.softSkills;
	} else if(pageBefore == "Improvements"){
		var unameEmail = req.query.email;
		console.log("Email: "+unameEmail);
		for (i = 0; i < numberOfUsers; i++) {
			if (data["users"][i].email == unameEmail) {
				mostRecentlyAddedUser = data["users"][i];
				//Check if user is an interviewER or interviewEE
				if (mostRecentlyAddedUser.interviewer) {
					break;
				}
			}
		}

		console.log("Reached improvements");
		if (req.query.improvements!= "") 
			mostRecentlyAddedUser.improvements = req.query.improvements;

	} else if (pageBefore == "login") {
		// Look up user in data JSON. 
		var unameEmail = req.query.uname;
		for (i = 0; i < numberOfUsers; i++) {
			if (data["users"][i].email == unameEmail) {
				mostRecentlyAddedUser = data["users"][i];
				//Check if user is an interviewER or interviewEE
				if (mostRecentlyAddedUser.interviewer) {
					req.session.user = mostRecentlyAddedUser
					console.log(req.session)
					console.log("got here!");
					res.render('interviewerProfile', mostRecentlyAddedUser);
					return;
				}
			}
		}
	} else if (pageBefore == "match") {
		var unameEmail = req.query.email;
		console.log(req);
		console.log("Email: "+unameEmail);
		for (i = 0; i < numberOfUsers; i++) {
			if (data["users"][i].email == unameEmail) {
				mostRecentlyAddedUser = data["users"][i];
				//Check if user is an interviewER or interviewEE
				if (mostRecentlyAddedUser.interviewer) {
					break;
				}
			}
		}
	}
	return mostRecentlyAddedUser
}

exports.viewIntervieweeProfile = function(req, res) {
	mostRecentlyAddedUser = get_interviewee_session(req, res)
	req.session.user = mostRecentlyAddedUser // will trigger "can't set headers"
	res.render('intervieweeProfile', mostRecentlyAddedUser);
}