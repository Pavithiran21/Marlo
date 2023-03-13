const express = require('express');
const {createEmployee,updateEmployee,SingleEmployeeList,deleteEmployee,AllEmployeeList} = require('../Controller/loginController')

const authenticate = require('../Utils/authenticate');
const router = express.Router();



// router.get('/dashboard',authenticate,DashboardCount);
router.post('/create',authenticate,createEmployee);
router.get('/student-list/id',authenticate,SingleEmployeeList);
router.get('/student-list',authenticate,AllEmployeeList);
router.put('/update/:id',authenticate,updateEmployee);
router.post('/delete/:id',authenticate,deleteEmployee);

module.exports = router;