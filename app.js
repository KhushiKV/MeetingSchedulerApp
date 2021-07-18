import express from "express";

import  ejs from "ejs";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import React from 'react';
import ReactDOM from 'react-dom';
import path from 'path';
const __dirname = path.resolve();


const app =express();

mongoose.connect("mongodb://localhost:27017/meetingDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine","ejs");

const meetingSchema={
  title:String,
  details: String,
  eventId:String
};

const Schedule = mongoose.model("Schedule", meetingSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",(req,res)=>{

    res.sendFile(__dirname+"/public/home.html");
});

app.get("/loginregister", (req,res) => {

   res.sendFile(__dirname+"/public/loginregister.html");
});

app.get("/schedulehome", (req, res)=>{
  res.render("schedulehome");
});

app.get("/create", (req,res)=>{
  res.render("create");
});

app.get("/myschedule", (req, res)=>{
  Schedule.find({}, (err, meetings)=>{
    res.render("myschedule", {
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
      res.redirect("/myschedule");
    }
  });
});

app.post("/delete", (req, res)=>{
  const checkedItemId = (req.body.checkbox);
  Schedule.deleteOne({_id:checkedItemId}, (err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("success");
      res.redirect("/myschedule");
    }
  });
});





app.listen(3000,function(){
  console.log("successfully started the server!");
})
