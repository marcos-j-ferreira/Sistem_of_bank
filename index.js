import express from 'express'
import bodyParser from 'body-parser'
import router from './sistem_of_bank/rotas.js'

const app = express()
const porta = 8000

app.use(bodyParser.json())

app.use('/test', router)

app.listen(porta, () => {
    console.log(`API rodando na porta ${porta}`)
})