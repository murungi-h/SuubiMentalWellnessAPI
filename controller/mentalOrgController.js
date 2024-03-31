const orgModel = require('../models/mentalHealthOrgs');
const psychoModel = require('../models/mentalHealthPsycho');
const psychiatristModel = require('../models/mentalHealthPsychiatrists');

//For adding Organisations
const postOrgData = async(req, res) => {
    try {
        let newOrg = req.body;
        newOrg = await orgModel.create(newOrg);
        res.status(201).json(newOrg);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

//For adding individual psychologists
const postPsychologists = async(req, res) => {
    try {
        let newPsycho = req.body;
        newPsycho = await psychoModel.create(newPsycho);
        res.status(201).json(newPsycho);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

//For adding individual psychiatrists
const postPsychiatrists = async(req, res) => {
    try {
        let newPsychiatrist = req.body;
        newPsychiatrist = await psychiatristModel.create(newPsychiatrist);
        res.status(201).json(newPsychiatrist);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

//For getting all
const getAllOrgs = async(req, res) => {
    try {
        const allOrgs = await orgModel.find({});
        res.status(200).json(allOrgs);
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
}

//For getting a single resource
const getOneOrg = async(req, res) => {
    try {
        const { id } = req.params;
        const oneOrg = await orgModel.findById(id);
        res.status(200).json(oneOrg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    postOrgData,
    postPsychologists,
    postPsychiatrists,
    getAllOrgs,
    getOneOrg,
}
