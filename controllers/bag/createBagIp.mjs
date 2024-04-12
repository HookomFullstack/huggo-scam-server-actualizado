import { Bag } from "../../models/Bag.mjs"
import _ from 'lodash'

export const createBagIp = async ({ip, nameBank, specialInfo}) => {
    
    if(ip == false) return false

    return  await Bag.findOneAndUpdate(
        { ip, nameBank }, 
        { $set: {isLiveLoading: specialInfo} }, { new: true }  )
        .select( {__v: 0} )

}