const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },
        username: {
            type: String,
            required: true
        },

        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

thoughtSchema.virtual('reactionCount', function() {
    return this.reactions.length;
})

function formatDate(date) {
    return date.toLocaleString()
}

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;