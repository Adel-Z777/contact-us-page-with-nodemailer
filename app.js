//import
const express = require("express");
const http = require("http");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const server = http.Server(app);
const port = 5000;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "page/index.html")));

//static files
app.use(express.static("public"));
app.use("/CSS", express.static(__dirname + "public/CSS"));
app.use("/image", express.static(__dirname + "public/image"));
app.use("/JS", express.static(__dirname + "public/JS"));

//set views
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("", (req, res) => {
  res.render("index");
});

app.post("/send_email", function (req, res) {
  let from = req.body.from;
  let subject = req.body.subject;
  let text = req.body.text;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zoughbiadel7@gmail.com",
      pass: "rkqq lxiq sxsn crwz",
    },
  });

  let mailOptions = {
    from: from,
    to: "zoughbiadel7@gmail.com",
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent successfully ${data.response}`);
    }
    res.redirect("/");
  });
});

//listen port
server.listen(port, () => console.info(`listening on port: ${port}`));
