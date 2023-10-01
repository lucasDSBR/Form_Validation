var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var express = require("express");
const flash = require("express-flash");
var session = require("express-session");


var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(cookieParser("3d43019jf2$R@#F@$WDS"));


app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 60000}
}));

app.use(flash());


app.get("/", (req, res) => {
	var emailError = req.flash("emailError");
	var pointsError = req.flash("pointsError");
	var nameError = req.flash("nameError");


	emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
	res.render("index", {emailError, pointsError, nameError, name: req.flash("name")})
});


app.post("/form", (req, res) => {
	var { email, name, points} = req.body;

	var emailError;
	var pointsError;
	var nameError;

	if(email == undefined || email == "")
		emailError = "The email can not is empty"
	if(points == undefined || points < 20)
		pointsError = "The point cannot am low 20 points"
	if(name == undefined || name == "")
		nameError = "The name can not is empty..."

		if(emailError != undefined || pointsError != undefined || nameError != undefined){
			req.flash("emailError", emailError);
			req.flash("pointsError", pointsError);
			req.flash("nameError", nameError);


			req.flash("name", name);
			res.redirect("/");
		}else{
			res.send("Form ok")
		}
});

app.listen(3423, (req, res) => {
	console.log("Server is runing...")
});