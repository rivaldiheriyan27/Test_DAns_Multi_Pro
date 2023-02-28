const {userController} = require("../controllers/userController")
const {jobController} = require("../controllers/jobController")


const errorHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication")
const router = require("express").Router();


router.post("/login", userController.login)
router.post("/register", userController.register)

router.get("/api/recruitment/position",jobController.readAllJob)

router.use(authentication);
router.get("/api/recruitment/position/:readJobById",jobController.readJobById)


router.use(errorHandler);

module.exports = router;