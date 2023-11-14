const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../database/index");

module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findByPk(id)
      .then((user) => {
        if (!user) {
          return done(new Error('User not found'), null);
        }
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
      const user = await User.findOne({ where: { google_id: profile.id } });
      if (user) {
        user.google_id = profile.id;
        user.userName = profile.displayName;
        user.email = profile.emails[0].value;
        user.imgUrl = profile.photos[0].value;
        user.googleToken = accessToken;
        await user.save();
        return cb(null, user);
      } else {
        const newUser = await User.create({
          google_id: profile.id,
          userName: profile.displayName,
          email: profile.emails[0].value,
          imgUrl: profile.photos[0].value,
          country: profile._json.locale,
          googleToken: accessToken
        });
        console.log(newUser, "New User Created");
        return cb(null, newUser);
      }
    } catch (err) {
      return cb(err, null);
    }
  }));
};
