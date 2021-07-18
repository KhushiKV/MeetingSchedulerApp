const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

mongoose.connect("mongodb://localhost:27017/meetingDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");

const meetingSchema={
  title:String,
  details: String,
  eventId:String
};

const Schedule = mongoose.model("Schedule", meetingSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
  res.render("index");
});

app.get("/create", (req,res)=>{
  res.render("create");
});

app.get("/schedule", (req, res)=>{
  // res.render("schedule", {newMeetings: meetings});
  Schedule.find({}, (err, meetings)=>{
    res.render("schedule", {
      newMeetings: meetings
    });
  });
});

app.post("/create", (req, res)=>{
  let meeting = new Schedule({
    title : req.body.scheduleTitle,
    details : req.body.scheduleTime,
    eventId : req.body.scheduleId
  });
  meeting.save((err)=>{
    if(!err){
      res.redirect("/schedule");
    }
  });
  // meetings.push(meeting);
  // res.redirect("/schedule");
});

app.post("/delete", (req, res)=>{
  const checkedItemId = (req.body.checkbox);
  Schedule.deleteOne({_id:checkedItemId}, (err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("success");
      res.redirect("/schedule");
    }
  });
});

app.listen(3000, ()=>{
  console.log("app is listening");
});
