const mongoose = require("mongoose");
const Service = require("../models/service.model");

module.exports.getIndex = (req, res) => {
  Service
    .find({})
    // .then((services) => {
    //   res.render("service/index", {
    //     listService: services,
    //   });
    // })
    .then(services => res.json(services))
    .catch((err) => console.log(err));
};

module.exports.getCreate = (req, res) => {
  res.render("service/create");
}

module.exports.postCreate = (req, res) => {
  const today = new Date()
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const newService = new Service();
  newService.name = req.body.name;
  newService.service = req.body.service;
  newService.phone = req.body.phone;
  newService.place = req.body.place;
  newService.createdTime = date+' '+time
  newService 
    .save()
    //.then(() => res.redirect("/service"))
    .then(() => res.json("Service is created"))
    .catch((err) => console.log(err));
}

module.exports.getUpdate = (req, res) => {
  Service
    .findById(req.params.id)
    // .then((service) => {
    //   res.render("service/update", {
    //     service: service,
    //   });
    // })
    .then((service) => res.json(service))
    .catch((err) => console.log(err));
};

module.exports.postUpdate = (req, res) => {
  const today = new Date()
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const updatedService = {};
  updatedService.name = req.body.name;
  updatedService.service = req.body.service;
  updatedService.phone = req.body.phone;
  updatedService.place = req.body.place;
  updatedService.updatedTime = date+' '+time
  
  const query = { _id: req.params.id };

  Service
    .update(query, updatedService)
    // .then(() => res.redirect("/service"))
    .then(() => res.json("123"))
    .catch((err) => console.log(err));
};

module.exports.getDelete = (req, res) => {
  const queryDel = { _id: req.params.id };

  Service
    .remove(queryDel)
    // .then(() => res.redirect("/service"))
    .then(() => res.json("Duty is deleted"))
    .catch(err => console.log(err))
};

module.exports.getSearch = (req, res) => {
  const question = req.query.q;
  Service
    .find()
    .or([
      { name: question },
      { service: question },
      { phone: question },
      { place: question },
    ])
    .then((matchedService) => {
      res.render("service/index", {
        listService: matchedService,
      });
    })
    .catch((err) => console.log(err));
  //   var matchedDuty =  db.get('users').filter(function(user) {
  //       return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
  //   })
};
