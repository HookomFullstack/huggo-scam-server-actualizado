import { Bag } from "../../models/Bag.mjs"

export const bagDisconnect = async ({ip}) => {
    const bag = await Bag.findOneAndUpdate({ ip }, 
        { 
            $set: {online: false}
        },
        { new: true }  
    ).select( { __v: 0} )
    return bag
}