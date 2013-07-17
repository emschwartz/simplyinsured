function displayResults() {
	$("#results").innerHTML = "";
}

function searchForDoctors() {
	var firstName = $("#firstName").val(),
		middleName = $("#middleName").val(),
		lastName = $("#lastName").val();

	$.post('/search_doctors', {
		first_name: firstName,
		middle_name: middleName,
		last_name: lastName
	}, function(err, res){
		if (err) throw err;
		console.log(res);
	});


}