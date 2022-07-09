const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];

//4. ejs documentation, https://github.com/mde/ejs/wiki/Using-EJS-with-Express
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //9. declare static folder to save CSS, images, etc.


app.get("/", (req, res) => {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]; //array
  let today = new Date(); //get today's date
  let options = { //object. Used for the toLocaleDateString() function
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options); //get date's day as number 0-6 (0=Sun)

  res.render("list", {listTitle: day, newListItems: items, route: "/"}) //6. "ejs view engine" response.render to .ejs HTML file, "views/list.ejs"
});
app.post("/", (req, res) => { // 7.retrieve input items from list.ejs
  let item = req.body.newItem; //"var item" only exists in post route scope. Should declare var as empty string above
  items.push(item); //array.push()
  res.redirect("/"); //8. redirect this post item back to the home page, allowing it to be picked up by the res.render in the app.get above

});

// 11. Add new "/WORK" page. Format just like home page.
app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work List", newListItems: workItems, route: "/work"});
});
app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", (req, res) => {
  res.render("about")
})
app.listen(3000, () => {
  console.log("Server is listening on localhost:3000");
});
