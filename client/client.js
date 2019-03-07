const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('flash')


var client = express()

//////////////midware
client.use(bodyParser.urlencoded({
  extended: false
}))
client.use(bodyParser.json())
//set engine
client.set('view engine', 'ejs');
//static public
client.use(express.static(__dirname + '/public'));
// Session framework
client.use(session({
  secret: 'iloveit',
  // resave: true,
  // saveUninitialized: true
}));

client.use(flash())


var auth = function(req, res, next) {
  if (req.session && req.session.user === "kemal" && "kemal")
    return next();
  else
    return res.sendStatus(401);
};


// Authentication and Authorization Middleware

client.get('/', (req, res) => {
  res.render('pages/index')
})



//login with api
client.post('/login', (req, res) => {
  let url = 'http://localhost:3000/api/login'
  let form = {
    username: req.body.username,
    password: req.body.password
  }
  request.post(url, {
    form
  }, function(err, httpResponse, body) {
    err ? console.log(err) : "";
    var data = JSON.parse(body)
    if (data.length === 0) {
      res.redirect('/')
    } else {
      req.session.username = data[0].username
      // req.session.password = req.body.password
      // console.log(data[0].username);
      // res.send(data)
      res.redirect('/loged')

    }

  })
})

// Logout endpoint
client.get('/logout', function(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      return next(err)
    } else {
      res.redirect("/");
    }
  });
});

// Get content endpoint
client.get('/', function(req, res) {
  if (req.session.username) {
    res.redirect('/loged')
  } else {
    res.render('pages/index')
  }
});

client.get('/loged', (req, res) => {
  if (req.session.username) {
    var data = req.session.username
    console.log(data);
    res.render('pages/profile', {data})

  } else {
    res.redirect('/')
  }

})
// client.get('/logout', (req, res) => {
//   req.session.destroy();
//   res.send("logout success!");
//   // let url = `http://localhost:3000/api/read`
//   // request(url, (err, respose, body) => {
//   //   let data = JSON.parse(body)
//   //   err ? console.log(err) : res.render('pages/profile',{data});
//   //   // console.log(body);
//   // })
// })


// client.post('/login', (req, res) => {
//   let url = `http://localhost:3000/api/read`
//   request(url, (err, respose, body) => {
//     if (err){
//       console.log(err);
//     }else {
//       var p =JSON.parse(body)
//       console.log(p.username);
//       if(req.body.username === p.username && req.body.password === p.password){
//         console.log('benar')
//         res.redirect('/profile')
//
//       }else {
//         console.log('salah');
//         res.redirect('/')
//
//       }
//     }
//   })
// })
// var auth = function(req, res, next) {
//   if (req.body.username === "admin") {
//     res.redirect('/register')
//     console.log('username tidak boleh admin');
//   } else {
//     console.log("succes tf data");
//     next()
//
//   }
// }

client.post('/register', (req, res) => {
  request.post('http://localhost:3000/api/signup', {
    form: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      admin: false
    }
  }, function(err, httpResponse, body) {
    // var xx = JSON.parse(body)
    // req.flash("success_msg", xx.msg)
    // console.log(xx.msg)
    if (err) {
      console.log("ini err", err);
    }
    console.log("pesan dri server", body);
    res.redirect('/register')

  })

})

client.get('/register', (req, res) => {
  req.session.destroy()
  // var body = {msg : ""}
  res.render('pages/signup.ejs', {
    success_msg: ''
  })
})




client.listen('8000', () => console.log('run Client 8000'))
