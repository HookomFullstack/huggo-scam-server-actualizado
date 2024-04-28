import { Bag } from "../../models/Bag.mjs"

export const bagConnected = async ({ip, socket}) => {

    const bag = await Bag.findOneAndUpdate({ ip }, 
        { 
            $set: {online: true}
        },
        { new: true }  
    ).select( { __v: 0} )
    
    if(bag == false) return null
    
    return socket.broadcast.to(bag?.userRef?.toString()).emit('[bag] newBag', bag)
}