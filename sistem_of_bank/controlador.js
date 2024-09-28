import db from '../banco_de_dados/dados.json' assert {type:"json"} 
import fs from 'fs'
import erro from './erro.json' assert {type:"json"}

const getSaldo = async (req, res) => {

    const data = req.body

    if(!data.cpf){
        res.status(400).send(erro.compo_cpf)
    }
    if(!data.banco){
        res.status(400).send(erro.compo_bank)
    }
}


export default {getSaldo}