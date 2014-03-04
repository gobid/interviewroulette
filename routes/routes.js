var model = require('../model');

// ROUTES

exports.saveAvailabilityChange = function(req, res) {
	function afterSave(err){
		if(err) {
			console.log(err)
			res.send(500)
		}
	}

	if(req.query.optionsRadios == 'available') {
		var curr_user = req.session.user
		model.User.update({"email":req.session.user.email}, 
				{"isAvailable":true}
		).exec(afterSave)
	}
	else {
		var curr_user = req.session.user
		model.User.update({"email":req.session.user.email}, 
				{"isAvailable":false}).exec(afterSave)
	}
}

exports.viewEditIntervieweeProfile = function(req, res) {   
	function afterFind(err){
		if(err) {
			console.log(err)
			res.send(500)
		}
		else {
			model.User.find({"email":req.session.user.email}).exec(
				function(err,users){
					if (err) {
						console.log(err)
						res.send(500)
						}
					else {
						var found = users[0]
						req.session.user = found;
						res.render('interviewee/editIntervieweeProfile', req.session.user);							
				   }
				}   
			)
		}
	}
	if (req.query.email){ // form submit
		/*  fname or firstname?? */
		model.User.update({"email":req.session.user.email},
			{
				"firstname":req.query.fname,
				"lastname":req.query.lname,
				"email":req.query.email,
				"education":req.query.education,
				"occupation":req.query.occupation,
				"location":req.query.location
		}).exec(afterFind);			
	}
	else
		afterFind(null) 
 }

exports.viewEditInterviewerProfile = function(req, res) {   
	function afterFind(err){
		if(err) {
			console.log(err)
			res.send(500)
		}
		else {
			model.User.find({"email":req.session.user.email}).exec(
				function(err,users){
					if (err) {
						console.log(err)
						res.send(500)
						}
					else {
						var found = users[0]
						req.session.user = found;
						res.render('interviewer/editInterviewerProfile', req.session.user);							
				   }
				}   
			)
		}
	}
	if (req.query.email){ // form submit
		/*  fname or firstname?? */
		model.User.update({"email":req.session.user.email},
			{
				"firstname":req.query.fname,
				"lastname":req.query.lname,
				"email":req.query.email,
				"education":req.query.education,
				"occupation":req.query.occupation,
				"location":req.query.location,
				"company":req.query.company
		}).exec(afterFind);
		
	} 
	else
		afterFind(null)
 }

exports.view = function(req, res){
	if (req.query.invalid) 
		res.render('prelogin/index', {
			'invalid': req.query.invalid
		})
	else
		res.render('prelogin/index');
};

exports.viewIntervieweeAreasToImprove = function(req, res){
	function afterFind(err){
		if(err) {
			console.log(err)
			res.send(500)
		}
		else {
			model.User.find({"email":req.session.user.email}).exec(
				function(err,users){
					if (err) {
						console.log(err)
						res.send(500)
						}
					else {
						var found = users[0]
						req.session.user = found;
						console.log(req.session.user.isAlternate)	
						res.render('interviewee/intervieweeAreasToImprove', req.session.user);						
				   }
				}   
			)
		}
	}
	if (req.query.improvements){ // form submit
		model.User.update({"email":req.session.user.email},
		{"improvements":req.query.improvements}).exec(afterFind);
	} 
	else
		afterFind(null)
};


exports.viewIntervieweeFeedback = function(req, res){
	model.User.find({"email":req.session.user.email}).exec(renderFeedbacks);
	function renderFeedbacks(err, users) {
        var user = users[0]
        console.log(user.feedback)
		res.render('interviewee/intervieweeFeedback', {'feedbacks': user.feedback, 'isAvailable':req.session.user.isAvailable});
	}
};


