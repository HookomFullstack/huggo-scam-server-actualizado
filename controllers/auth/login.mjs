import { User } from "../../models/User.mjs"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const {username = '', password = ''} = req.body
    
        if(username == false || password == false) return res.status(400).json({ ok: false, msg: 'El campo username y password son obligatorios'})
    
        const user = await User.find({username})
        
        if(user?.length == 0) return res.status(403).json({ok: false, msg: 'Usuario y clave no válidas' })
        if(user[0]?.ban == true) return res.status(403).json({ok: false, msg: 'Has sido baneado, por favor contactar con el administrador'})
        
        const passwordHash = bcryptjs.compareSync(password, user[0].password)
    
        if(passwordHash == false) return res.status(403).json({ok: false, msg: 'Usuario y clave no válidas'})
        
        const token = jwt.sign({
            id: user[0]?.id,
            username,
        }, process.env.SECRET_KEY_LOGIN)
        
        return res.json({ok: true, token})
    } catch (error) {
        console.log(error)
    }
}