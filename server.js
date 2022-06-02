const express = require("express");
const axios = require("axios");
const helmet = require("helmet");
const apiPort = require("./environment/index");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.get("/search", (req, res) => {
  const itunesURL = `https://itunes.apple.com/search?term=${
    req.query.term
  }&media=${req.query.media ? req.query.media : ""} `;
  console.log(req.query.media);
  axios
    .get(itunesURL)
    .then((response) => {
      // console.log(response.data);
      return res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal Server Error!");
    });
});

app.get("*", (req, res) => {
   res.status(404).end("Page Not Found!");
});

app.listen(apiPort.API_PORT, () => {
  console.log(`Server listening on: ${apiPort.API_PORT}`);
});

// Firstly, I created express app by running npm init, thereafter following all prompts that followed.
// In then imported express middleware, followed by axios, helmet and apiPort.
// We need axios so we can be able to do api requests like the get requests we are mainly going to use in this app.
// The original api url is https://itunes.apple.com/search?term=jack+jackson&media=music
// We use helmet to provide an extra layer of security to our app when http header requests are made 
// The apiPort contains the PORT number at which I want my app to run on which is 8081

// I then set my app to use express middleware, json and helmet before any operations are executed

// I then called axios get method, with a url or /results
// With this, I expect a user to pass words in the search bar and search maybe king gordy, then depending on availability, app will
// return a response that we'll set to be in json format else returns an internal server error message

// I also defined another get at which maybe user requests a wrong url altogether per say http://localhost:8081/results/sdfgsdgsdfa
// then it will return page not found message

// I then ensured my app listens on the specified port number I want that I created in index.js file under environment folder.
// I went to package.json and under scripts, I added two lines, for my app to start when user runs npm run server or npm start

// Finally I then ran the app on http://localhost:8081/results and I got a response of a whole json file with artistNames and some other information

// After trying to run my app with my frontend, I received a CORS error then came back to my server, installed cors and voila, I was good

// Finally I performed testing using chai module. 
// Initially it will check the return response from https://itunes.apple.com/search?term=jack+jackson&media=music then 
// we have data that we're expecting to receive, which is having a property name of artistName and if the format is in object mode
