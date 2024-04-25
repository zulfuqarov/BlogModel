import express from "express";

import Admin from "./routes/Admin.js";
import Blog from "./routes/Blog.js";
const router = express.Router();

router.use("/Admin", Admin);
router.use("/Blog", Blog);

export default router;
