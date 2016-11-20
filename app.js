var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var config = require("./config");//way to use local javascript file

/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */

app.use(express.static("public"));
app.set("view engine", "ejs");

// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  token: config.TOKEN,
  token_secret: config.TOKEN_SECRET,
});

/* R O U T E S */
app.get("/", function(req, res){
	res.render("search");
})


app.get("/camps", function(req, res){
	var term = req.query.term; //from /
	var location = req.query.location;

	var query = {
		term: term,
		location: location
	}
	// See http://www.yelp.com/developers/documentation/v2/search_api
	yelp.search(query)
	.then(function (data) {
	  res.render("index", {config: config, data: data, query: query});
	})
	.catch(function (err) {
	  console.error(err);
	});
});

app.listen("3000", function(){
	console.log("App running on Port 3000!")
});