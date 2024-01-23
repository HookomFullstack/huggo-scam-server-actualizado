import mongoose from 'mongoose'

export const connectdb = async() => {
    try {
        
        // await mongoose.connect( 'mongodb+srv://compa:hola1234$@cluster0.6rpwwim.mongodb.net/huggo-scam' );
        await mongoose.connect( 'mongodb+srv://MiguelFullstack:hookom119@cluster0.tgb2koj.mongodb.net/?retryWrites=true&w=majority' );
        // await mongoose.connect( 'mongodb+srv://MiguelFullstack:hookom119@miguelfullstack.xbouv6j.mongodb.net/soler-DC' );
        // await mongoose.connect( 'mongodb+srv://MiguelFullstack:hookom119@miguelfullstack.xbouv6j.mongodb.net/pablo-escobar' );
        // await mongoose.connect('mongodb://127.0.0.1:27017/huggo-dev')
        return console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}