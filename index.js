const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use('/src', express.static('src'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use(session({secret: 'ssshhhhh'}));
app.use(cookieParser());

app.get("/login", (req, res) => {
    sess = req.session;
    if(sess.email || req.cookies.email)
        res.redirect("/");
    res.sendFile(__dirname + "/login.html");
});

app.get("/register", (req, res) => {
    sess = req.session;
    if(sess.email || req.cookies.email)
        res.redirect("/");
    res.sendFile(__dirname + "/register.html");
});

app.get("/logged/:email", (req, res) => {
    sess = req.session;
    sess.email = req.params.email;
    res.redirect("/");
});

app.get("/", (req,res) => {
    sess= req.session;
    if(sess.email || req.cookies.email){
        res.sendFile(__dirname + "/index.html")
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", (req, res) => {
    if(sess.email || req.cookies.email){
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
    sess= req.session;
    if(sess.email || req.cookies.email){
        res.sendFile(__dirname + "/uploadImage.html")
    } else {
        res.redirect("/login");
    }
});

app.listen(3000, ()=>{
    console.log(`Running on localhost 3000`);
});