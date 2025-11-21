import { useMemo, useState, useEffect, useRef } from 'react';
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

  // Estado para detectar se o player falhou ao carregar
  const [playerLoadError, setPlayerLoadError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimeoutRef = useRef<number | null>(null);

  // Resetar erro quando o embedSource mudar
  useEffect(() => {
    if (embedSource) {
      setPlayerLoadError(false);
    }
  }, [embedSource]);

  // Detectar erros de carregamento do iframe
  useEffect(() => {
    if (!embedSource || playerLoadError) {
      return;
    }

    // Listener global para capturar erros de recursos (como 404 no sandbox.php)
    const handleError = (event: ErrorEvent) => {
      // Verificar se o erro é relacionado ao player (sandbox.php ou streamingnow.mov)
      const errorMessage = event.message || '';
      const errorSource = (event.filename || '').toLowerCase();
      
      if (
        errorSource.includes('sandbox.php') ||
        errorSource.includes('streamingnow.mov') ||
        errorMessage.includes('sandbox') ||
        errorMessage.includes('streamingnow')
      ) {
        // Erro relacionado ao player - marcar como erro após um delay
        // para dar tempo do iframe tentar carregar outros recursos
        setTimeout(() => {
          setPlayerLoadError(true);
        }, 5000); // Aguardar 5 segundos antes de marcar como erro
      }
    };

    // Listener para erros de recursos
    window.addEventListener('error', handleError, true);

    // Timeout de segurança: se após 15 segundos não detectamos carregamento, considerar erro
    loadTimeoutRef.current = window.setTimeout(() => {
      // Se ainda não detectamos erro, verificar se o iframe está visível
      if (iframeRef.current) {
        const rect = iframeRef.current.getBoundingClientRect();
        // Se o iframe tem dimensões muito pequenas, pode não ter carregado
        if (rect.height < 100) {
          setPlayerLoadError(true);
        }
      }
    }, 15000);

    return () => {
      window.removeEventListener('error', handleError, true);
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [embedSource, playerLoadError]);

  const handleIframeLoad = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    setPlayerLoadError(false);
  };

  const handleIframeError = () => {
    setPlayerLoadError(true);
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
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
        ) : playerLoadError ? (
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
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
              Conteúdo não disponível
            </p>
            <p style={{ marginBottom: '1.5rem', opacity: 0.8, fontSize: '0.9rem' }}>
              O filme não está disponível no serviço de streaming no momento.
              <br />
              Isso pode acontecer se o conteúdo não estiver disponível no SuperEmbed.
            </p>
            <Button variant="secondary" onClick={() => {
              setPlayerLoadError(false);
              refetchEmbed();
            }}>
              Tentar novamente
            </Button>
          </div>
        ) : (
          <>
            <iframe
              ref={iframeRef}
              title={`Player ${movie.title}`}
              src={embedSource!.embedUrl}
              referrerPolicy="origin"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation allow-presentation"
              allowFullScreen
              style={{ width: '100%', minHeight: '60vh', border: 'none', borderRadius: '12px' }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
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

