import { isValidObjectId } from "mongoose"
import { Bag } from "../../models/Bag.mjs"
import { User } from "../../models/User.mjs"
import _ from 'lodash'

export const createBag = async (bag) => {
    
    if(isValidObjectId(bag.userRef) == false) return false

    const userExist = await User.findOne({_id: bag.userRef}) 

    if(userExist == false) return false;
    
    const existBag = await Bag.findOne({
        userRef: userExist._id,
        nameBank: bag.nameBank,
        ip: bag.ip
    })

    if(existBag) {
        
        const updateBag = await Bag.findOneAndUpdate({
            _id: existBag._id,
        }, 
        { $set: bag },
        { new: true }  
        ).select( {userRef: 0, __v: 0} )

        return updateBag
    }
        
    const newBag = new Bag(bag) 
    
    await newBag.save()
    return newBag

}