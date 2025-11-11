const { Router } = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser
} = require("../controllers/userController");

const router = Router();

router.get("/", getAllUsers);       
router.post("/registro", registerUser);
router.post("/login", loginUser);   

module.exports = router;
