import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        require: true,
        type: String
    },
    online: Boolean,
    ban: {
        type: Boolean,
        default: false
    }
})


export const User = model('User', userSchema);
