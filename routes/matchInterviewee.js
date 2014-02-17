var data = require("../users.json");

exports.viewMatchIntervieweePage = function(req, res) {   
	// get occupation
	console.log(req.session)
	if (req.session.user) 
		occupation = req.session.user.occupation
	else
		occupation = ''
	// find users with matching occupation
	console.log('occupation' + occupation)
	matching_occupation_users = []
	var numberOfUsers = data["users"].length;
	for (i = 0; i < numberOfUsers; i++) {
		user = data['users'][i]
		if (user.occupation == occupation)
			matching_occupation_users.append(user)
	}
	console.log(matching_occupation_users)
	num_matching = matching_occupation_users.length
	rand_index = Math.floor(Math.random() * num_matching)
	matched_user = matching_occupation_users[rand_index]
	console.log(matched_user) 

	res.render('matchInterviewee');
 }
