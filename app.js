import express from "express";

import  ejs from "ejs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const saltRounds = 10;

import React from 'react';
import ReactDOM from 'react-dom';
import path from 'path';
const __dirname = path.resolve();

const app =express();


app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sneha:test123@cluster0.q2lcn.mongodb.net/meetingDB", {useNewUrlParser: true, useUnifiedTopology: true});

const meetingSchema={
  title:String,
  details: String,
  eventId:String
};

const userSchema = {
  fname:String,
  lname:String,
  email:String,
  password:String,
  googleId:String
};

const Schedule = mongoose.model("Schedule", meetingSchema);
const User = new mongoose.model("User",userSchema);

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

app.get("/calendar", (req, res)=>{
  res.render("calendar");
});

app.get("/myschedule", (req, res)=>{
  Schedule.find({}, (err, meetings)=>{
    res.render("myschedule", {
      newMeetings: meetings
    });
  });
});

app.get("/logout", (req,res) => {
   res.sendFile(__dirname+"/public/loginregister.html");
})


app.post("/signup",(req,res)=>{
  if(req.body.password === req.body.confirmpassword)
  {
    bcrypt.hash(req.body.password, saltRounds, function(err,hash){
      const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hash
      });
      newUser.save(function(err){
        if(err) console.log(err);
        else {
               res.render("schedulehome");
             }
      });
    });
  }else {
    res.redirect("/loginregister");
  }

});

app.post("/login", (req,res)=>{

  const enteredEmail = req.body.email;
  const enteredPassword= req.body.password;

  User.findOne({email:enteredEmail}, function(err,foundUser){
    if(!err){
      if(foundUser){
        bcrypt.compare(enteredPassword, foundUser.password, function(err, result){
          if(!err){
            if(result === true){
              res.render("schedulehome");
            }else{console.log(err);res.redirect("/loginregister");}
          }
        })
      }
    }else{console.log(err);}
  })
})



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
