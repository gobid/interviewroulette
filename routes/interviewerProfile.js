var data = require("../users.json");

exports.viewInterviewerProfile = function(req, res) {
	var pageBefore = req.params.pageBefore;
	console.log("Page before: "+req.params.pageBefore);

	var numberOfUsers = data["users"].length;
	var mostRecentlyAddedUser = data["users"][numberOfUsers - 1];

	if(pageBefore == "Survey") {
		console.log("Reached Survey");
		var company = req.query.company;
		mostRecentlyAddedUser.company = company;

	} else if (pageBefore == "editInterviewerProfile") {
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

		console.log("Page before was editing!")
		if (req.query.fname != "") {
			mostRecentlyAddedUser.firstname = req.query.fname;
		}

		if (req.query.lname != "") {
			mostRecentlyAddedUser.lastname = req.query.lname;
		}

		if (req.query.email != "") {
			mostRecentlyAddedUser.email = req.query.email;
		}

		if (req.query.education != "") {
			mostRecentlyAddedUser.education = req.query.education;
		}

		if (req.query.occupation != "") {
			mostRecentlyAddedUser.occupation = req.query.occupation;
		}

		if (req.query.location != "") {
			mostRecentlyAddedUser.location = req.query.location;
		}

		if (req.query.company != "") {
			mostRecentlyAddedUser.company = req.query.company;
		}
		console.log(mostRecentlyAddedUser);

	} else if (pageBefore == "AboutMe") {
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

		if (req.query.missionStatement != "") 
			mostRecentlyAddedUser.mission = req.query.missionStatement;
		if (req.query.hobbies != "") 
			mostRecentlyAddedUser.hobbies = req.query.hobbies;

	} else if(pageBefore == "PastExp"){
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

		console.log("Reached PastExp");
		if (req.query.description1 != "") 
			mostRecentlyAddedUser.description1= req.query.description1;
		if (req.query.description2 != "") 
			mostRecentlyAddedUser.description2 = req.query.description2;

	} else if (pageBefore == "Sidebar"){
		console.log("Previous Page was sidebar");
		// Look up user in data JSON. 
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
	req.session.user = mostRecentlyAddedUser
	res.render('interviewerProfile', mostRecentlyAddedUser);
}