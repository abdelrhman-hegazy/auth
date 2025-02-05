const jwt = require("jsonwebtoken");

const generteToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      verified: user.verified,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = {generteToken};
