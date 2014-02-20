var data = require("../users.json");

// FUNCTIONS

function findUser(uname){
	var numberOfUsers = data["users"].length
	for (i = 0; i < numberOfUsers; i++) {
		if (data["users"][i].email == uname) {
			return data["users"][i]
		}
	}
}

function findUserIndex(uname){
	var numberOfUsers = data["users"].length
	for (i = 0; i < numberOfUsers; i++) {
		if (data["users"][i].email == uname) {
			return i
		}
	}
}

// ROUTES

exports.viewEditIntervieweeProfile = function(req, res) {   
	if (req.query.email){ // form submit
		index = findUserIndex(req.session.user.email)
		data["users"][index]["fname"] = req.query.fname
		data["users"][index]["lname"] = req.query.lname
		data["users"][index]["email"] = req.query.email
		data["users"][index]["education"] = req.query.education
		data["users"][index]["occupation"] = req.query.occupation
		data["users"][index]["location"] = req.query.location
		req.session.user = data["users"][index]
	} 
	res.render('interviewee/editIntervieweeProfile', req.session.user);
 }

exports.viewEditInterviewerProfile = function(req, res) {   
	if (req.query.email){ // form submit
		index = findUserIndex(req.session.user.email)
		data["users"][index]["fname"] = req.query.fname
		data["users"][index]["lname"] = req.query.lname
		data["users"][index]["email"] = req.query.email
		data["users"][index]["education"] = req.query.education
		data["users"][index]["occupation"] = req.query.occupation
		data["users"][index]["company"] = req.query.company
		data["users"][index]["location"] = req.query.location
		req.session.user = data["users"][index]
	} 
	res.render('interviewer/editInterviewerProfile', req.session.user);
 }

exports.viewEditProfile = function(req, res) {   
	res.render('editProfile', data);
 }

exports.view = function(req, res){
  res.render('prelogin/index');
};

exports.viewIntervieweeAreasToImprove = function(req, res){
	if (req.query.email){ // form submit
		index = findUserIndex(req.session.user.email)
		data["users"][index]["improvements"] = req.query.improvements
		req.session.user = data["users"][index]
	} 
	res.render('interviewee/intervieweeAreasToImprove', req.session.user);
};

exports.viewIntervieweeFeedback = function(req, res){
	res.render('interviewee/intervieweeFeedback', req.session.user);
};

exports.viewIntervieweePublicRatings = function(req, res){
	res.render('interviewee/intervieweePublicRatings', req.session.user);
};

exports.viewIntervieweeSkills = function(req, res){
	if (req.query.email){ // form submit
		index = findUserIndex(req.session.user.email)
		data["users"][index]["programmingLang"] = req.query.programmingLang
		data["users"][index]["softSkills"] = req.query.softSkills
		data["users"][index]["frameworks"] = req.query.frameworks
		req.session.user = data["users"][index]
	} 
	res.render('interviewee/intervieweeSkills', req.session.user);
};

exports.dosurveyInterviewee = function(req, res) {   
	var newUser = {
			"firstname": req.query.fname, 
			"lastname": req.query.lname,
			"email": req.query.email,
			"password": req.query.password,
			"ghangout": req.query.ghangout,
			"interviewer": false,
			"education": req.query.education,
			"occupation": req.query.occupation,
			"location": req.query.location,
			"programmingLang": "For example: Java, C++, Python",
			"softSkills": "For example: Good communication skills, Experience managing teams",
			"frameworks": "For example: DJango, MongoDB, Google AppEngine",
			"improvements": "For example: practicing more technical questions, learning to clearly express ideas"
		}; 
	data["users"].push(newUser);
	var numberOfUsers = data["users"].length
	req.session.user = data["users"][numberOfUsers-1]
	res.render('interviewee/intervieweeSurvey');
 }

exports.viewInterviewerAboutMe = function(req, res){
	if (req.query.email){ // form submit
		index = findUserIndex(req.session.user.email)
		data["users"][index]["mission"] = req.query.mission
		data["users"][index]["hobbies"] = req.query.hobbies
		req.session.user = data["users"][index]
	}
	res.render('interviewer/interviewerAboutMe', req.session.user);
};

