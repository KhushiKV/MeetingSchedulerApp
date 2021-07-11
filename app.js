const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

const meetings=[];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
  res.render("index");
});

app.get("/create", (req,res)=>{
  res.render("create");
});

app.get("/schedule", (req, res)=>{
  res.render("schedule", {newMeetings: meetings});
});

app.post("/create", (req, res)=>{
  let meeting = {
    title : req.body.scheduleTitle,
    details : req.body.scheduleTime,
    id : req.body.scheduleId
  }
  meetings.push(meeting);
  res.redirect("/schedule");
});

app.listen(3000, ()=>{
  console.log("app is listening");
});
