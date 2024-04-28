import jwt from 'jsonwebtoken'

export const verifyToken = async ({token}) => {
    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY_LOGIN)
        return [ true, id ]
    } catch (error) {
        return [ false, null ]
    }
}
