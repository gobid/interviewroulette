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
			"location": "",
			"programmingLang": "For example: Java, C++, Python",
			"softSkills": "For example: Good communication skills, Experience managing teams",
			"frameworks": "For example: DJango, MongoDB, Google AppEngine",
			"improvements": "For example: practicing more technical questions, learning to clearly express ideas"
		}; 

	data["users"].push(newUser);
	console.log("New interviewEE added: "+data);

	res.render('intervieweeSurvey');
 }
