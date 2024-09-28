import fs from 'fs'
import db from '../banco_de_dados/dados.json' assert {type:"json"} 
import erro from './erro.json' assert {type:"json"}
import apro from './response.json' assert {type:"json"}

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

    //console.log(saldo)

    const status_conta = apro.saldo
    res.status(201).json({"Saldo Atual":saldo.saldo, status_conta})
}


const Saque = async (req, res) => {
    const bodydados = req.body;
    const cpf = bodydados.cpf;
  
    if (!bodydados.cpf) {
      return res.status(400).send(erro.compo__cpf);
    }
  
    if (!bodydados.valor) {
      return res.status(400).send(erro.compo_saque);
    }
  
    const dadoss = db.dados;
    const index = dadoss.findIndex((dadoss) => dadoss.cpf === cpf);
  
    
    if (index === -1) {
      return res.status(404).json({ error: 'not found'});
    }
    const saldoAtual = dadoss[index].saldo;
    
    if(saldoAtual < bodydados.valor){
        res.status(404).send({error:"Saldo insuficiente","Saldo atual":saldoAtual })
        return
    }
    const novoSaldo = saldoAtual - bodydados.valor;
  
    dadoss[index].saldo = novoSaldo;
  
    fs.writeFile('./banco_de_dados/dados.json', JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro no servidor' });
      } else {
        //console.log('ok');
      }
    });

    const aprovado = apro.saque_aprovado
    res.status(200).send(aprovado);
  };

export default {getSaldo, Saque}