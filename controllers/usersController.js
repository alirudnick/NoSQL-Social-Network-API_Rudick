const User = require('../models/User');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      }
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user found with this ID' })
      : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'No user found with that ID' })
          return;
      }
  })
  .then((user) => {
      res.json({ message: 'User delete successfully!' })
  })
  .catch((err) => {
      res.status(400).json(err);
  })
},

  // add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
    .then((user) => {
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID' })
            return;
        }
        res.json(user);
    })
    .catch((err) => {
        res.status(400).json(err);
    
    })
  },

//delete a friend
deleteFriend(req, res) {
  User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
  )
  .then((user) => {
      if (!user) {
          res.status(404).json({ message: 'No user found with this ID' })
          return;
      }
      res.json(user);
  })
  .catch((err) => {
      res.status(400).json(err);
  })
}
};