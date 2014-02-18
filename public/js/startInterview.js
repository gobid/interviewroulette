$(document).ready(function(){
	console.log('page loaded')
	$(document).on('click', '#copier', function(){
		$("#copytext").select()
	})
})