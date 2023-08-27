const { Thoughts, User } = require('../models');

module.exports = {
  // Function to get all of the thoughts by invoking the find() method with no arguments.
  async getThought(req, res) {
    try {
      const thought = await Thoughts.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Gets a single thought using the findOneAndUpdate method.
  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findOne({ _id: req.params.thoughtsId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Creates thoughts
  async createThought(req, res) {
    try {
      const thought = await Thoughts.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }

      res.json('Created the thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Updates thoughts
  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Deletes thoughts
  async deleteThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndRemove({ _id: req.params.thoughtsId });

      if (!thought) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtsId },
        { $pull: { thought: req.params.thoughtsId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought deleted!',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Adds Reaction
  async addReact(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction
  async removeReact(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No reaction with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
