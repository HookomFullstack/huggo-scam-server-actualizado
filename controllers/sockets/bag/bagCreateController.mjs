import { createBagId } from "../../bag/createBagId.mjs"

export const bagCreateController = async ({bag, socket}) => {
  try {
    
    const pullBag = await createBagId(bag)
    if(pullBag == false) return null
    return socket.broadcast.to(bag.userRef).emit('[bag] newBag', pullBag)

  } catch (error) { return console.log(error) }
}
