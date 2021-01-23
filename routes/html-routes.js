// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/home", isAuthenticated, (req, res) => {
    res.render("home");
  });

  app.get("/home", (req, res) => {
    if (req.user) {
      res.redirect("/home");
    }
    res.render("login");
  });

  app.get("/buying", (req, res) => {
    if (req.user) {
      res.render("buying");
    }
    res.render("login");
  });

  app.get("/selling", (req, res) => {
    if (req.user) {
      res.redirect("/selling/listings");
    }
    res.render("login");
  });
};
