import express from "express";
import compression from "compression"; // compresses requests
import lusca from "lusca";
import path from "path";
import passport from "passport";
import { mongoStoreSession } from "./db/mongo";
import mongooseService from "./db/mongoose.service";

// API keys and Passport configuration
import * as passportConfig from "./config/passport";
import appRouter from "./routes";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoStoreSession);
// app.use(passport.initialize());
// app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
// app.use((req, res, next) => {
//     // After successful login, redirect back to the intended page
//     if (
//         !req.user &&
//         req.path !== "/login" &&
//         req.path !== "/signup" &&
//         !req.path.match(/^\/auth/) &&
//         !req.path.match(/\./)
//     ) {
//         req.session.returnTo = req.path;
//     } else if (req.user && req.path == "/account") {
//         req.session.returnTo = req.path;
//     }
//     next();
// });

/**
 * Primary app routes.
 */
app.use(appRouter(mongooseService));
// app.get("/login", userController.getLogin);
// app.post("/login", userController.postLogin);
// app.get("/logout", userController.logout);
// app.get("/forgot", userController.getForgot);
// app.post("/forgot", userController.postForgot);
// app.get("/reset/:token", userController.getReset);
// app.post("/reset/:token", userController.postReset);
// app.get("/signup", userController.getSignup);
// app.post("/signup", userController.postSignup);
// app.get("/contact", contactController.getContact);
// app.post("/contact", contactController.postContact);
// app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
// app.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
// app.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
// app.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
// app.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

// // /**
//  * API examples routes.
//  */
// app.get("/api", apiController.getApi);
// app.get(
//     "/api/facebook",
//     passportConfig.isAuthenticated,
//     passportConfig.isAuthorized,
//     apiController.getFacebook,
// );

// /**
//  * OAuth authentication routes. (Sign in)
//  */
// app.get(
//     "/auth/facebook",
//     passport.authenticate("facebook", { scope: ["email", "public_profile"] }),
// );
// app.get(
//     "/auth/facebook/callback",
//     passport.authenticate("facebook", { failureRedirect: "/login" }),
//     (req, res) => {
//         res.redirect(req.session.returnTo || "/");
//     },
// );

export default app;
