const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const publicPath = path.join(__dirname, "./views");
const appRouter = require("./routes/router");
const authRouter = require("./routes/auth");
const app = express();
const port = 3000;
var session = require("express-session");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    helpers: {
      eq: function (a, b, options) {
        return a === b ? options.fn(this) : options.inverse(this);
      },
    },
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(appRouter);
app.use("/auth", authRouter);
app.use("/", express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
