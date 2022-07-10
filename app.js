const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); //13.1 Import locally created date module from /date.js as date()


const app = express();

const items = [];
const workItems = []; //JavaScript arrays & objects can be "const"-ant because the elements can be modified/pushed. They just cannot be fully reassigned as a whole

//4. ejs documentation, https://github.com/mde/ejs/wiki/Using-EJS-with-Express
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public")); //9. declare static folder to save CSS, images, etc.


app.get("/", (req, res) => {
  const day = date.getDate() //13.2 Call in our custom required date function made in date.js
  res.render("list", {listTitle: day, newListItems: items, route: "/"}) //6. "ejs view engine" response.render to .ejs HTML file, "views/list.ejs"
});
app.post("/", (req, res) => { // 7.retrieve input items from list.ejs
  const item = req.body.newItem; //"var item" only exists in post route scope. Should declare var as empty string above
  items.push(item); //array.push()
  res.redirect("/"); //8. redirect this post item back to the home page, allowing it to be picked up by the res.render in the app.get above

});

// 11. Add new "/WORK" page. Format just like home page.
app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work List", newListItems: workItems, route: "/work"});
});

app.post("/work", (req, res) => {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", (req, res) => {
  res.render("about")
})
app.listen(3000, () => {
  console.log("Server is listening on localhost:3000");
});
