import express from "express";
import AdminUser from "../model/Admin.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/Register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (email && password) {
      const AdminEmail = await AdminUser.findOne({
        email: email,
      });
      if (AdminEmail) {
        return res.status(400).json({ message: "Email already exists" });
      } else {
        const HashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new AdminUser({
          name,
          email,
          password: HashedPassword,
        });
        await newAdmin.save();
        return res.status(200).json({ message: "user has been created" });
      }
    } else {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const AdminEmail = await AdminUser.findOne({
        email: email,
      });
      if (!AdminEmail) {
        return res
          .status(400)
          .json({ message: "Email and Password Incorrect" });
      } else {
        const isMatch = await bcrypt.compare(password, AdminEmail.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ message: "Email and Password  Incorrect" });
        } else {
          return res.status(200).json({ message: "Login Successful" });
        }
      }
    } else {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
