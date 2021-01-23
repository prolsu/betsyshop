// Requiring our models and passport as we've configured it
const { Op } = require("sequelize");
const db = require("../models");
const passport = require("../config/passport");
const nodemailer = require("nodemailer");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page => home page to either buy or sell
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

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
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //will post to the selling db
  app.post("/api/selling", (req, res) => {
    const selling = req.body;
    console.log("selling this: ", selling);

    db.Selling.create({
      item: selling.item,
      description: selling.description,
      category: selling.category,
      price: selling.price,
      active: 1,
      seller: selling.seller
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

    db.Selling.findAll({
      where: {
        item: {
          [Op.substring]: items
        },
        seller: {
          [Op.not]: req.user.email
        }
      }
    }).then(dbSearch => {
      // console.log(dbSearch);

      const matchListings = [];
      dbSearch.forEach(listing => matchListings.push(listing.dataValues));

      const searchData = {
        Buying: matchListings
      };
      res.render("buying", searchData);
    });
  });

  //will render all active listings
  app.get("/selling/listings", (req, res) => {
    db.Selling.findAll({
      where: {
        seller: req.user.email
      }
    }).then(userListings => {
      // console.log(userListings);
      const activeListings = [];
      userListings.forEach(listing => activeListings.push(listing.dataValues));

      console.log(activeListings);
      const currentResults = {
        Listings: activeListings
      };
      res.render("selling", currentResults);
    });
  });

  //to delete an item that is no longer for sale
  app.delete("/api/selling/:id", (req, res) => {
    db.Selling.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbDelete => {
      res.json(dbDelete);
    });
  });

  //when an item is bought, its status is updated to false
  app.put("/api/buying/:id", (req, res) => {
    db.Selling.update(
      { active: 0 },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(dbBought => {
      res.json(dbBought);

      //   console.log(`Sellers email: ${req.body.email}`);
      //   const sellerEmail = req.body.email;
      //   const sellerItem = req.body.item;

      //   const transporter = nodemailer.createTransport({
      //     host: "smtp.gmail.com",
      //     auth: {
      //       type: "login",
      //       user: "betsyecomm@gmail.com",
      //       pass: "betsymiami305"
      //     }
      //   });
      //   const mailOptions = {
      //     from: "betsyecomm@gmail.com",
      //     to: sellerEmail,
      //     subject: "Your item sold!",
      //     text: `Cha Ching! Your '${sellerItem}' sold!`
      //   };
      //   transporter.sendMail(mailOptions, (err, info) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log(`Email sent: ${info.response}`);
      //     }
      //   });
    });
  });

  //to update an active listing
  app.put("/api/selling", (req, res) => {
    db.Selling.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbUpdate => {
      res.json(dbUpdate);
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
