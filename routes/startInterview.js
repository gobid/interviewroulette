exports.kickoff = function(req, res) { 
	var withWhom = req.params.withWhomType;
	var match = req.params.match
	console.log(match)
	if (withWhom == "iAmInterviewer") {
		var urlParam = {"match": match, "type":"interviewerProfile"};
	} else {
		var urlParam = {"match": match, "type":"intervieweeProfile"};
	}
    res.render('startInterview', urlParam);
};