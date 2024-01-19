import { User } from "../models/User.mjs"

export const userConnect = async({ id }) => {
    const usuario = await User.findByIdAndUpdate({ _id: id }, 
        { $set: {
            online: true
        }},
        { new: true }  
    )
    return usuario
}

export const userDisconnect = async({ id }) => {
    const usuario = await User.findByIdAndUpdate({ _id: id }, 
        { $set: {
            online: false
        }},
        { new: true }  
    )
    return usuario
}