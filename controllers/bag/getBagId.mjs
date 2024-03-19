import { Bag } from "../../models/Bag.mjs"

export const getBagForById = async ({ id }) => await Bag.find( {userRef: id} ).select( {userRef: 0, __v: 0, socketID: 0} )