var data = require("../users.json");

exports.viewIntervieweeProfile = function(req, res) {
	var pageBefore = req.params.pageBefore;
	if(pageBefore == "Survey" || pageBefore == "Sidebar") {
		//res.render
		res.render('intervieweeProfile', data);
	} else { // Survey page OR from sidebar
		if (req.query.fname != "") {
			data["users"][0].firstname = req.query.fname;
		}

		if (req.query.lname != "") {
			data["users"][0].lastname = req.query.lname;
		}

		if (req.query.email != "") {
			data["users"][0].email = req.query.email;
		}

		if (req.query.education != "") {
			data["users"][0].education = req.query.education;
		}

		if (req.query.occupation != "") {
			data["users"][0].occupation = req.query.occupation;
		}

		if (req.query.location != "") {
			data["users"][0].location = req.query.location;
		}

		// data["users"][0].firstname = 
		res.render('intervieweeProfile', data);
		//editProfilePage"
	} 
}