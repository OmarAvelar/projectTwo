const express = require('express');
 const router = express.Router();
 const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
 const multer = require('multer');
 const upload = multer({ dest: './public/uploads/' });
 const Cita = require("../models/Cita");




 router.get('/profile', (req, res) => {
  res.render('profile');
});

router.post('/profile', (req, res)=>{
  const fecha = req.body.fecha
  const hora = req.body.hora
  Cita.find({$and:[{fecha:fecha}, {hora:hora}]})
  .then(citas =>{
    res.render('profile', {citas})
  }).catch(e=>{
    console.log(e)
  })
})


 module.exports = router