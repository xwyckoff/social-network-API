const User = require('../models/User');

module.exports = {
    async addFriend(req, res) {
        try {
            //push the new friend ID into the array of friends of the specified user
            const newFriend = await User.updateOne(
                {_id: req.params.userId },
                { $push: { friends: req.params.friendId } }
            )

            if(!newFriend) {
                res.json('User does not exist with that ID')
            }
            res.json(newFriend);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            //remove the specified friend from the users array of friends
            const removeFriend = await User.updateOne(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }}
            )
            if(!removeFriend) {
                res.json('User does not exist with that ID');
            }
            res.json(removeFriend);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}