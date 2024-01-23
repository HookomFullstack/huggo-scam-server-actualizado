
export const changeLive = async (bag) => {
    const { socketID, userRef } = bag

    const newUser = await bag.findOneAndUpdate({
        socketID,
        userRef
    }, 
    { $set: user },
    { new: true })

    return newUser
}