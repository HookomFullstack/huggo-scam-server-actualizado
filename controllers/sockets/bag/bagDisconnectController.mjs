import { bagDisconnect } from "../../bag/bagDisconnect.mjs"

export const bagDisconnectController = async ({socket}) => {
   
    try {

        const pullBag = await bagDisconnect({ip: socket.handshake?.query['ip']})

        if(pullBag == false || pullBag?.online == true) return null

        socket.broadcast.to(pullBag?.userRef?.toString()).emit('[bag] newBag', pullBag)
        return socket.disconnect(true)

    } catch (error) {

        console.log(error)
        console.log('ha ocurrido un error al desconectar un usuario')                
        return socket.disconnect(true)

    } 
}
