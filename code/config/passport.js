const SamlStrategy = require('passport-saml').Strategy;
const fs = require("fs");
const path = require("path");

module.exports = function (passport, config) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  passport.use(new SamlStrategy(
    {
      path: config.passport.saml.path,
      entryPoint: config.passport.saml.entryPoint,
      issuer: config.passport.saml.issuer,
      callbackUrl: config.passport.saml.issuer,
      cert: "MIIEFzCCAv+gAwIBAgIUHU+0Gh+9C3MX5cI7bJRPPS1ej3cwDQYJKoZIhvcNAQEFBQAwWDELMAkGA1UEBhMCVVMxEDAOBgNVBAoMB1N1cmVpZnkxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEgMB4GA1UEAwwXT25lTG9naW4gQWNjb3VudCAxMjYwMzgwHhcNMTgwNDIyMTc0NDMwWhcNMjMwNDIyMTc0NDMwWjBYMQswCQYDVQQGEwJVUzEQMA4GA1UECgwHU3VyZWlmeTEVMBMGA1UECwwMT25lTG9naW4gSWRQMSAwHgYDVQQDDBdPbmVMb2dpbiBBY2NvdW50IDEyNjAzODCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMgeE/hMUTcCo8bKj5aZDxrX55HTCGPP/+UpgvGZFhK2F1VVy2h8JCOxx5IIsUsVHG0OCAbBhnsEvtvYRp8aGM0n9GTBKgybsCGK+sDQKgCUqxXkHWW+x6H7Bn37oLCnS6FEGWrZppCfpB2dBROe0BVm9p7x9kjl5lnFAe5L1DBbm1XZj05sTU+k0nSY2S6BT0Jqx5JQcHCrfn9oohoDEaJuSOM4ON5MB6zrQMyIpKkPpe6lKP+hz/jSDbk2WoluxmN73b5gBIF13QOvFR4lglv7ps0mT66w7VuzkXU49kqfrZTf5GPeqYWos3cArny5iweFMTpfAOmbE49h1oXghDUCAwEAAaOB2DCB1TAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBRb3LarHkPT1OWHzE20QrJatviPaTCBlQYDVR0jBIGNMIGKgBRb3LarHkPT1OWHzE20QrJatviPaaFcpFowWDELMAkGA1UEBhMCVVMxEDAOBgNVBAoMB1N1cmVpZnkxFTATBgNVBAsMDE9uZUxvZ2luIElkUDEgMB4GA1UEAwwXT25lTG9naW4gQWNjb3VudCAxMjYwMziCFB1PtBofvQtzF+XCO2yUTz0tXo93MA4GA1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQUFAAOCAQEARE0KCrNCVz8ll74g7IIMxLTPOSDRyy4neHTg+xi0wJEBd1R9dN2atkIBL7kR8QtmBqTr6WbYTAMjE4VC3L95xZb8dQdw9VA3dOEfLxjsQN6ihbdffwEgaWp7W4nNkWxcp+1KWCDpMo5nby6NVLAjRjr5KpBTeHDVRiAu+QisYF+pX1vPH871If1wEVHhk3GhHLxud1aHvEJE7Q2FaffO/NtfLMG6k4PfY/HhUfJfpjcjDW0IaZuZWvE1yv3p9Z7d++TOEYwdpyFubT/uo+qsdFCKSg6P1VvNtJLhvWLCaHGkEfQNLF6le8aNz4qL9rtnoFX7Pr1tEwq7p9VAtrWgCQ==",
      privateCert: fs.readFileSync(path.join(__dirname + "/" + config.passport.saml.privateKey), 'utf-8')
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
    })
  );

};