const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignment.controller');
const authJwt = require('../middlewares/auth.jwt');
const checkRole = require('../middlewares/rbac');

const commander = checkRole(['BaseCommander', 'Admin']); 
router.use(authJwt, commander);

router.post('/', assignmentController.createAssignment);
router.get('/', assignmentController.getAssignments);
router.patch('/:id/expend', assignmentController.markExpended);

module.exports = router;