exports.viewInterviewerFeedback = function(req, res){
	model.User.find({"email":req.session.user.email}).exec(renderFeedbacks);
	function renderFeedbacks(err, users) {
        var user = users[0]
        console.log(user.feedback)
		res.render('interviewer/interviewerFeedback', {'feedbacks': user.feedback, 'isAvailable':req.session.user.isAvailable});
	}
};


exports.viewIntervieweeSkills = function(req, res){
	console.log('Skills + isAvailable:' + req.session.user.isAvailable)
	function afterFind(err){
		if(err) {
			console.log(err)
			res.send(500)
		}
		else {
			model.User.find({"email":req.session.user.email}).exec(
				function(err,users){
					if (err) {
						console.log(err)
						res.send(500)
						}
					else {
						var curr_user = users[0]
						req.session.user = curr_user;
						res.render('interviewee/intervieweeSkills',req.session.user);							
				   }
				}   
			)
		}
	}	
	if (req.query.programmingLang){ // form submit
		model.User.update({
			"email":req.session.user.email
		},
		{
			"programmingLang":req.query.programmingLang,
			"softSkills":req.query.softSkills,
			"frameworks":req.query.frameworks
		})
		.exec(afterFind);	
	}
	else
		afterFind(null) 
};

exports.dosurveyInterviewee = function(req, res) {   
	model.User.find({
		"email": req.query.email
	}).exec(function(err, users){
		if (err) {
			console.log(err);
			res.send(500)
		}
		else {
			if (users.length == 0){
				var random = Math.random()
				var isAlternate = (random > 0.5)
				var newUser = model.User({
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
					"improvements": "For example: practicing more technical questions, learning to clearly express ideas",
					"isAlternate": isAlternate,
					"isAvailable": true
				}); 
				console.log(newUser)
				newUser.save(function(err){
					if (err) {
						console.log(err)
						res.send(500)
					}
					else {
						req.session.user = newUser
						res.render('interviewee/intervieweeSurvey',newUser);
					}
				});
			}
			else {
				console.log('Associated email address already used.')
				res.send(500)
			}
		}
	});
 }

exports.viewInterviewerAboutMe = function(req, res){
	function afterFind(err){
		if(err) {
			console.log(err)
			res.send(500)
		}
		else {
			model.User.find({"email":req.session.user.email}).exec(
				function(err,users){
					if (err) {
						console.log(err)
						res.send(500)
						}
					else {
						var found = users[0]
						req.session.user = found;	
						res.render('interviewer/interviewerAboutMe', req.session.user);						
				   }
				}   
			)
		}
	}
	if (req.query.mission){ // form submit
		model.User.update({"email":req.session.user.email},
			{"mission":req.query.mission,"hobbies":req.query.hobbies}).exec(afterFind);
	}
	else 
		afterFind(null)
};

exports.viewInterviewerPastExp = function(req, res){
	function afterFind(err){
		if(err) {
			console.log(err)
			res.send(500)
		}
		else {
			model.User.find({
				"email":req.session.user.email
			}).exec(function(err,users){
				if (err) {
					console.log(err)
					res.send(500)
					}
				else {
					var found = users[0]
					req.session.user = found;	
					res.render('interviewer/interviewerPastExp', req.session.user);						
			   }
			})
		}
	}
	if (req.query.description1){ // form submit
		model.User.update({
			"email":req.session.user.email
		},
		{
			"description1":req.query.description1,
			"description2":req.query.description2
		}).exec(afterFind);		
	}
	else
		afterFind(null)
};

