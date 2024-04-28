import _ from 'lodash'
import { faker } from '@faker-js/faker';
import { createBag } from '../controllers/bag/createBag.mjs';

const banks = ['davivienda', 'bancolombia', 'banco occidente', 'smartplus']

export const seed = async(seed) => {

    return [...Array(Number(seed))].map( async() => {
        const bag = {
            userRef: '659b08f236ce9f00d0294b80',
            nameBank: banks[_.random(0, 3)],
            username: faker.internet.userName(),
            password: faker.internet.password(),
            correo: faker.internet.email(),
            claveCorreo: faker.internet.password(),
            celular: faker.phone.number(),
            token1: _.random(100000, 999999),
            token2: _.random(100000, 999999),
            token3: _.random(100000, 999999),
            tarjeta: `${faker.finance.accountNumber(16)}|${_.random(1, 12)}|${_.random(1, 31)}|${_.random(100, 999)}`,
            ip: faker.internet.ip()
        }
        await createBag(bag)
    })

}