var data = require("../users.json");

exports.dosurveyInterviewer = function(req, res) { 
	var newUser = {
			"firstname": req.query.fname, 
			"lastname": req.query.lname,
			"email": req.query.email,
			"interviewer": true,
			"education": "",
			"occupation": "",
			"location": "",
			"company": ""
		}; 

	data["users"].push(newUser);
	console.log("New interviewER added: "+data);

    res.render("interviewerSurvey");
};