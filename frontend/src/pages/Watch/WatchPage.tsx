import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '../../app/providers/AuthProvider';
import { VideoCard } from '../../components/VideoCard/VideoCard';
import { Button } from '../../shared/components/Button/Button';
import {
  metadataService,
  playerService,
  subtitleService,
} from '../../services/api';

export const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const movieId = Number(videoId);
  const isValidId = Number.isFinite(movieId);
  const { user } = useAuth();

  const {
    data: movie,
    isLoading: loadingMovie,
    isError: movieError,
  } = useQuery({
    queryKey: ['metadata', movieId],
    queryFn: () => metadataService.getMovie(movieId),
    enabled: isValidId,
  });

  const {
    data: embedSource,
    isLoading: loadingEmbed,
    isError: embedError,
    refetch: refetchEmbed,
  } = useQuery({
    queryKey: ['player', movie?.id ?? movieId, movie?.imdbId],
    queryFn: () => playerService.getEmbed(movie!.id, movie?.imdbId ?? undefined),
    enabled: Boolean(movie) && isValidId,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 300000,
  });

  const {
    data: subtitles = [],
    isLoading: loadingSubtitles,
  } = useQuery({
    queryKey: ['subtitles', movieId],
    queryFn: () => subtitleService.search({ movieId }),
    enabled: Boolean(movie),
  });

  const progressQuery = useQuery({
    queryKey: ['progress', movieId, user?.id],
    queryFn: () => playerService.getProgress(movieId),
    enabled: Boolean(user && movie),
    retry: 0,
  });

  const saveProgress = useMutation({
    mutationFn: (progress: number) =>
      playerService.saveProgress({ movieId, progress }),
    onSuccess: () => {
      progressQuery.refetch();
    },
  });

  const progressPercent = useMemo(() => {
    if (!progressQuery.data) {
      return 0;
    }
    return Math.round(progressQuery.data.progress * 100);
  }, [progressQuery.data]);

  const handleOpenPlayer = () => {
    if (embedSource?.embedUrl) {
      window.open(embedSource.embedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!videoId || !isValidId) {
    return <p>Selecione um conteúdo válido para assistir.</p>;
  }

  if (loadingMovie) {
    return <p>Carregando informações do título...</p>;
  }

  if (movieError || !movie) {
    return <p>Não encontramos esse título nos metadados.</p>;
  }

  if (!user) {
    return (
      <div className="page-stack">
        <h2>Faça login para assistir</h2>
        <p>Entre com sua conta para iniciar a sessão segura de streaming.</p>
      </div>
    );
  }

  return (
    <div className="watch-layout">
      <section className="player-panel">
        {loadingEmbed ? (
          <p>Preparando player seguro...</p>
        ) : embedError || !embedSource ? (
          <div>
            <p>Não foi possível gerar o embed do player.</p>
            <Button variant="secondary" onClick={() => refetchEmbed()}>
              Tentar novamente
            </Button>
          </div>
        ) : (
          <>
            <div
              style={{
                width: '100%',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '12px',
                padding: '3rem 2rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: '#ff4d6d', marginBottom: '1rem' }}
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                  Assistir {movie.title}
                </h2>
                <p style={{ opacity: 0.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Clique no botão abaixo para abrir o player em uma nova aba
                </p>
              </div>
              <Button
                onClick={handleOpenPlayer}
                style={{
                  padding: '1rem 2.5rem',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                ▶ Abrir Player
              </Button>
              {embedSource.quality && (
                <p style={{ marginTop: '1rem', opacity: 0.6, fontSize: '0.85rem' }}>
                  Qualidade: {embedSource.quality}
                </p>
              )}
            </div>
            <div className="player-meta">
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>
              <small>
                Lançamento:{' '}
                {movie.releaseDate
                  ? new Date(movie.releaseDate).toLocaleDateString('pt-BR')
                  : 'Indisponível'}{' '}
                • Nota TMDb: {movie.voteAverage.toFixed(1)}
              </small>
              <div className="player-actions">
                <Button
                  onClick={() => saveProgress.mutate(1)}
                  disabled={saveProgress.isPending}
                >
                  Marcar como concluído
                </Button>
                <span>Progresso: {progressPercent}%</span>
              </div>
            </div>
          </>
        )}
        <section className="subtitles">
          <h3>Legendas PT-BR</h3>
          {loadingSubtitles ? (
            <p>Buscando legendas...</p>
          ) : subtitles.length ? (
            <ul>
              {subtitles.map((subtitle) => (
                <li key={subtitle.id}>
                  <span>
                    {subtitle.format.toUpperCase()} •{' '}
                    {subtitle.isHighQuality ? 'Alta qualidade' : 'Disponível'} •{' '}
                    {subtitle.downloadCount} downloads
                  </span>
                  <a
                    href={subtitleService.getDownloadUrl(subtitle.fileId)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Baixar
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma legenda em PT-BR encontrada.</p>
          )}
        </section>
      </section>
      <aside className="recommendations">
        <h3>Recomendações</h3>
        <Recommendations movieId={movieId} />
      </aside>
    </div>
  );
};

const Recommendations = ({ movieId }: { movieId: number }) => {
  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: ['recommendations', movieId],
    queryFn: () => metadataService.getRecommendations(movieId),
    enabled: Boolean(movieId),
  });

  if (isLoading) {
    return <p>Carregando recomendações...</p>;
  }

  if (!recommendations.length) {
    return <p>Nenhum título relacionado no momento.</p>;
  }

  return (
    <div className="section-grid">
      {recommendations.slice(0, 4).map((recommendation) => (
        <VideoCard
          key={recommendation.id}
          video={{
            id: recommendation.id,
            title: recommendation.title,
            description: recommendation.overview,
            posterUrl: recommendation.posterUrl ?? undefined,
          }}
          subtitle={recommendation.isHighRated ? 'Alta avaliação' : undefined}
        />
      ))}
    </div>
  );
};

