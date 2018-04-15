# liri-node-app
LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

To use this app, run one of the following commands
1) node liri.js my-tweets --> Show Last 20 Tweets of j0shc0ast.
2) node liri.js spotify-this-song "your song name here" --> Get Song Info.
3) node liri.js movie-this "your movie name here" --> Get Movie Info
4) node liri.js do-what-it-says --> Takes a Command from random.txt

## Setup

Run `npm init` and `npm install` from the root directory of the project.

## .evn file

Create a file named `.env` in the root, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

```

* This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.

* If you have cloned this app from github and want to run it, you would need to supply your own `.env` file for it to work.
