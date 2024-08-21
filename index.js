const { error } = require("console");
const express = require("express");
const app = express();
const request = require("request");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.get("/weather", (req, res) => {
  res.render("index.ejs",{
    temp:null,
    error:null
  });
});
app.post("/weather", (req, res) => {
  const city = req.body.input;
  const apikey = "0c1ee65fc916621c7bf636f2fbe4a0d1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`;

  request(url, (error, request, body) => {
    const weather = JSON.parse(body);
    if (res.statusCode !== 200) {
      res.render("index.ejs", {
        temp: null,
        error: "error please try again",
      });
    } else {
      if (weather.main === undefined) {
        res.render("index.ejs", {
          temp: null,
          error: "error please try again",
        });
      } else {
        res.render("index.ejs", {
            temp: toCilles(weather.main.temp),
            error: null,
          });
      }
    }
  });
});
function toCilles(temp) {
  let convert = (temp - 32) * (5 / 9);
  return convert.toFixed(1) + "\xB0C";
}
app.listen(9000, () => {
  console.log(
    "starting................................................................................."
  );
});
