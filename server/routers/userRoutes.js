const express = require("express");
const router = express.Router();
const userControlers = require("../controlers/UserControlers");
const loginControlers = require("../controlers/LoginControlers");
const DataControlers = require("../controlers/DataControlers");
const UpdatePassword = require("../controlers/UpdatePassword");
const DepositAmount = require("../controlers/DepositAmount");
const WithdrawAmount = require("../controlers/WithdrawAmount");
const TransferControlers = require("../controlers/TransferControlers");
const LogoutControlers = require("../controlers/LogoutControlers");
router.post("/createuser", userControlers);
router.post("/loginuser", loginControlers);
router.get("/getuser", DataControlers);
router.put("/update", UpdatePassword);
router.put("/deposit", DepositAmount);
router.put("/withdraw", WithdrawAmount);
router.put("/transfer", TransferControlers);
router.get("/logout", LogoutControlers);
module.exports = router