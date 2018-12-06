const express = require('express');
 const router = express.Router();
 const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
 const multer = require('multer');
 const upload = multer({ dest: './public/uploads/' });
 const Post = require('../models/post');
 const User = require("../models/User");



 router.get('/new-post', ensureLoggedIn('/login'), (req, res) => {
     res.render('new-post');
 });

 router.post('/new-post', [ensureLoggedIn('/login'), upload.single('photo')], (req,res) => {
     const {content} = req.body;
     //const picpath = `uploads/${req.file.filename}`;
     //const picname = req.file.originalname;
     const newPost = new Post({
         content,
         creatorId: req.user._id,
         //picpath,
         //picname
     });
     newPost.save()
     .then(() => res.redirect('/profile'));

 });

//  router.get('/map', (req, res) => {
//     res.render('map');
// });


router.get('/map', ensureLoggedIn('/login'), (req, res) => {
    const paciente = (req.user.role === "Paciente") ? true : false
     Post.find({creatorId: req.user._id})
     .then(posts => res.render('map', 
     {user : req.user, posts, paciente}))
     .catch(e => console.log(e));
 });

// router.get('/map', (req, res) => {
//     //res.render('map');
//    // User.find({});

//     User.find({})
//     .populate("location")
//     .then( users =>
//         res.render("map", {users:users})
//     .catch(error => {
//         res.redirect("/");
//     })
// );
//  });




router.post('/routes/post/:id', upload.single("photoURL"), (req, res) => {
    const {id} = req.params
    const photoURL = req.file.url
    User.findByIdAndUpdate(id, {$set:{photoURL:photoURL}})
    .then(User=>{
        res.redirect('/profile');
    }).catch(e=>{
        console.log(e)
    })    
});


 module.exports = router;