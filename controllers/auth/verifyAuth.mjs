import { verifyToken } from '../../utils/verifyToken.mjs';
export const verifyAuth = async (req, res) => {

    const  { auth } = req.body
    const [validar] = await verifyToken({token: auth})

    if(validar) return res.status(200).json({ok: true})
    
    return res.status(400).json({ok: false})
}