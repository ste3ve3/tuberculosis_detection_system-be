import express from "express"
import passport from "passport"
import githubCredentials from "../controllers/githubController.js"
import JWT from "jsonwebtoken"
import sessionStorage from "node-sessionstorage"


githubCredentials(passport)

const router = express.Router()


router.get('/github', passport.authenticate('github', { scope: ['email']}));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: process.env.FAILURE_REDIRECT_URL }), (req, res) => {
    const token = JWT.sign({user: req.user}, process.env.ACCESS_TOKEN_SECRET)
    sessionStorage.setItem("set_token", token)
    
    res.redirect(process.env.SUCCESS_REDIRECT_URL);
});


export default router