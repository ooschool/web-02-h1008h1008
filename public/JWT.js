const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    "jwtsecretplschange"
  );

  return accessToken;
};
const createresetTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    "jwtsecretplschange",{expiresIn: "60m"}
  );

  return accessToken;
};


const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  console.log(accessToken)
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, "jwtsecretplschange");
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const validateresetToken = (accessToken) => {
  if (!accessToken)
    return false;

  try {
    const validToken = verify(accessToken, "jwtsecretplschange");
    if (validToken) {
      return true;
    }
  } catch (err) {
    return false;
  }
};

module.exports = { createTokens,createresetTokens, validateToken ,validateresetToken};