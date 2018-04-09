require('dotenv').config();
const keys = require("./keys.js");
const request = require('request');
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
		}else{
			let songName = process.argv.slice(3).join(' ');
			spotifyMe(songName);
		}
		break;
	case "movie-this":
		console.log("Me movie this")
		break;
	case "do-what-it-says":
		console.log("do whachawachawatcha want watchawant")
		break;
	default:
		console.log("default :(");
}

function myTweets() {
	var params = {
		screen_name: 'j0shc0ast',
		count: 20
	};
	Client.get('statuses/user_timeline.json', params, function (error, tweets, response) {
		if (!error) {
			tweets.forEach(function (element) {
				console.log(element.text);
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
				console.log("-------------");
				console.log("Artist Name: " + element.album.artists[0].name);
				console.log("Song Name: " + element.name);
				console.log("Spotify Link: " + element.album.external_urls.spotify);
				console.log("Album Name: " + element.album.name);
				console.log("-------------");
			})
			//console.log(data.tracks.items[2]);
		} else {
			return console.log('Error occurred: ' + error);
		}
	});
}