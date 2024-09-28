import db from '../banco_de_dados/dados.json' assert {type:"json"} 
import fs from 'fs'
import filePath from '../sistem_of_bank/test.json' assert {type:"json"}
import path from 'path'
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


const Saque = async (req, res) => {

    const bodydados = req.body;
    const cpf = bodydados.cpf;
  
    if (!bodydados.cpf) {
      return res.status(400).send(erro.compo__cpf);
    }
  
    if (!bodydados.valor) {
      return res.status(400).send(erro.compo_saque);
    }
  
    fs.readFile('./sistem_of_bank/test.json', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Error updating JSON file' });
        return;
      }
  
      const dados = filePath.dados;
      
      let usr = dados.find(dados => dados.cpf === cpf);
      
      //const saldo = banco.find(banco => banco.cpf === cpf)
      
      
      if (usr) {
           usr.saldo -= data.valor; // Update the saldo value
        }
        const jsonData = usr; 
  
      const updatedData = JSON.stringify(jsonData, null, 2);
      fs.writeFile('./sistem_of_bank/test.json', updatedData, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send({ message: 'Error updating JSON fille' });
        } else {
          res.send({ message: 'JSON file updated successfully!' });
        }
      });
    });
  };

/*
try {
    const data = await fs.readFile('/Users/joe/test.txt', { encoding: 'utf8' });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
*/

export default {getSaldo, Saque}