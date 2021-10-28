import { useEffect, useState } from 'react';
import '../styles/repositories.scss';
import { RepositoryItem } from './RepositoryItem';

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
}

const repositoriesUrl = 'https://api.github.com/users/almeidajr/repos'

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([])

  useEffect(() => {
    fetch(repositoriesUrl)
      .then(response => response.json())
      .then(data => setRepositories(data))
  }, [])

  if (repositories.length === 0) {
    return <section className="repository-list">Obtendo dados...</section>
  }
  
  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        {repositories.map(repository => (
          <RepositoryItem key={repository.id} repository={repository} />
        ))}
      </ul>
    </section>
  )
}