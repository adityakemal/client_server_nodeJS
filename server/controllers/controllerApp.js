const models = require("../models")
var user = models.User


var crud = {
  create: (req, res) => {
    user.create({
        // id : "",
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        admin: false
      })
      .then((newuser) => {
        //console.log(JSON.stringify(newuser));
        res.json({msg : 'then berhasil terdaftar'}).end()
      })
      .catch(function (err) {
        if (err) {
          var errMsg = err.errors[0].message
          console.log('errornya adalah : ', err.errors[0].message);
          res.json({msg : errMsg}).end()
        }
        // res.json({msg : 'catch berhasil terdaftar'}).end()
        res.end()
      })
  },

  read: (req, res) => {
    user.findAll().then((data) => {
      res.send(data)
      console.log(data);
    })
  },

  update: (req, res) => {

  },

  destroy: (req, res) => {
    user.destroy({
      where : {
        id : req.params.id
      }
    })
    .then((data)=>{
      console.log(`berhasil menghapus ${data}`);
    })
  },
//login 
  login : (req,res)=>{
    res.end()
  }

}

module.exports = crud
