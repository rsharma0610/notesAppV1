import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

var notes = [];

const app = express()
const port = 3000;

function addNote(req){
    const title = req.body["noteTitle"];
    const note = req.body["note"];
    const date = (new Date()).toLocaleDateString();
    notes.push([title, note, date]);
    console.log(notes)
}
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs", {notes: notes});
})
app.get("/create", (req,res) => {
    res.render("create.ejs");
})
app.post("/submit", (req,res) => {
    addNote(req);
    res.redirect("/");

})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });