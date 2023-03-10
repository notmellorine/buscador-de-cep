import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import './services/API';
import api from './services/API';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch(){
    
    if (input === ''){
      alert("Preencha algum CEP.")
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    }catch{
      alert("Algo deu errado e não foi possível localizar o CEP inserido.");
      setInput("")
    }
  }

  return (
    <div className="container">
        <h1 className="title">Buscador de CEP</h1>
        <div className="containerInput">
          <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          />
          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color="#FFF"/>
          </button>
        </div>
        {Object.keys(cep).length > 0 && (
          <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
        )} {/*fazer a área com as informações aparecer só quando for solicitado*/}
    </div>
  );
}

export default App;
