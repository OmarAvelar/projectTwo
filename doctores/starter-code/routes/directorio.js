const express = require('express');
 const router = express.Router();
 const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
 const multer = require('multer');
 const upload = multer({ dest: './public/uploads/' });
 const Post = require('../models/post');
 const User = require("../models/User");




 router.get('/directorio', (req, res) => {
  res.render('directorio');
});

router.post('/directorio', (req, res)=>{
  const titulo = req.body.titulo
  const especialidad = req.body.especialidad
  User.find({$and:[{titulo:titulo}, {especialidad:especialidad}]})
  .then(users =>{
    res.render('directorio', {users})
  }).catch(e=>{
    console.log(e)
  })
})


 module.exports = router