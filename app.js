
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

import nodemailer from 'nodemailer';
import schedule from 'node-schedule';


const app =express();


app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sneha:test123@cluster0.q2lcn.mongodb.net/meetingDB", {useNewUrlParser: true, useUnifiedTopology: true});

const meetingSchema={
  title:String,
  details: String,
  url:String,
  start:Date,
  end:Date,
  allDay: Boolean,
  remindTime:String
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
            }else{  res.redirect("/loginregister");}
          }
        })
      }
    }else{console.log(err);}
  })
})



app.post("/create", (req, res)=>{

  let meeting = new Schedule({
    title : req.body.scheduleTitle,
    details : req.body.scheduleDesc,
    url : req.body.scheduleId,
    start:req.body.scheduleStart,
    end:req.body.scheduleEnd,
    allDay: false,
    remindTime:req.body.remindTime
  });
  meeting.save((err)=>{
    if(!err){
      emailer(req.body.reminderEmail,req.body.scheduleTitle,req.body.scheduleDesc,req.body.scheduleId,req.body.scheduleStart,req.body.remindTime);
      res.redirect("/myschedule");
    } else console.log(err);
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



const emailer=(email,title,desc,url,startDate,remindTime)=>{
 console.log("initiated");

    if(remindTime==="24hr"){
        remindTime=new Date('Jan 2, 1970, 00:00:00')
    }
    else if(remindTime==="12hr"){
        remindTime=new Date('Jan 1, 1970, 12:00:00')
    }
    else if(remindTime==="6hr"){
        remindTime=new Date('Jan 1, 1970, 6:00:00.000')
    }
    else if(remindTime==="1hr"){
        remindTime=new Date('Jan 1, 1970, 1:00:00.000')
    }
    else if(remindTime==="30m"){
        remindTime=new Date('Jan 1, 1970, 00:30:00.000')
    }
    else if(remindTime==="15m"){
        remindTime=new Date('Jan 1, 1970, 00:15:00.000')
    }
    else if(remindTime==="5m"){
        remindTime=new Date('Jan 1, 1970, 00:05:00.000')
    }
    startDate=startDate+':00.000';
    startDate=new Date(startDate);
    const date = new Date(startDate.getTime()-remindTime.getTime()-19800000);
    const mailOptions = {
        from: 'meetingschedulerxd@gmail.com',
        to:`${email}`,
        subject: `Reminder to ${title}`,
        text: `Here are the details of the event:\n${title}\n${desc}\n${url}\nThis is an automated remainder sent to you by the meeting scheduler app.\n`
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'meetingreminderxd@gmail.com',
            pass: 'XD;pq098',
        }
    });

    const job = schedule.scheduleJob(date, function () {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
              console.log('Email sent!' + info.response);
            }
        })
    });
};

const port=process.env.PORT || 3000;

app.listen(port,function(){
  console.log("successfully started the server!");
});
