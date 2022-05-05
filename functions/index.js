const functions = require("firebase-functions");
const { pageMetadata } = require("./pageMetadata");
const { artist } = require("./artist");
const { aboutArtwork } = require("./aboutArtwork");
const express = require("express");

// https://stackoverflow.com/questions/44959652/firebase-hosting-with-dynamic-cloud-functions-rewrites
const app = express();

app.use("/api/artworks", pageMetadata);
app.use("/api/artist", artist);
app.use("/api/aboutArtwork", aboutArtwork);

exports.main = functions.https.onRequest(app);
