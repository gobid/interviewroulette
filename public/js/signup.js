$(document).ready(function(){
	$('.intervieweree').click(function(){
		console.log('radio buttons clicked')
		type = $(this).val()
		console.log(type)
		if (type == 'interviewee'){
			$('#signup-form').prop('action', '/intervieweeSurvey')
		}
		else {
			$('#signup-forcm').prop('action', '/interviewerSurvey')
		}
	})
})