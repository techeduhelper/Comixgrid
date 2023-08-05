import express from 'express';
import registerController, { forgetPasswordController, loginController, testController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../midlewares/authMiddlewares.js';

// rest object
const router = express.Router();

// routing 
// register || POST Method 
router.post('/register', registerController);

// Login Routes
router.post('/login', loginController);

// Forgot password Rutes
router.post("/forget-password", forgetPasswordController)

// test routes
router.get('/test', requireSignIn, isAdmin, testController);

// protected routes
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});
export default router;