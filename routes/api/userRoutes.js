const router = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('../../controllers/userController')
const { addFriend, removeFriend } = require('../../controllers/friendController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
module.exports = router;