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

 router.get('/map', (req, res) => {
    res.render('map');
});




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

// router.post('/new', uploader.single('image'), (req, res, next) => {
//     const { path, filename } = req.file
//     const { content } = req.body
//     console.log(path)
//     const newPost = {
//         content: content,
//         creatorId: "5c004f6beec47219eafffe86",
//         picPath: '/posts/' + filename,
//         filename: filename,
//     }


 module.exports = router;