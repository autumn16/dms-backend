const mongoose = require("mongoose");
const Duty = require("../models/duty.model");

module.exports.getIndex = (req, res) => {
  Duty
    .find({})
    .then((duties) => {
      res.render("duty/index", {
        listDuty: duties,
      });
    })
    .catch((err) => console.log(err));

  //   Duty.find({}, (err, duties) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.render("duty/index", {
  //         listDuty: duties,
  //       });
  //     }
  //   });
  // };
};

module.exports.getCreate = (req, res) => {
  res.render("duty/create");
};

module.exports.postCreate = (req, res) => {
  const newDuty = new Duty();
  newDuty.name = req.body.name;
  newDuty.time = req.body.time;
  newDuty.place = req.body.place;
  newDuty.phone = req.body.phone;

  // newDuty.save((err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect("/duty");
  //   }
  // });
  newDuty
    .save()
    .then(() => res.redirect("/duty"))
    .catch(err => console.log(err))
};

module.exports.getDelete = (req, res) => {
  const queryDel = { _id: req.params.id };
  // Duty.remove(queryDel, (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect("/duty");
  //   }
  // });
  Duty
    .remove(queryDel)
    .then(() => res.redirect("/duty"))
    .catch(err => console.log(err))
};

module.exports.getSearch = (req, res) => {
  const question = req.query.q;

  Duty
  .find()
    .or([
      { name: question },
      { time: question },
      { phone: question },
      { place: question },
    ])
    .then((matchedDuty) => {
      res.render("duty/index", {
        listDuty: matchedDuty,
      });
    })
    .catch((err) => console.log(err));
  //   var matchedDuty =  db.get('users').filter(function(user) {
  //       return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
  //   })
};

module.exports.getUpdate = (req, res) => {
  // Duty.findById(req.params.id, (err, duty) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render("duty/update", {
  //       duty: duty,
  //     });
  //   }
  // });
  Duty
    .findById(req.params.id)
    .then((duty) => {
      res.render("duty/update", {
        duty: duty
      })
    })
    .catch(err => console.log(err))
};

module.exports.postUpdate = (req, res) => {
  const updatedDuty = {};
  updatedDuty.name = req.body.name;
  updatedDuty.time = req.body.time;
  updatedDuty.phone = req.body.phone;
  updatedDuty.place = req.body.place;

  const query = { _id: req.params.id };

  // Duty.update(query, updatedDuty, (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect("/duty");
  //   }
  // });

  Duty
    .update(query, updatedDuty)
    .then(() => res.redirect("/duty"))
    .catch((err) => console.log(err))
};
