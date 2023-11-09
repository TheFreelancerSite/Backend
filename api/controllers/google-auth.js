const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../database/index"); // Assuming User model is properly defined in your Sequelize setup

module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function (id, done) {
    User.findByPk(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async function(accessToken, refreshToken, profile, cb) {

    try {
      const existingUser = await User.findOne({ where: { google_id: profile.id } });
      if (existingUser) {
        existingUser.google_id = profile.id
        existingUser.userName = profile.displayName;
        existingUser.email = profile.emails[0].value;
        existingUser.imgUrl = profile.photos[0].value;
        await existingUser.save();
        return cb(null, existingUser);
      } else {
   
        const newUser = await User.create({
          google_id  : profile.id ,
          userName: profile.displayName,
          email: profile.emails[0].value,
          imgUrl: profile.photos[0].value,
          country : profile._json.locale,
        });
        console.log(newUser);
        return cb(null, newUser);
      }
    } catch (err) {
      return cb(err, null);
    }
  }));
};
