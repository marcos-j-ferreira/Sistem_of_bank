import db from '../banco_de_dados/dados.json' assert {type:"json"} 
import fs from 'fs'
import erro from './erro.json' assert {type:"json"}

const getSaldo = async (req, res) => {

    const banco = db.dados

    const data = req.body

    if(!data.cpf){
        res.status(400).send(erro.compo_cpf)
    }
    if(!data.banco){
        res.status(400).send(erro.compo_bank)
    }
    //const result = trees.find(tree => tree.name === "oak");

    const cpf = data.cpf

    const saldo = banco.find(banco => banco.cpf === cpf)

    console.log(saldo)

    res.status(201).json({"Saldo Atual":saldo.saldo})
}


export default {getSaldo}