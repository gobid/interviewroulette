var data = require("../users.json");

exports.dosurveyInterviewee = function(req, res) {   
	// Add user to dummy database
	var newUser = {
			"firstname": req.query.fname, 
			"lastname": req.query.lname,
			"email": req.query.email,
			"interviewer": false,
			"education": "",
			"occupation": "",
			"location": ""
		}; 

	data["users"].push(newUser);
	console.log("New interviewEE added: "+data);

	res.render('intervieweeSurvey');
 }
