const functions = require("firebase-functions");
const { pageMetadata } = require("./pageMetadata");
const { artist } = require("./artist");
const { aboutArtwork } = require("./aboutArtwork");
const express = require("express");
const axios = require('axios')

// https://stackoverflow.com/questions/44959652/firebase-hosting-with-dynamic-cloud-functions-rewrites
const app = express();

app.use("/api/artworks", pageMetadata);
app.use("/api/artist", artist);
app.use("/api/aboutArtwork", aboutArtwork);

const instance = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  timeout: 10000,
});

const articExpress = express();

articExpress.get("/:path", (req, res) => {
  const { path } = req.params;

  return instance.get();
});

articExpress.post("/:path", (req, res) => {
  const { path } = req.params;
});

app.use("/api/artic", articExpress);

// exports.artic = functions.https.onCall(async (data, context) => {
//   const { path, method, params, payload } = data;

//   const { auth } = context;
//   if (!auth) return HttpsError("unauthenticated", "User is not authenticated");

//   return instance({ method, path, params, data: payload });
// });

exports.main = functions.https.onRequest(app);
