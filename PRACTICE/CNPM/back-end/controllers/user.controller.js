const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports.getIndex = (req, res) => {
  // User.find({}, (err, users) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render("user/index", {
  //       listUser: users,
  //     });
  //   }
  // });
  User.find({})
    // .then((users) => {
    //   res.render("user/index", {
    //     listUser: users,
    //   });
    // })
    .then(users => res.json(users))
    .catch((err) => console.log(err));
};

module.exports.getCreate = (req, res) => {
  res.render("user/create");
};

module.exports.getDelete = (req, res) => {
  const queryDel = { _id: req.params.id };
  // User.remove(queryDel, (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect("/user");
  //   }
  // });

  User.remove(queryDel)
    .then(() => res.redirect("/user"))
    .catch((err) => console.log(err));
};

module.exports.postCreate = (req, res) => {
  const saltRounds = 15;
  const today = new Date()
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const newUser = new User();

  // User.find({ user: req.body.user }, (err, users) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     if (users.length > 0) {
  //       res.render("user/create", {
  //         errorUser: true,
  //       });
  //     } else {
  //       if (req.body.password !== req.body.confirm) {
  //         res.render("user/create", {
  //           errPassword: true,
  //         });
  //       } else {
  //         bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             newUser.user = req.body.user;
  //             newUser.password = hash;
  //             newUser.save((err) => {
  //               if (err) {
  //                 console.log(err);
  //               } else {
  //                 res.redirect("/user");
  //               }
  //             });
  //           }
  //         });
  //       }
  //     }
  //   }
  // });

  // // User.find({}, (err, users) => {
  // //   if (err) {
  // //     console.log(err);
  // //   } else {
  // //     res.render("user/index", {
  // //       listUser: users
  // //     });
  // //   }
  // // });
  User.find({ user: req.body.user })
    .then((users) => {
      if (users.length > 0) {
        // res.render("user/create", {
        //   errorUser: true,
        // });
        res.json({errUser: true})
      } else {
        if (req.body.password !== req.body.confirm) {
          // res.render("user/create", {
          //   errPassword: true,
          // });
          res.json({errPassword: true})
        } else {
          bcrypt
            .hash(req.body.password, saltRounds)
            .then((hash) => {
              newUser.user = req.body.user;
              newUser.password = hash;
              newUser.createdTime = date+' '+time
              newUser
                .save()
                .then(() => res.redirect("/user"))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
      }
    })
    .catch((err) => console.log(err));
};

module.exports.getLogin = (req, res) => {
  res.render("user/login");
}

module.exports.postLogin = (req, res) => {
  // jwt.sign
  User.find({ user: req.body.user })
    .then((users) => {
      if (users.length == 0) {
        // res.render("user/login", {
        //   errUser: true,
        // })
        res.json({errUser: true})
      } else {
        const hashPassword = users[0].password;
        bcrypt
          .compare(req.body.password, hashPassword)
          .then((result) => {
            if (result == true) {
              const data = {
                user: req.body.user,
                password: users[0].password,
              };
              // res.render("index", {
              //   errPassword: false,
              // });
              res.json({errPassword: false})
            } else {
              // res.render("user/login", {
              //   errPassword: true,
              // });
              res.json({errPassword: true})
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
  // User.find({ user: req.body.user }, (err, users) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     if (users.length == 0) {
  //       res.render("user/login", {
  //         errUser: true,
  //       });
  //     } else {
  //       const hashPassword = users[0].password;
  //       bcrypt.compare(req.body.password, hashPassword, (err, result) => {
  //         if (err) {
  //           console.log(err);
  //         } else {
  //           if (result == true) {
  //             const data = {
  //               user: req.body.user,
  //               password: users[0].password,
  //             };

  //             res.render("index", {
  //               errPassword: false,
  //             });
  //           } else {
  //             res.render("user/login", {
  //               errPassword: true,
  //             });
  //           }
  //         }
  //       });
  //     }
  //   }
  // });
};

module.exports.getUpdate = (req, res) => {
  // User.findById(req.params.id, (err, user) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render("user/update", {
  //       user: user,
  //     });
  //   }
  // });
  User.findById(req.params.id)
    .then((user) => {
      res.render("user/update", {
        user: user,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.postUpdate = (req, res) => {
  if (req.body.newPassword !== req.body.confirm) {
    res.render("user/update", {
      errUpdate: true,
    });
  } else {
    const updatedUser = {};
    updatedUser.user = req.body.name;
    updatedUser.password = req.body.newPassword;

    const query = { _id: req.params.id };

    User.update(query, updatedUser)
      .then(() => res.redirect("/user"))
      .catch((err) => console.log(err));
  }
};
