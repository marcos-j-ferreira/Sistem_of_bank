import controlador from './controlador.js'
import express from 'express'

const router = express.Router()

router.post('', controlador.getSaldo)

export default router