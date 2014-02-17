exports.kickoff = function(req, res) { 
	var withWhom = req.params.withWhomType;

	if (withWhom == "iAmInterviewer") {
		var urlParam = {"type":"interviewerProfile"};
	} else {
		var urlParam = {"type":"intervieweeProfile"};
	}
    res.render('startInterview', urlParam);
};