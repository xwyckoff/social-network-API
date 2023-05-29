const User = require('../models/User'); 

//methods that will get all users, get a user by their ID, create a new user, update a user, and delete a user
module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find({})
            .populate('thoughts')
            .populate('friends');
            res.json(users)
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findOne({_id: req.params.id})
            if(!user) {
                res.json('User does not exist with that ID');
            } 
            
            res.json(user);
            
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            )
            if(!updatedUser) {
            res.json('User does not exist with that ID');
            } 
            res.json(updatedUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.id })
            if(!deletedUser) {
                res.json('User does not exist with that ID');
            }
            res.json(deletedUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

}