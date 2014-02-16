var data = require("../users.json");
console.log(data);

exports.dosurveyInterviewee = function(req, res) {   
	// Add user to dummy database
	var newUser = {
			"firstname": req.query.fname, 
			"lastname": req.query.lname,
			"email": req.query.email,
			"interviewer": true,
			"education": "",
			"occupation": "",
			"location": ""
		}; 

	data["users"].push(newUser);
	console.log(data);

	res.render('intervieweeSurvey');
 }
