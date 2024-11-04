// import express from 'express';
// import { Login, Register } from '../controller/user.controller.js';
// const router = express.Router();

// router.route('/register').post(Register);
// router.route('/login').post(Login);


// export default router;



// routes/user.router.js
import express from 'express';
import { Login, Register } from '../controller/user.controller.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);

export default router;
