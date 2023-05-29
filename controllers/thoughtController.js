const Thought = require('../models/Thought');

module.exports = {
    async getAllThoughts(req, res) {
        try{
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getThoughtById(req, res) {

    },
    async createThought(req, res) {

    }
}