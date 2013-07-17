var express = require('express'),
Browser = require("zombie"),
assert = require("assert");

var app = express()
.use(express.bodyParser())
.use(express.static('public'));


function nameMatches(doctorName, first, middle, last){
	if (last != '' && doctorName.indexOf(last) == -1)
		return false;
	if (first != '' && doctorName.indexOf(first) == -1)
		return false;
	if (middle != '' && doctorName.indexOf(middle.substring(0, 1)) == -1) 
		return false
	return true;
}

app.post('/search_doctors', function(req, res){

	var first = req.body.first_name,
	middle = req.body.middle_name,
	last = req.body.last_name,
	search_name = first + " " + middle + " " + last;

	// var browser = new Browser();
	Browser.visit("http://www.cigna.com/web/public/hcpdirectory", function (err, browser, status) {
		if (err) throw err;

		browser
		.select('select#landingPageSelectedDropDownValue', 'Person By Name')
		.fill('input#lookingForText', search_name)
		.fill('input#searchLocation', 'San Francisco, CA')
		.pressButton('button#searchLocBtn', function(){
			var doctors = browser.document.querySelectorAll('a.profile-name');
			for (d = 0; d < doctors.length; d++){
				
				var doctorName = doctors[d].childNodes[0].nodeValue;
				if (nameMatches(doctorName, first, middle, last)) {
					console.log(doctorName);
				}
			}
		});
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});