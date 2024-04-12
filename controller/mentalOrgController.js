const orgModel = require('../models/mentalHealthOrgs');

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
    getAllOrgs,
    getOneOrg,
}
