const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  // Function to get all of the applications by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  getThoughtById (req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
  )
      .catch((err) => res.status(500).json(err));
  },
  // Creates a new application. Accepts a request body with the entire Application object.
  // Because applications are associated with Users, we then update the User who created the app and add the ID of the application to the applications array
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'Found no user with that ID',
            })
          : res.json('Thought successfully created! 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Updates and application using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  updateThoughtById(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No thought found with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Deletes a thought from the database. Looks for an app by ID.
  // Then if the app exists, we look for any users associated with the app based on he app ID and update the applications array for the User.
  deleteThoughtById(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought with this id!' })
          return;
        }
          return User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thought: req.params.thoughtId } },
              { new: true }
            );
          })
      .then((user) => {
        res.json({ message: 'Thought deleted successfully.'})
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    },
       
     // Create reaction 
     addReaction(req, res) {
      Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $push: { reactions: req.body } },
          { new: true }
      )
      .then((thought) => {
          if (!thought) {
              res.status(404).json({ message: 'No thought found with this ID' });
              return;
          }
          res.json(thought);
      })
      .catch((err) => {
          res.status(400).json(err);
      })
  },
  // Remove reaction
  deleteReaction(req, res) {
    console.log(req.params.thoughtId, req.params.reactionId);
      Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          {runValidators: true, new: true }
      )
      .then((thought) => {
          if (!thought) {
              res.status(404).json({ message: 'No thought found with this ID' });
              return;
          }
          res.json(thought);
      })
      .catch((err) => {
          res.status(400).json(err);
      })
  }
};