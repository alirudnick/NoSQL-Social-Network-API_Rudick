const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction
  } = require('../../controllers/thoughtsController');


// Set up GET all and POST at /api/thoughts
router.route('/').get(getThoughts).post(createThought);
 

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;