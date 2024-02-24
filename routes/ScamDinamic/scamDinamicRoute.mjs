import express from 'express'
import { getImageBancamiga, getListImagesBancamiga } from './countries/venezuela/bancamiga.mjs'
const router = express.Router()

router.post('/venezuela/bancamiga/getImage',     (req, res) => getImageBancamiga(req, res))
router.post('/venezuela/bancamiga/getListImage', (req, res) => getListImagesBancamiga(req, res))

export default router