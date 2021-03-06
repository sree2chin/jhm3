const SamlStrategy = require('passport-saml').Strategy;
const fs = require("fs");
const path = require("path");

module.exports = function (passport, config) {
  console.log(fs.readFileSync(path.join(__dirname + "/" + config.passport.saml.cert)).toString());
  this.samlStrategy = new SamlStrategy(
    {
signatureAlgorithm: 'sha512',
      path: config.passport.saml.path,
      callbackUrl: config.passport.saml.path,
      entryPoint: config.passport.saml.entryPoint,
      issuer: config.passport.saml.issuer,
     cert: fs.readFileSync(path.join(__dirname + "/" + config.passport.saml.cert)).toString(),
//     privateCert: fs.readFileSync(path.join(__dirname + "/" + config.passport.saml.privateKey), 'utf-8'),
  //   decryptionPvk: fs.readFileSync(path.join(__dirname + "/" + config.passport.saml.privateKey), 'utf-8')
    },
    function (profile, done) {
      return done(null,
        {
          id: profile.uid,
          email: profile.email,
          displayName: profile.cn,
          firstName: profile.givenName,
          lastName: profile.sn
        });
    });
    var self = this;
  return {
    saml: function() {
      passport.serializeUser(function (user, done) {
        done(null, user);
      });

      passport.deserializeUser(function (user, done) {
        done(null, user);
      });
      passport.use(self.samlStrategy);
    },
    samlStrategy: self.samlStrategy
  }

}
