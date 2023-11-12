const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  function (req, res) {
    if (req.user) {
      const user = {  
        userId: req.user.id,
        userName: req.user.userName,
        email: req.user.email,
        imgUrl: req.user.imgUrl,
        isSeller : req.user.isSeller
      };
      if(user.isSeller === false){
      res.redirect(`http://localhost:5173/freelancerHomePage?user=${user.userId}&isSeller=${user.isSeller}&imgUrl=${user.imgUrl}&userName=${user.userName}`)
      }else if(user.isSeller === true){
        res.redirect(`http://localhost:5173/clientHomePage?user=${user.userId}&isSeller=${user.isSeller}&imgUrl=${user.imgUrl}&userName=${user.userName}`)
      }
    } else {
      res.redirect("http://localhost:5173/login");
    }
  }
);

module.exports = router;
