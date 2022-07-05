const express = require("express");
const router = express.Router();
const { handleJson,deleteUser,getUser } = require("./controller");

router.route("/").post(handleJson).get(getUser)
router.route("/delete/:id").delete(deleteUser)


module.exports = router;

