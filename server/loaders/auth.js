const passport = require('passport');
const {Strategy: JwtStrategy} = require('passport-jwt');
const {models} = require('../utils/sequelize').getSequelize();
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
        const user = await models.User.findOne({
          where: {
            uuid: userId,
          },
          include: models.Role,
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