exports.viewInterviewerPastExp = function(req, res){
	if (req.query.email){ // form submit
		index = findUserIndex(req.session.user.email)
		data["users"][index]["description1"] = req.query.description1
		data["users"][index]["description2"] = req.query.description2
		req.session.user = data["users"][index]
	}
	res.render('interviewer/interviewerPastExp', req.session.user);
};

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
	var numberOfUsers = data["users"].length
	req.session.user = data["users"][numberOfUsers-1]
    res.render("interviewer/interviewerSurvey");
};

exports.viewLogin = function(req, res){
	res.render('prelogin/login');
};

exports.viewMatchForInterviewer = function(req, res){
	// get occupation
	console.log(req.session)
	if (req.session.user) 
		occupation = req.session.user.occupation
	else
		occupation = ''

	// find users with matching occupation
	matching_occupation_users = []
	var numberOfUsers = data["users"].length;
	for (i = 0; i < numberOfUsers; i++) {
		user = data['users'][i]
		if (!user.interviewer && user.occupation == occupation)
			matching_occupation_users.push(user)
	}
	
	// select a random person
	num_matching = matching_occupation_users.length
	rand_index = Math.floor(Math.random() * num_matching)
	matched_user = matching_occupation_users[rand_index]

	var curr_user = req.session.user

	res.render('matchForInterviewer', {
		'match': matched_user,
		'curr_user': curr_user
	});
};

exports.viewMatchForInterviewee = function(req, res){
	// get occupation
	console.log(req.session)
	if (req.session.user) 
		occupation = req.session.user.occupation
	else
		occupation = ''

	// find users with matching occupation
	matching_occupation_users = []
	var numberOfUsers = data["users"].length;
	for (i = 0; i < numberOfUsers; i++) {
		user = data['users'][i]
		console.log(user)
		if (user.interviewer && user.occupation == occupation){
			console.log('came here user is')
			console.log(user)
			matching_occupation_users.push(user)
		}
	}

	// select a random person
	num_matching = matching_occupation_users.length
	rand_index = Math.floor(Math.random() * num_matching)
	matched_user = matching_occupation_users[rand_index]

	var curr_user = req.session.user

	res.render('matchForInterviewee', {
		'match': matched_user,
		'curr_user': curr_user
	});
};

exports.viewSignup = function(req, res){
	res.render('prelogin/signup');
};

exports.kickoff = function(req, res) { 
	res.render('startInterview', {
		"match": req.params.match,
	});
};

exports.kickoffWithInterviewee = function(req, res){
	res.render('interviewee/intervieweeSkills', req.session.user);
};

exports.viewUnimplemented = function(req, res){
	res.render('unimplemented');
};

exports.logout = function(req, res){
	req.session.destroy()
	console.log('cleared session')
	res.redirect('/');
};

exports.viewInterviewerProfile = function(req, res) {
	// this route is only called after session is set
	var user = req.session.user
	res.render('interviewer/interviewerProfile', user);
}

exports.viewIntervieweeProfile = function(req, res) {
	if (req.session && req.session.user){
		if (req.query['person-type']) { // means came from signup surveys
			console.log('came from signup')
			var index = findUserIndex(req.session.user.email)
			if (req.query['person-type'] == "interviee") {
				console.log('interviewee')
				// update user obj in db
				data["users"][index]['occupation'] = req.query.occupation
				data["users"][index]['education'] = req.query.education
				data["users"][index]['location'] = req.query.location
				data["users"][index]['occupation'] = req.query.occupation
				req.session.user = data["users"]["index"]
				res.render('interviewee/intervieweeProfile', req.session.user);
			}
			else {
				console.log('interviewer')
				data["users"][index]['occupation'] = req.query.occupation
				data["users"][index]['company'] = req.query.company
				data["users"][index]['education'] = req.query.education
				data["users"][index]['location'] = req.query.location
				req.session.user = data["users"]["index"]
				res.redirect('interviewerProfile')
			}

		}
		else { // just returning to the page
			var user = req.session.user
			if (user.interviewer)
				res.redirect('interviewerProfile')
			else 
				res.render('interviewee/intervieweeProfile', user);
		}
	}
	else if (req.query && req.query.uname){ // means came from login
		console.log('came from login')
		var user = findUser(req.query.uname)
		if (user && req.query.password == user.password) {
			req.session.user = user
			if (user.interviewer)
				res.redirect('interviewerProfile')
			else {
				console.log('I AM HERE')
				res.render('interviewee/intervieweeProfile', user);
			}
		}
		else {
			res.redirect('/')
		}
	}
	else 
		res.redirect('/')
}
