/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var routes = require('./routes/routes')

var partialsDir="views/partials/";

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', routes.view);
app.get('/logout', routes.logout)
app.get('/signup', routes.viewSignup);
app.get("/intervieweeSurvey", routes.dosurveyInterviewee);
app.get("/interviewerSurvey", routes.dosurveyInterviewer);

app.get("/startInterview/:match",routes.kickoff);
app.get("/startInterviewWithInterviewee/:match",routes.kickoffWithInterviewee);

app.get("/login", routes.viewLogin);
app.get("/unimplemented", routes.viewUnimplemented);

//INTERVIEWEE PAGES
app.get('/intervieweeProfile', routes.viewIntervieweeProfile);
app.get('/intervieweeFeedback',routes.viewIntervieweeFeedback);
app.get('/intervieweeSkills',routes.viewIntervieweeSkills);
app.get('/intervieweeAreasToImprove',routes.viewIntervieweeAreasToImprove);
app.get('/editIntervieweeProfile', routes.viewEditIntervieweeProfile);

//INTERVIEWER PAGES
app.get('/interviewerProfile', routes.viewInterviewerProfile);
app.get('/interviewerPastExp', routes.viewInterviewerPastExp);
app.get('/interviewerAboutMe', routes.viewInterviewerAboutMe);
app.get('/editInterviewerProfile', routes.viewEditInterviewerProfile);

// DUMMY MATCH PAGES
app.get("/matchForInterviewee", routes.viewMatchForInterviewee);
app.get("/matchForInterviewer", routes.viewMatchForInterviewer);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
