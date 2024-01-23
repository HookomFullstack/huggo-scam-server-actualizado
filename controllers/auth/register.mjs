import { User } from "../../models/User.mjs"
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    
    try {
        const {username = '', password = '', adminAccess = ''} = req.body
    
        if(adminAccess !== process.env.ADMIN_KEY) return res.status(401).json({ok: false, msg: 'Necesitas acceso de administrador'})
        if(username == false || password == false) return res.status(400).json({ ok: false, msg: 'El campo username y password son obligatorios'})
    
        const user = await User.find({username})
    
        if(user?.length >= 1) return res.status(400).json({ok: false, msg: `El usuario ${username} ya existe`})
        
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)
        
        await User.create({username, password: passwordHash})
    
        return res.json({ok: true, username, passwordHash})
    } catch (error) {
        console.log(error)
    }
}