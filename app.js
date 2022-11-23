const express = require("express");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const cookie = require("cookie-parser");
const db = require("./config/connection");
require('dotenv').config()

app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "123",
    saveUninitialized: true,
    cookie: { maxAge: 60000000 },
    resave: false,
  })
);

app.use(cookie());
app.use(function (req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "./layout/layout");

db.connect((err) => {
  if (err) console.log("Connection Error" + err);
  else console.log("Database Connection Successfully");
});

app.use("/admin", adminRouter);
app.use("/", userRouter);

app.get('*',(req,res)=>{
  res.render('user/404',{admin:false,user:false})
})

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
