

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");                   // import our module from date.js


const app = express();
const port = 3000;

const items = ["Buy Food", "Cook Food", "Eat Food"];            // array to display all user added list items
const workItems = [];

app.set("view engine", "ejs");                                  // tells our app to use ejs as our view engine

app.use(bodyParser.urlencoded({extended: true}));               // allows us to use text from (body parser)
app.use(express.static("public"));                              // allows us to use static files ie: css, etc

                        

app.get("/", function(req, res){
    
    let day = date.getDate();                                   // export getDate from date.js module
    
    // res.render("list", {kindOfDay: day});                    // render file called "list" from ejs views folder 
    res.render("list", {ListTitle: day, newListItems: items});  // render template "list"-- using multiple EJS components... pass over updated array
});

app.post("/", function(req, res){                               // post request
    let item = req.body.newItem;                                // item that user type in
                                  
    if (req.body.list === "Work") {                     
        workItems.push(item);                                   // if item on the "work" page it will append to workItem array
        res.redirect("/work");
    }else {
        items.push(item);                                       // if item on the "home" page it will append to items array
        res.redirect("/");
    };

});


app.get("/work",function(req, res) {                            // additional page-- work list
    let day = date.getDate();  
    res.render("list", {ListTitle :" Work List", newListItems: workItems}); // render template with work list
});

app.get("/about",function(req,res){                             // additional page-- about
    res.render("about");
});



app.listen(port, function(){
    console.log("Server started on port 3000");                 // log to show server running
});