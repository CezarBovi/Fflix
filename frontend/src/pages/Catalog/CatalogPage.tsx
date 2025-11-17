import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../../services/api/contentService';
import { VideoCard } from '../../components/VideoCard/VideoCard';

export const CatalogPage = () => {
  const [query, setQuery] = useState('');
  const { data: videos = [], isFetching } = useQuery({
    queryKey: ['videos', query],
    queryFn: () => contentService.list(query || undefined),
  });

  return (
    <div className="page-stack">
      <header className="catalog-header">
        <div>
          <h1>Catálogo</h1>
          <p>Busca em tempo real no Content Service.</p>
        </div>
        <input
          className="search-input"
          placeholder="Buscar por título ou categoria"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </header>
      {isFetching ? <p>Carregando conteúdo...</p> : null}
      <div className="catalog-grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
        {!videos.length && !isFetching ? <p>Nenhum conteúdo encontrado.</p> : null}
      </div>
    </div>
  );
};