exports.dosurveyInterviewer = function(req, res) { 
	model.User.find({
		"email": req.query.email
	}).exec(function(err, users){
		if (err) 
			console.log(err);
		else {
			if (users.length == 0){
				var randnum =  Math.random()
				var isAlternate = (randnum > 0.5)	
				var newUser = model.User({
					"firstname": req.query.fname, 
					"lastname": req.query.lname,
					"email": req.query.email,
					"password": req.query.password,
					"ghangout": req.query.ghangout,
					"interviewer": true,
					"education": req.query.education,
					"occupation": req.query.occupation,
					"location": req.query.location,
					"company": req.query.company,
					"mission": "Tell us more about yourself.",
					"hobbies": "What are your hobbies?",
					"description1": "What did you do? Where did you work?",
					"description2": "What did you do? Where did you work?",
					"isAlternate": isAlternate,
					"isAvailable": true
				}); 
				console.log(isAlternate)
				newUser.save(function(err){
					if (err) {
						console.log(err)
						res.send(500)
					}
					else {
						req.session.user = newUser
						res.render('interviewer/interviewerSurvey',newUser);
					}
				});
			}
			else {
				console.log('Associated email address already used.')
				res.send(500)
			}
		}
	});
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
	
	// eventually create req.session.set and store people already viewed
	// only allow non-viewed people into matching_occupation_users

	// also allow match page to let you know when you have exhausted all options
	matching_occupation_users = []
	
	model.User.find({"occupation":occupation,"interviewer":false}).exec(afterFind);

	function afterFind(err,users){
		if(err) {
		   console.log(err)
		   res.send(500)
		}
        else {
        	for (i = 0; i < users.length; i++){
        		matching_occupation_users.push(users[i]);
        	};

        	// select a random person
			num_matching = matching_occupation_users.length
			rand_index = Math.floor(Math.random() * num_matching)
			matched_user = matching_occupation_users[rand_index]

			var curr_user = req.session.user

			res.render('matchForInterviewer', {
				'match': matched_user,
				'curr_user': curr_user
			});
        }
	};
};

exports.viewMatchForInterviewee = function(req, res){
	// get occupation
	console.log(req.session)
	if (req.session.user) 
		occupation = req.session.user.occupation
	else
		occupation = ''

	// find users with matching occupation

	// eventually create req.session.set and store people already viewed
	// only allow non-viewed people into matching_occupation_users

	// also allow match page to let you know when you have exhausted all options
	matching_occupation_users = []

	model.User.find({"occupation":occupation,"interviewer":true}).exec(afterFind);

	function afterFind(err,users){
		if(err) {
			console.log(err)
			res.send(500)
		}
        else {
        	for (i = 0; i < users.length; i++){
        		matching_occupation_users.push(users[i]);
        	};
        	// select a random person
			num_matching = matching_occupation_users.length
			rand_index = Math.floor(Math.random() * num_matching)
			matched_user = matching_occupation_users[rand_index]

			var curr_user = req.session.user

			res.render('matchForInterviewee', {
				'match': matched_user,
				'curr_user': curr_user,
				'isAvailable':req.session.user.isAvailable
			});
        }
	};
};


exports.postFeedback = function(req,res){
	console.log(req.params.match)
	var curr_user = req.session.user
	res.render('feedback', {
		'match': req.params.match,
		'curr_user': curr_user,
		'isAvailable':req.session.user.isAvailable
	});
};

exports.kickoff = function(req, res) { 
	var curr_user = req.session.user
	res.render('startInterview', {
		'match':req.params.match,
		'curr_user': curr_user,
		'isAvailable':req.session.user.isAvailable
	});
};

exports.kickoffWithInterviewee = function(req, res){
	res.render('interviewee/intervieweeSkills', req.session.user);
};

exports.viewUnimplemented = function(req, res){
	res.render('unimplemented');
};

exports.logout = function(req, res){
	req.session.destroy(function(err){
		if (err) console.log(err)
		console.log('cleared session')
		res.redirect('/');
	})
};

exports.viewSignup = function(req, res){
	res.render('prelogin/signup');
};

exports.viewInterviewerProfile = function(req, res) {
	// this route is only called after session is set
    res.render('interviewer/interviewerProfile', req.session.user);
};

exports.viewInterviewerProfileAlter = function(req,res){
    res.render('interviewer/interviewerProfileAlter',req.session.user);
}

