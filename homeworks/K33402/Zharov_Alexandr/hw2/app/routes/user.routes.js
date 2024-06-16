module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/create", users.create);
  router.get("/findAll", users.findAll);
  router.get("/find/:id", users.findOne);
  router.put("/update/:id", users.update);
  router.delete("/delete/:id", users.delete);

  app.use("/api/user", router);
};
