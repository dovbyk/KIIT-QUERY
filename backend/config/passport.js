const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const { displayName, emails, photos } = profile;
        const email = emails[0].value;

        try {
          const domain = email.split("@")[1];
          if (domain !== "kiit.ac.in") {
            console.log("Not allowed for outside KIIT");
            return done(null, false, { message: "Only KIIT emails are allowed" });
          }

          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return done(null, existingUser);
          }

          const newUser = {
            name: displayName,
            email,
            avatar: photos[0].value,
          };

          return done(null, newUser);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    try {
      const user = await User.findOne({ email });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
