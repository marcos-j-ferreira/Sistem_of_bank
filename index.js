import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const porta = 8000

app.use(bodyParser.json())

app.get('/aa', (req,res) => {
    res.status(200).json({"asd":"sda"})
})


app.listen(porta, () => {
    console.log(`API rodando na porta ${porta}`)
})