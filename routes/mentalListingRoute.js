const express = require('express');
const { postOrgData, getAllOrgs, getOneOrg, } = require('../controller/mentalorgController');
const router = express.Router();

//route for adding organisations.
router.post('/orgs', postOrgData);

//route to get all listings.
router.get('/orgs', getAllOrgs);

//router to get just one listing
router.get('/orgs/:id', getOneOrg);

module.exports = router;
