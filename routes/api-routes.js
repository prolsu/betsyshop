// Requiring our models and passport as we've configured it
const db = require("../models");
// const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page => home page to either buy or sell
  // Otherwise the user will be sent an error
  // app.post("/api/login", passport.authenticate("local"), (req, res) => {
  //   // Sending back a password, even a hashed password, isn't a good idea
  //   res.json({
  //     email: req.user.email,
  //     id: req.user.id
  //   });
  // });

  // Route for getting some data about our user to be used client side
  // app.get("/api/user_data", (req, res) => {
  //   if (!req.user) {
  //     // The user is not logged in, send back an empty object
  //     res.json({});
  //   } else {
  //     // Otherwise send back the user's email and id
  //     // Sending back a password, even a hashed password, isn't a good idea
  //     res.json({
  //       email: req.user.email,
  //       id: req.user.id
  //     });
  //   }
  // });
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.status(202).end();
        res.redirect("/home");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  // app.get("/logout", (req, res) => {
  //   req.logout();
  //   res.redirect("/");
  // });

  //will post to the selling db
  app.post("/api/selling", (req, res) => {
    const selling = req.body;
    console.log("selling this: ", selling);

    db.Selling.create({
      item: selling.item,
      description: selling.description,
      category: selling.category,
      price: selling.price
    })
      .then(() => {
        res.status(204).end();
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  //will retrive items available to buy by searching an item
  app.get("/buying/:items", (req, res) => {
    const { items } = req.params;
    console.log(items);

    db.Selling.findOne({
      where: {
        item: items
      } //add here a 'include' where there is a fk based on category...
    }).then(dbSearch => {
      console.log(dbSearch);

      const searchData = {
        Selling: dbSearch
      };
      res.render("buying", searchData);
    });
  });
};
