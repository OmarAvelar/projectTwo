const express = require('express');
 const passport = require('passport');
 const router = express.Router();
 const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
 const multer = require('multer');
 const upload = multer({ dest: './public/uploads/' });
 const Post = require('../models/post');
 const User = require("../models/User");
 const welcomeMail = require("../helpers/mailer").welcomeMail;
 const uploadCloud = require('../helpers/cloudinary');




 router.get('/login', ensureLoggedOut(), (req, res) => {
     res.render('authentication/login', { message: req.flash('error')});
 });

 router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
   successRedirect : '/profile',
   failureRedirect : '/login',
   failureFlash : true,
   passReqToCallback: true
 }));

 router.get('/signup', ensureLoggedOut(), (req, res) => {
     res.render('authentication/signup', { message: req.flash('error')});
 });


 router.post('/signup', [ensureLoggedOut(), upload.single('photo')], passport.authenticate('local-signup', {
   successRedirect : '/profile',
   failureRedirect : '/signup',
   failureFlash : true,
   passReqToCallback: true
 }));


// router.post("/signup", (req, res, next) => {
//     const { username, email } = req.body;
//     User.register(req.body, req.body.password)
//       .then(user => {
//         welcomeMail(username, email);
//         res.redirect("/profile");
//       })
//       .catch(error => {
//         res.render("/signup", { data: req.body, error });
//       });
//   });

// router.post("/", uploadCloud.single("image"), (req, res, next) => {
//     req.body["user"] = req.user._id;
//     if (req.file) req.body["imageURL"] = req.file.url;
//     Chambita.create(req.body)
//       .then(chambita => {
//         User.findByIdAndUpdate(req.user._id, {
//           $push: { chambita: chambita._id }
//         }).then(u => {
//           res.redirect("/chambitas");
//         });
//       })


 router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    const paciente = (req.user.role === "Paciente") ? true : false
     Post.find({creatorId: req.user._id})
     .then(posts => res.render('authentication/profile', 
     {user : req.user, posts, paciente}))
     .catch(e => console.log(e));
 });

 router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
     req.logout();
     res.redirect('/');
 });


 //formulairo
 router.get('/formulario', (req, res) => {
    const paciente = (req.user.role === "Paciente") ? true : false
    res.render('formulario', {paciente});
});

router.post('/formulario', [ensureLoggedIn('/login'), upload.single('photo')], (req,res) => {
    const id = req.params.id
    let {username, cedula, titulo, especialidad, address, phone, sobremi, formacion} = req.body
    User.findByIdAndUpdate(id, {username, cedula, titulo, especialidad, address, phone, sobremi, formacion}, {new: true},null)
    .then(User=>{
        res.redirect('/profile');
    }).catch(e=>{
        console.log(e)
    })    
});
 
 module.exports = router;