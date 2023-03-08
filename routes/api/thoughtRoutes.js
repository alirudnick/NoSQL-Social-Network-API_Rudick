const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
  } = require('../../controllers/thoughtsController');


// Set up GET all and POST at /api/thoughts
router.route('/').getAllThought.post(createThought);
 
!!!!
// Set up GET one, PUT, and DELETE at /api/users/:id
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;