const models = require('../models')

var user = models.User


var middleware = {
  //cek register
  cekReg: (req, res, next) => {
    user.findAll({
        where: {
          username: req.body.username
        }
      })
      .then((data) => {
        if (data.length === 0) {
          console.log(`data kosong, pendaftaran dengan username ${req.body.username} akan di proses`);
          next()
        } else if (data[0].username === req.body.username) {
          console.log('ada yang sama');
          res.json({
            msg: "adayangsama"
          }).end()
        } else if (req.body.username === "admin") {
          console.log('tidak boleh admin');
          res.json({
            msg: "jangan admin"
          }).end()
        }
      })
      .catch(function(err) {
        // handle error;
        console.log("ini apa", err);

      });
  },
  cekLog : (req,res,next)=>{
    user.findAll({
      where :{
        username : req.body.username,
        password : req.body.password
      }
    }).then((data)=>{
      if (data.length === 0) {
        console.log('kosong');
        res.json(data)
        res.end()
      }
      res.json(data)
      next()
    }).catch(function (err) {
      console.log("ini", err);

    })
  }

}


module.exports = middleware
