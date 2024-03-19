import { Bag } from "../../models/Bag.mjs"
import _ from 'lodash'

export const createBagIp = async ({ip, nameBank}) => {
    
    if(ip == false) return false

    return  await Bag.findOneAndUpdate(
        { ip, nameBank }, 
        { $set: {isLiveLoading: true} }, { new: true }  )
        .select( {__v: 0} )

}