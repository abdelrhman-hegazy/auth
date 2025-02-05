const express = require("express");

const passport = require("passport");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/jwt");

const {
  signup,
  signin,
  signout,
  sendverificationCode,
  verifyVerificationCode,
  googleAuthCallback,
  changePassword,
  sendForgotPasswordCode,
  verifyForgotPasswordCode
} = require("../controllers/auth");
const identifier = require("../middlewares/identification");
const router = express.Router();
//auth 
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", identifier, signout);

router.patch("/send-verification-code", identifier, sendverificationCode);
router.patch("/verify-verification-code", identifier, verifyVerificationCode);


router.patch("/change-password", identifier, changePassword);
router.patch("/send-forgot-password-code", sendForgotPasswordCode);
router.patch("/verify-forgot-password-code", verifyForgotPasswordCode);


// Google OAuth Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleAuthCallback
);

module.exports = router;
