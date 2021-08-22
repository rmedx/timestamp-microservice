// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  let temp = new Date();
  let unixValue = temp.valueOf();
  let utcValue = temp.toUTCString();
  res.json({unix: unixValue, utc: utcValue});
})

app.get("/api/:date", (req, res) => {
  let dateInput = req.params.date;
  let dateConverted;
  let unixValue;
  let utcValue;
  console.log(isNaN('05 October 2011'));
  // create date object
  if (isNaN(dateInput)) {
    dateConverted = new Date(dateInput);
  } else {
    dateConverted = new Date(parseInt(dateInput))
  }
  // send error if date invalid
  if (dateConverted.toString() === "Invalid Date") {
    res.send({error: "Invalid Date"});
  } else {
    unixValue = dateConverted.valueOf();
    utcValue = dateConverted.toUTCString();
    res.send({unix: unixValue, utc: utcValue});
  }

  // // date STRINGS (non integers) that give invalid date
  // if (isNaN(Date.parse(dateInput)) && isNaN(dateInput)) {
  //   res.json({error: "Invalid Date"});
  // } else if (!isNaN(dateInput)) { // integer input that represents UNIX time
  //   console.log("1");
  //   console.log(dateInput);
  //   let dateInt = dateInput * 1;
  //   if (new Date (dateInt) === "Invalid Date") {
  //     res.json({error: "Invalid Date"});
  //   } else {
  //     let temp = new Date(dateInt);
  //     utcValue = temp.toUTCString();
  //     unixValue = temp.valueOf();
  //   }
  // } else { // date input as valid date string
  //   console.log("2");
  //   console.log(dateInput);
  //   let temp = new Date(dateInput);
  //   console.log(temp);
  //   unixValue = temp.valueOf();
  //   console.log(unixValue);
  //   utcValue = temp.toUTCString();
  // }
  // res.json({ unix: unixValue, utc: utcValue })
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
