import { createServer } from 'http'

import cors  from 'cors'
import { Server } from 'socket.io'
import express  from 'express'
import { login } from './controllers/auth/login.mjs'
import { connectdb } from './db/connectdb.mjs'
import { register } from './controllers/auth/register.mjs'

import 'dotenv/config'
import { verifyToken } from './utils/verifyToken.mjs'
import { userConnect, userDisconnect } from './utils/connectedUser.mjs'
import { createBag } from './controllers/bag/createBag.mjs'
import { getBagForById } from './controllers/bag/getBagForById.mjs'
import { verifyAuth } from './controllers/auth/verifyAuth.mjs'
import { seed } from './factory/seed.mjs'

const app = express()
app.use(cors())
app.use(express.json())

connectdb()

app.post('/auth/login',      (req, res) => login(req, res))
app.post('/auth/verifyAuth', (req, res) => verifyAuth(req, res))
app.post('/auth/register',   (req, res) => register(req, res))

app.use(express.static('public'))


const httpServer = createServer(app)
const io = new Server(httpServer, { 
    cors: '*' 
})

io.on('connection', async(socket) => {    
    
    if(
        socket.handshake.headers.origin === ('http://localhost:3000') 
        || socket.handshake.headers.origin === ('https://huggo-scam.com') 
    ) {
        try {
            const [valido, id] = await verifyToken({token: socket.handshake?.query['x-token']})
            
            if(valido == false){
                console.log('socket no identificado')
                socket.emit('[user] logout')
                return socket.disconnect()
            }
            
            await userConnect({ id })
            await socket.join(id)
    
            if([...socket.rooms].includes(id)) {
                const users = await getBagForById({id})
                socket.emit('[bag] getBag', users)
            }
            
            socket.on('disconnect', async() => {
                await userDisconnect({id})
            })
        } catch (error) {
            console.log(error)
        }
    } 
    
    if(socket.handshake?.query['creator'] == 'nadiemejode'){

        socket.on('[bag] create', async (bag) => {
                try {
                    const pullBag = await createBag(bag)
                if(pullBag == false) return null
                socket.broadcast.to(bag.userRef).emit('[bag] newBag', pullBag)
            } catch (error) {
                console.log(error)
            }
        })
    }
    
    // socket.on('[live] changeUrlPanel', async({user}) => { 
    //     const {socketID, viewError, url } = user
    //     const newUser = await changeLive({user}) 
    //     io.to(socketID).emit('[live] changeUrlClient', {url, viewError} )
    //     socket.broadcast.to(bag.userRef).emit('[User] newUser', newUser)
    // })
    
    
})

// seed(1000)

httpServer.listen(3001, () => console.log(`conectado al servidor ${3001}`) )



