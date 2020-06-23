const mongoose = require("mongoose");
const User = require("../models/user.model")


const arrOfCheckedAdmin = [
    {
        username: 'dupbolun2012',
        password: '123456789'
    },
    {
        username: 'dupbolun2013',
        password: '12345678'
    },
    {
        username: 'dupbolun2014',
        password: '1234567'
    }
];

// module.exports.getLogin = (req, res) => {
//     res.render()
// }

module.exports.postLogin = (req, res) => {
    const checkedAdmin = {
        username: req.body.user,
        password: req.body.password
    }
    if(arrOfCheckedAdmin.indexOf(checkedAdmin) !== -1) {
        res.redirect("/admin")
    }
    else {
        res.json({errCheckedAdmin: true})
    }
}