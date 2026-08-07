import express from "express";
import { createUser,LoginUser } from "./controller/controller.js";


console.log("✅ backroute.js loaded");
import { validateUser } from "./middleware/middleware.js";


const router = express.Router();

router.use((req, res, next) => {
  console.log(`[backroute] ${req.method} ${req.originalUrl}`);
  next();
});

router.get("/", (req, res) => {
  console.log("GET /backroute hit");
  res.json({ status: "ok", route: "backroute" });
});
router.post(
    "/signup",
    validateUser, createUser
);
router.post("/login", validateUser, LoginUser );
router.use((err, req, res, next) => {
  console.error("[backroute error]", err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

export default router;
