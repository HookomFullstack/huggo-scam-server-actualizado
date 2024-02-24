import { Bag } from "../../../../models/Bag.mjs"

export const getImageBancamiga = async (req, res, io) => {
    io.on('hola', (e) => console.log(e))
    io.emit('hola', 'a')
    console.log('llego aca')
    
    // comst image =await Bag.findOneAndUpdate({ip}, {})
}

export const getListImagesBancamiga = async ({listImages}) => {
    // Bag.findOneAndUpdate( {ip}, {
    //     additionalData: 
    // } )
}