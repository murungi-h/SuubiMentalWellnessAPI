const express = require('express');
const { postOrgData, getAllOrgs, getOneOrg, postPsychologists, postPsychiatrists } = require('../controller/mentalOrgController');
const router = express.Router();

//route for adding organisations.
router.post('/orgs', postOrgData);

//route for adding individual practitioners (psychologists).
router.post('/psychologists', postPsychologists);

//route for adding individual practitioners (psychiatrists).
router.post('/psychiatrists', postPsychiatrists);

//route to get all listings.
router.get('/orgs', getAllOrgs);

//router to get just one listing
router.get('/orgs/:id', getOneOrg);

module.exports = router;
