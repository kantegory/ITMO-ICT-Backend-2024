const express = require("express");

const app = express();

const urlParser = express.urlencoded({extended: false});

const models = require("./models");


app.set("view engine", "hbs");

models.sequelize.sync().then(()=>{
    app.listen(3001, function(){
        console.log("Сервер ожидает подключения...");
      });
}).catch(err => console.log(err));


app.get("/", function(req, res){
    models.findAll({raw:true}).then(data =>{  
        res.render("index.hbs", {
            users: data
        });
    }).catch(err => consolr.log(err));
});

app.get("/create", function(req, res){
    res.render("create.hbs");
});

app.post("/create", urlParser, function(req, res){
    if(!req) return res.statusCode(400);

    const username = req.body.name;
    const userage = req.body.age;
    const usercourse = req.body.course;

    models.create({ name: username, age: userage, course: usercourse}).then(()=>{
        res.redirect("/");
    }).catch(err => console.log(err));
});

//delete

app.post("/delete/:id", function(req,res){
    const userId = req.params.id;
    models.destroy({where: {id: userId}}).then(()=>{
        res.redirect("/");
    }).catch(err => console.log(err));
});

//update

app.get("/edit/:id", function(req, res){
    const userId = req.params.id;
    models.findAll({where: {id: userId}, raw: true}).then(data => {
        res.render("edit.hbs", {
            users: data[0]
        });
    }).catch(err => console.log(err));
});


app.post("/edit", urlParser, function(req, res){
    if(!req) return res.statusCode(400);

    const username = req.body.name;
    const userage = req.body.age;
    const usercourse = req.body.course;
    const userId = req.body.id;

    models.update({ name: username, age: userage, course: usercourse}, {where: {id: userId}}).then(()=>{
        res.redirect("/");
    }).catch(err => console.log(err));
});

//Ручка для тестов добавления нового пользока
//
// app.use("/testPost", function(req, res){
//     models.create({ name: "Fil", age: "20", course: "3"}).then(()=>{
//         res.redirect("/");
//     }).catch(err => console.log(err));
// });