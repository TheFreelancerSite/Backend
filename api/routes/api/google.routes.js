const express = require("express");
const router = require('express').Router();
const passport = require("passport")


router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile',"email"] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/signin' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:5173');
  });

module.exports = router;
