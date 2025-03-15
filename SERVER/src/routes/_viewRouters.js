import { Router } from "express";
import { catchErr } from "#color";
import { viewAuthenticate } from "#middleware/auth.middleware.js";
const router = Router();
try {
    router.get("/users", viewAuthenticate, (req, res) => {
        if (req.auth.role == "a") res.render("users");
        else res.render("NoAdmin");
    });
    router.get("/", viewAuthenticate, (req, res) => {
        if (req.auth.role == "a") res.render("index");
        else res.render("NoAdmin");
    });

    router.get("/event", viewAuthenticate, (req, res) => {
        if (req.auth.role == "a") res.render("Event");
        else res.render("NoAdmin");
    });
    router.get("/emages", viewAuthenticate, (req, res) => {
        if (req.auth.role == "a") res.render("images");
        else res.render("NoAdmin");
    });
} catch (error) {
    catchErr(error, "ViewRoute");
}

export default router;
