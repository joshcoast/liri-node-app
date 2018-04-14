require('dotenv').config();
const keys = require("./keys.js");
const request = require('request');
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


var Spotify = new Spotify(keys.spotify);
var Client = new Twitter(keys.twitter);

switch (process.argv[2]) {
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		if (process.argv[3] === undefined) {
			let songName = "The Sign";
			spotifyMe(songName);
		} else {
			let songName = process.argv.slice(3).join(' ');
			spotifyMe(songName);
		}
		break;
	case "movie-this":
		if (process.argv[3] === undefined) {
			let movieName = "Mr. Nobody";
			movieThis(movieName);
		} else {
			let movieName = process.argv.slice(3).join(' ');
			movieThis(movieName);
		}
		break;
	case "do-what-it-says":
		doIt();
		break;
	default:
		console.log("default :(");
}

function doIt() {
	// This block of code will read from the "movies.txt" file.
	// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
	// The code will store the contents of the reading inside the variable "data"
	fs.readFile("random.txt", "utf8", function (error, data) {

		// If the code experiences any errors it will log the error to the console.
		if (!error) {
			let songName = data.match(/".*?"/);
			spotifyMe(songName);
		} else {
			return console.log(error);
		}
	});
}

function movieThis(movieName) {
	request('http://www.omdbapi.com/?apikey=de873c80&t=' + movieName, function (error, response, body) {
		if (!error) {
			let obj = JSON.parse(body);
			let movieThisOutPut =
`-----
Title: ${obj.Title}
Year: ${obj.Year}
IMDB Rating: ${obj.imdbRating}
Rotten Tomatoes Rating: ${obj.Ratings[1].Value}
Country: ${obj.Country}
Language: ${obj.Language}
Plot: ${obj.Plot}
Actors: ${obj.Actors}
-----`
			console.log(movieThisOutPut);
			logData(movieThisOutPut);
		} else {
			console.log('error: ', error);
			console.log('statusCode: ', response && response.statusCode);
		}
	});
}

function myTweets() {
	var params = {
		screen_name: 'j0shc0ast',
		count: 20
	};
	Client.get('statuses/user_timeline.json', params, function (error, tweets, response) {
		if (!error) {
			tweets.forEach(function (element) {
			let tweetOutPut =
`---
${element.text}
Created On: ${element.created_at}
---`
			console.log(tweetOutPut);
			logData(tweetOutPut);
			})
		} else {
			console.log('Error occurred: ' + error);
		}
	});
};

function spotifyMe(songName) {
	Spotify.search({
		type: 'track',
		query: songName
	}, function (error, data) {
		if (!error) {
			data.tracks.items.forEach(function (element) {
				let spotifyMeOutPut = 
`-------------
Artist Name: ${element.album.artists[0].name}
Song Name: ${element.name}
Spotify Link: ${element.album.external_urls.spotify}
Album Name: ${element.album.name}
-------------`
				console.log(spotifyMeOutPut);
				logData(spotifyMeOutPut);
			})
		} else {
			return console.log('Error occurred: ' + error);
		}
	});
}

function logData(theData) {
	fs.appendFile("log.txt", theData, function (error) {
		if (!error) {
			//console.log("data logged");
		} else {
			console.log("log error: " + error);
		}
	})
};