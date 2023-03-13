const express = require('express');
const { register, ActivateEmail, CheckActivation, reset, forgot, login  } = require('../Controller/userController');

const router = express.Router();

router.post('/signup',register);
router.post('/activate',ActivateEmail);
router.get('/activate/:activeToken',CheckActivation);
router.post('/reset',forgot);
router.put('/reset/:resetToken',reset);

router.post('/login',login);




module.exports = router;