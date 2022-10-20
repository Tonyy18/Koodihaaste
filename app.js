const express = require("express");
const app = express();
require("dotenv").config();
const routers = require("./modules/routers");

express.json()

//Route all static files
app.use(express.static("static"))
//Api requests, /api/*
app.use("/api", routers.api)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/static/html/index.html")
})

app.listen(process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT)
})