const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const app = express();
const quotes = require("./quotes");
const textToSpeech = require("./textToSpeech");

app.use(cors());
app.use(express.json());
app.use(parser.urlencoded({ extended: false }));
app.get("/quotes", quotes);
app.post("/textToSpeech", textToSpeech);
app.listen(1111, () =>
  console.log(`Example app listening on port http://localhost:1111`)
);