exports.viewIntervieweeProfileAlter = function(req,res){
    res.render('interviewee/intervieweeProfileAlter',req.session.user);
}

exports.viewIntervieweeProfile = function(req, res) {
	if (req.session && req.session.user){
		console.log(req.session.user.isAlternate)
		if (req.query.persontype) { // means came from signup surveys
			console.log('came from signup')		
			if (req.query.persontype == "interviewee") {// interviewee
				console.log('interviewee')
				// update user obj in db
				model.User.update({
					'_id': req.session.user._id
				},
				{
					'occupation': req.query.occupation,
					'education': req.query.education,
					'location': req.query.location
				}).exec(function(err){
					if (err) {
						console.log(err)
						res.send(500)
					}
					else {
						model.User.find({
							'_id': req.session.user._id
						}).exec(function(err, users){
							if (err) {
								console.log(err)
								res.send(500)
							}
							else {
								var user = users[0]
								req.session.user = user
								if(user.isAlternate) res.redirect('intervieweeProfile/alternate');
                                else res.render('interviewee/intervieweeProfile', req.session.user);
							}
						})
					}
				})			
			}	
			else {// interviewer
				console.log('interviewer')
				model.User.update({'_id': req.session.user._id},
				{
					'occupation': req.query.occupation,
					'education': req.query.education,
					'location': req.query.location,
					'company':req.query.company,
				}).exec(function(err){
					if (err) {
						console.log(err)
						res.send(500)
					}
					else {
						model.User.find({
							'_id': req.session.user._id
						}).exec(function(err, users){
							if (err) {
								console.log(err)
								res.send(500)
							}
							else {
								var user = users[0]
								req.session.user = user
								if(user.isAlternate) res.redirect('interviewerProfile/alternate');
                                else res.redirect('interviewerProfile');							
							}
						})
					}
				});		
			}	    
		}   	
		else { // just returning to the page
			if (req.session.user.interviewer){
				if(req.session.user.isAlternate) res.redirect('interviewerProfile/alternate');
                else res.redirect('interviewerProfile');
            }    
			else {
				if(req.session.user.isAlternate) res.redirect('intervieweeProfile/alternate');
                else res.render('interviewee/intervieweeProfile', req.session.user);
            }    
		}
	}
	else if (req.query && req.query.uname){ // after login
		console.log('came from login')
		console.log('email:', req.query.uname)
		console.log('password:', req.query.password)
		model.User.find({
			"email": req.query.uname,
			"password": req.query.password
		}).exec(afterFind);

		function afterFind(err, users){
		    if (err) {
				console.log(err)
				res.send(500)
			}
			else if (users.length > 0){
				var user = users[0]
				console.log(user);
				console.log(user.password);
				console.log(user.isAlternate)
				req.session.user = user
				if (user.interviewer){
					if(user.isAlternate) res.redirect('interviewerProfile/alternate');
                    else res.redirect('interviewerProfile');				
				}	
				else {
					console.log('I AM HERE')
					if(user.isAlternate) {
						res.redirect('intervieweeProfile/alternate');
						console.log('I AM HERE again');
					}	
                    else res.render('interviewee/intervieweeProfile', req.session.user);
				}				
			}
			else 
				res.redirect('/?invalid=1')
		}
	}	
	else 
		res.redirect('/?invalid=1');
}

exports.saveFeedback = function(req,res){
	function afterUpdate(err){
		if(err) {
			console.log(err)
			res.send(500)
		}
		else {		
			res.render('feedbackSaved', {'match':req.params.match,'curr_user':curr_user, 'isAvailable':req.session.user.isAvailable});											
		}
	}
	
	if(req.query.feedback){
		console.log("I came here!")
		var curr_user = req.session.user
		console
		model.User.update({"email":req.params.match},
		{ $push: {"feedback":{"text":req.query.feedback,"by":curr_user.firstname}}
		}).exec(afterUpdate);
	}
	else
		afterUpdate(null);
}






