var URLMap = require('../models/urlmap');

exports.GoHome = function(req, res, next) {
	var example = {};
	example.url = req.protocol + '://' + req.get('host') + "/add/" + "https://www.twitch.tv";
	example.output = '{ "original_url":"https://www.twitch.tv", "short_url": "';
	example.output += req.protocol + '://' + req.get('host') + "/" + '1" }';
	example.usage = req.protocol + '://' + req.get('host') + "/" + '1';
	example.redirect = "https://www.twitch.tv";

	res.render('index', { title: 'URL Shortener', example: example, error: req.query.error });
}

exports.AddURL = function(req, res, next) {
	var url = req.params[0];
	console.log(url);
	if(url.match(/^http/)) {
		URLMap.count().exec(function(err, data) {
			var objectIndex = data;
			URLMap.create({key: objectIndex, url: url});

			var resJSON = {};
			resJSON.original_url = url;
			resJSON.short_url = req.protocol + '://' + req.get('host') + "/" + objectIndex;
			res.json(resJSON);
			return;
		});
		
	}
	else {
		var resJSON = {};
		resJSON.error = "Invalid Input!  Your URL has to start with 'http' or 'https'!";
		res.json(resJSON);
	}
}

exports.GoToURL = function(req, res, next) {
	var urlKey = req.params.urlID;
	if(isNaN(urlKey)) {
		res.redirect("/?error=Invalid URL!  See examples below");
		return;
	}

	URLMap.findOne({'key': urlKey}).select('url').exec(function (err, entry) {
		if(entry == null) {
			res.redirect("/?error=Invalid URL!  See examples below");
			return;
		}

		else {
			res.redirect(entry.url);
		}

	});
}