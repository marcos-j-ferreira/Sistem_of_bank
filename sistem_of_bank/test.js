const fs = require('fs');
const filePath = '../banco_de_dados/dados.json';

// Read the existing JSON file
fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const db = JSON.parse(data);

  // Update the data
  const cpfToUpdate = "123";
  const saldoToUpdate = 250000;
  const customerToUpdate = db.dados.find((customer) => customer.cpf === cpfToUpdate);
  if (customerToUpdate) {
    customerToUpdate.saldo = saldoToUpdate;
  }

  // Write the updated data back to the file
  const updatedData = JSON.stringify(db, null, 2);
  fs.writeFile(filePath, updatedData, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('JSON file updated successfully!');
    }
  });
});

const updateCliente = async (req, res) => {
    const _id = req.query.id;
    const dados = req.body;

    if (!_id) {
    return res.status(400).json({ error: 'ID do produto não fornecido' });
    }

    if (!dados) {
    return res.status(400).json({ error: 'Dados do produto não fornecidos' });
    }

    const index = db.clientes.findIndex(obj => obj.id == _id);

    if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
    }

    db.clientes[index] = { ...db.clientes[index], ...dados };

    fs.writeFile('./clientes/db-clientes.json', JSON.stringify(db, null, 2), (err) => {
    if (err) {
        //console.error(err);
        return res.status(500).json({ error: 'Erro no servidor' });
    } else {
        console.log('Produto atualizado com sucesso!');
    }
});

res.status(200).json({ status: 'Atualizado com sucesso' });

}