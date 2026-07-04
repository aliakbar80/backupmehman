const express = require("express");
const { getData, postData, getDataSlice, getDataSingle, getReports, deleteData, postReports , getReportsPost, getReport30 } = require("../../controller/Guest");
const auth = require('../../middleware/auth')

const router = express.Router();

router.get('/', auth, getData);
router.post('/', auth, postData);
router.get('/reports', auth, getReports);
router.post('/get-report30', auth, getReport30);
router.post('/reports', auth, postReports);
router.post('/get-reports', auth, getReportsPost);
router.get('/:page', auth, getDataSlice);
router.get('/single/:id', auth, getDataSingle);

router.delete('/:id', auth, deleteData);

module.exports = router;