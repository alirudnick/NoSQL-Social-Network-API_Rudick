const { Schema, model } = require('mongoose');

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

const reactionSchema = newSchema(
  reactionId: { type: Schema.Types.ObjectId,
    default: () => Schema.Types.ObjectId() },
  reactionBody: { type: String, required: true, },
  username: { type: String, required: true,},
  createdAt: { type: Date.now, get: (timestamp) => {
    return new Date(timestamp).toISOString();
  }
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  reaction this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);



module.exports = Thought;
