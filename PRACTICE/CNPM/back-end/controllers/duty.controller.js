const mongoose = require("mongoose");
const Duty = require("../models/duty.model");

module.exports.getIndex = (req, res) => {
  Duty
    .find({})
    // .then((duties) => {
    //   res.render("duty/index", {
    //     listDuty: duties,
    //   });
    // })
    .then(duties => res.json(duties))
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

// module.exports.getCreate = (req, res) => {
//   res.render("duty/create");
// };

module.exports.postCreate = (req, res) => {
  const today = new Date()
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const newDuty = new Duty();
  newDuty.name = req.body.name;
  newDuty.time = req.body.time;
  newDuty.place = req.body.place;
  newDuty.phone = req.body.phone;
  newDuty.createdTime = date+' '+time
  // newDuty.save((err) =>   {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect("/duty");
  //   }
  // });

  newDuty
    .save()
    //.then(() => res.redirect("/duty"))
    .then(() => res.json("Duty is created"))
    .catch(err => console.log(err))
};

module.exports.getDelete = (req, res) => {
  const queryDel = { _id: req.params._id };
  // Duty.remove(queryDel, (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect("/duty");
  //   }
  // })
  Duty
    .remove(queryDel)
    //.then(() => res.redirect("/duty"))
    .then(() => res.json("Duty is deleted"))
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
    // .then((matchedDuty) => {
    //   res.render("duty/index", {
    //     listDuty: matchedDuty,
    //   });
    // })
    .then(matchedDuty => res.json(matchedDuty))
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
    .findById(req.params._id)
    .then((duty) => {
      res.json(duty)
      // res.render("duty/update", {
      //   duty: duty
      // })
    })
    .catch(err => console.log(err))
};

module.exports.postUpdate = (req, res) => {
  const today = new Date()
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const updatedDuty = {};
  updatedDuty.name = req.body.name;
  updatedDuty.time = req.body.time;
  updatedDuty.phone = req.body.phone;
  updatedDuty.place = req.body.place;
  updatedDuty.updatedTime = date+' '+time
  const query = { _id: req.params._id };


  // Duty.update(query, updatedDuty, (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect("/duty");
  //   }
  // })

  Duty
    .update(query, updatedDuty)
    .then(() => res.json("123"))
    .catch(err => console.log(err))
};

