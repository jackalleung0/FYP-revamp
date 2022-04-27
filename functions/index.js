const functions = require("firebase-functions");
const { pageMetadata } = require("./pageMetadata");
const { artist } = require("./artist");
const { aboutArtwork } = require("./aboutArtwork");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



exports.artworks = functions.https.onRequest(pageMetadata);

exports.artist = functions.https.onRequest(artist);

// show exhibition hist
exports.aboutArtwork = functions.https.onRequest(aboutArtwork);
