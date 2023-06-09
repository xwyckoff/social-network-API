const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id })
            if(!thought) {
                res.json('Thought does not exist with that ID')
            }
            res.json(thought);
        } catch (err) { 
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            //create a thought and push the ID into the associated user's thoughts array
            const newThought = await Thought.create(req.body);
            const newUserThought = await User.findOneAndUpdate(
                {_id: req.body.userId}, 
                {$push: {thoughts: newThought.id}},
                { new: true }
            )
            res.json({newThought: newThought, userAdded: newUserThought});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought (req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            )

            if(!updatedThought) {
                res.json('Thought does not exist with that ID');
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought (req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.id });
            
            if(!deletedThought) {
                res.json('Thought does not exist with that ID');
            }
            res.json(deletedThought);
        } catch (err) {
            res.status(500).json(err);  
        }
    }
}