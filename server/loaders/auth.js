const passport = require('passport');
const {Strategy: JwtStrategy} = require('passport-jwt');
const {getUserPermissions} = require('../services/user');
const sequelize = require('../utils/sequelize').getSequelize();
const {JWT_SECRET} = process.env;

const init = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  const options = {
    jwtFromRequest: ({headers}) => {
      return headers['x-access-token'];
    },
    secretOrKey: JWT_SECRET,
  };
  passport.use(
    new JwtStrategy(options, async ({userId}, done) => {
      if (!userId) {
        return done(null, false);
      }
      try {
        const user = await sequelize.models.User.findOne({
          where: {
            id: userId,
          },
        });
        if (!user) {
          return done(null, false);
        }
        return done(null, user.get({plain: true}));
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

module.exports = init;
