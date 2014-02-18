exports.kickoff = function(req, res) { 
	var withWhom = req.params.withWhomType;
	var match = req.params.match
	console.log(match)
	var urlParam = {"match": match};
	res.render('startInterview', urlParam);
};
