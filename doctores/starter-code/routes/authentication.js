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
   successRedirect : '/profile/myprofile',
   failureRedirect : '/login',
   failureFlash : true,
   passReqToCallback: true
 }));

 router.get('/signup', ensureLoggedOut(), (req, res) => {
     res.render('authentication/signup', { message: req.flash('error')});
 });


 router.post('/signup', [ensureLoggedOut()], passport.authenticate('local-signup', {
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


 router.get('/profile/myprofile', (req, res) => {
     const username = req.user.username
    const paciente = (req.user.role === "Paciente") ? true : false
    const flags = false
     Post.find({creatorId: req.user._id})
     .then(posts => res.render('authentication/profile', 
     {user : req.user, posts, paciente, flags}))
     .catch(e => console.log(e));
 });

 router.get('/profile/:username', (req, res, next)=>{
     const {username} = req.params
     console.log(username)
     const paciente = (req.user.role === "Paciente") ? true : false
     const flags = false
     User.findOne({username})
     .then( foundUser =>{
        //Post.find({creatorId: req.user._id})
        //.then(posts => 
        console.log(foundUser)
        res.render('authentication/profile', {user: foundUser})
        .catch(e => console.log(e));
 

     })

 })
 router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
     req.logout();
     const flags = false;
     res.redirect('/');
 });


 //formulairo
 router.get('/formulario/:id', (req, res) => {
     const {id} = req.params
     User.findById(id)
     .then(user =>{
        const paciente = (req.user.role === "Paciente") ? true : false
        res.render('formulario', {paciente, user});
     })

    
});

router.post('/formulario/:id', [ensureLoggedIn('/login'), upload.single('photoURL')], (req,res) => {
    const id = req.params.id
    let todo = {
        username: req.body.username,
        cedula: req.body.cedula,
        titulo: req.body.titulo,
        phone:  req.body.phone,
        sobremi: req.body.sobremi,
        formacion: req.body.formacion,
        photoURL: `/uploads/${req.file.filename} `,
        direccion: req.body.direccion,
        especialidad: req.body.especialidad,
        location: {
            type: "Point",
            coordinates: [req.body.lng, req.body.lat]
        }
    }

    User.findByIdAndUpdate(id, {$set:todo}, {new: true},null)
    .then(User=>{

        res.redirect('/profile');
    }).catch(e=>{
        console.log(e)
    })    
});




router.get('/users/:id',  (req, res) => {
    const paciente = (req.user.role === "Paciente") ? true : false
    User.findById(req.params.id)
   .then(user =>{
       res.render('authentication/profile', )
   })
});






 
 module.exports = router;