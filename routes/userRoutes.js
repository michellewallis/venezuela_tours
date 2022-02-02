//MODULES
const router = require("express").Router();
const userController = require("../controllers/userController");
const authController = require('../controllers/authController')

// ROUTES
router.post('/signup', authController.signup)

//Main routes
router.route("/").get(userController.getAllUsers).post(userController.addUser);

router
    .route("/:id")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

    //export router
    module.exports = router;