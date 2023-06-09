const reactionSchema = require('../models/Reaction');
const Thought = require('../models/Thought');
const { rawListeners } = require('../models/User');

module.exports = {
    //find the thought and add the reaction to it's reactions array
    async createReaction(req, res) {
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId }, 
                { $push: { reactions: req.body }},
                { new: true }
            )
            if(!newReaction) {
                res.json('Thought does not exist with that ID.');
            }
            res.json(newReaction); 
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const removedReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId }, 
                { $pull: { reactions: { reactionId: req.params.reactionId }}},
                { new: true }
            )
            if(!removedReaction) {
                res.json('Thought does not exist with that ID.');
            }
            res.json(removedReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
