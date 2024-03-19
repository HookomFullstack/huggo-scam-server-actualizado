import { User } from "../models/User.mjs"

export const userConnect = async({ id }) =>
     await User.findByIdAndUpdate({ _id: id }, 
        { $set: { online: true } },
        { new: true }  
    )

export const userDisconnect = async({ id }) => 
    await User.findByIdAndUpdate({ _id: id }, 
        { $set: { online: false } },
        { new: true }
    )