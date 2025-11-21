import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { metadataService } from '../../services/api/metadataService';
import { VideoCard } from '../../components/VideoCard/VideoCard';

export const CatalogPage = () => {
  const [query, setQuery] = useState('');
  const { data: movies = [], isFetching } = useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: () => (query ? metadataService.search(query) : metadataService.getTrending()),
    enabled: true,
  });

  return (
    <div className="page-stack">
      <header className="catalog-header">
        <div>
          <h1>Catálogo</h1>
          <p>Busca em tempo real no TMDb.</p>
        </div>
        <input
          className="search-input"
          placeholder="Buscar filmes (ex: Inception, Matrix)"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </header>
      {isFetching ? <p>Carregando conteúdo...</p> : null}
      <div className="catalog-grid">
        {movies.map((movie) => (
          <VideoCard key={movie.id} video={movie} />
        ))}
        {!movies.length && !isFetching ? (
          <p>{query ? 'Nenhum filme encontrado. Tente outra busca.' : 'Digite um termo para buscar filmes.'}</p>
        ) : null}
      </div>
    </div>
  );
};

