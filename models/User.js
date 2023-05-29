const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
       username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
       },
       email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/ //regex that matches only email format
       },
       thoughts: {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
       },
       friends: {
        type: Schema.Types.ObjectId,
        ref: 'User'
       }
    }
)

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', userSchema);
module.exports = User;