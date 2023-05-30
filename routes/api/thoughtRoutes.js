const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought } = require('../../controllers/thoughtController');
const { createReaction, removeReaction } = require('../../controllers/reactionController');

router.route('/').get(getAllThoughts).post(createThought);
router.route('/:id').get(getThoughtById);
//there's probably a better way to do this, but it is incredibly tedious and makes it more confusing
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/reactionId').delete(removeReaction);

module.exports = router;