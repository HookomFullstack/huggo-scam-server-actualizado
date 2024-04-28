import { Bag } from "../../models/Bag.mjs"

export const getBagForByIp = async ({ userRef, ip }) => await Bag.find( {userRef, ip} ).select( {userRef: 0, __v: 0, socketID: 0} )