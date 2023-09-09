import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleValidation = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:3001/validate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setData(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao validar o arquivo CSV.');
    }
  };

  return (
    <div className="App">
      <h1>Validação de Arquivo CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button onClick={handleValidation}>VALIDAR</button>
      {errorMessage && <p>{errorMessage}</p>}
      {data && (
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Preço Atual</th>
              <th>Novo Preço</th>
              <th>Erros</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.currentPrice}</td>
                <td>{item.newPrice}</td>
                <td>{item.errors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;