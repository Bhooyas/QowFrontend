const express = require("express");
const session = require("express-session");
const AWS = require("aws-sdk");

const app = express();
AWS.config.update({region: "us-east-1",});
var s3 = new AWS.S3({apiVersion: "2006-03-01",params: { Bucket: "qowbucket" }});

app.use('/src', express.static('src'));
app.use('/js', express.static('js'));
app.use(session({secret: 'ssshhhhh'}));

app.get("/login", (req, res) => {
    sess = req.session;
    if(sess.accessToken)
        res.redirect("/");
    res.sendFile(__dirname + "/login.html");
});

app.get("/register", (req, res) => {
    sess = req.session;
    if(sess.accessToken)
        res.redirect("/");
    res.sendFile(__dirname + "/register.html");
});

app.get("/logged/:accessToken", (req, res) => {
    sess = req.session;
    sess.accessToken = req.params.accessToken;
    res.redirect("/");
});

app.get("/", (req,res) => {
    sess= req.session;
    if(sess.accessToken){
        // res.send("LoggedIn");
        res.sendFile(__dirname + "/uploadImage.html")
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", (req, res) => {
    if(sess.accessToken){
        req.session.destroy((err) => {
            if(err){
                res.send(err);
            } else {
                res.redirect("/");
            }
        });
    } else {
        res.redirect("/login");
    }
});

app.get("/upload", (req, res) => {
    res.send(req.query.image);
});

app.listen(80, ()=>{
    console.log(`Running on localhost 80`);
});