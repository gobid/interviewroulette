var data = require("../users.json");

exports.dosurveyInterviewer = function(req, res) { 
	var newUser = {
			"firstname": req.query.fname, 
			"lastname": req.query.lname,
			"email": req.query.email,
			"password": req.query.password,
			"interviewer": true,
			"education": req.query.education,
			"occupation": req.query.occupation,
			"location": req.query.location,
			"company": req.query.company,
			"mission": "Tell us more about yourself.",
			"hobbies": "What are your hobbies?",
			"description1": "What did you do? Where did you work?",
			"description2": "What did you do? Where did you work?"
		}; 

	data["users"].push(newUser);
	console.log("New interviewER added: "+data);

    res.render("interviewerSurvey");
};