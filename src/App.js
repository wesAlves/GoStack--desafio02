import React, { useState, useEffect } from "react";
import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
  // const [updateRepository, setUpadateRepository] = useState([]);


  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/Rocketseat/umbriel",
      title: "WEs desafio 01",
      techs: ["Node", "Express", "TypeScript"],
    });
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
const repositoryIndex = repositories.findIndex(repository => repository.id === id);

if (repositoryIndex >= 0){
  const updateRepositoryList = [...repositories];
  updateRepositoryList.splice(repositoryIndex, 1);
  setRepositories(updateRepositoryList);
  await api.delete(`repositories/${id}`);
}
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
