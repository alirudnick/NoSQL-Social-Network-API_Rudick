const { Schema, model } = require('mongoose');

//const moment = require('moment')

const reactionSchema = new Schema(
  {
  reactionId: { type: Schema.Types.ObjectId, default: () => Schema.Types.ObjectId() },
  reactionBody: { type: String, required: true, },
  username: { type: String, required: true,},
  createdAt: { type: Date, default: Date.now, get: (timestamp) => {
    return new Date(timestamp).toISOString();
  }
  }
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, maxlength: 280 },
    createdAt: { type: Date, default: Date.now, maxlength: 25 },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);



module.exports = Thought;
