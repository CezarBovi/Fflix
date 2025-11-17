import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../app/providers/AuthProvider';
import { contentService, streamingService } from '../../services/api';
import { VideoCard } from '../../components/VideoCard/VideoCard';

export const WatchPage = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { user } = useAuth();

  const { data: video, isLoading: loadingVideo } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => contentService.findById(videoId!),
    enabled: Boolean(videoId),
  });

  const {
    data: playback,
    refetch,
    isLoading: loadingStream,
    isError,
  } = useQuery({
    queryKey: ['playback', videoId],
    queryFn: () => streamingService.startPlayback(videoId!),
    enabled: Boolean(videoId && user),
  });

  useEffect(() => {
    if (user && videoId) {
      refetch();
    }
  }, [user, videoId, refetch]);

  if (!videoId) {
    return <p>Selecione um conteúdo para assistir.</p>;
  }

  if (loadingVideo) {
    return <p>Carregando vídeo...</p>;
  }

  if (!user) {
    return (
      <div className="page-stack">
        <h2>Faça login para assistir</h2>
        <p>Entre com sua conta para iniciar a sessão segura de streaming.</p>
      </div>
    );
  }

  if (!video) {
    return <p>Vídeo não encontrado.</p>;
  }

  return (
    <div className="watch-layout">
      <section className="player-panel">
        {loadingStream ? (
          <p>Preparando sessão...</p>
        ) : isError || !playback ? (
          <p>Não foi possível iniciar o streaming, tente novamente.</p>
        ) : (
          <>
            <video
              controls
              poster={`https://picsum.photos/seed/${video.id}/1200/675`}
              src={playback.streamUrl}
            />
            <div className="player-meta">
              <h1>{video.title}</h1>
              <p>{video.description}</p>
              <small>Duração aproximada: {Math.round(video.duration / 60)} min</small>
            </div>
          </>
        )}
      </section>
      <aside className="recommendations">
        <h3>Recomendações</h3>
        <RelatedVideos currentId={video.id} />
      </aside>
    </div>
  );
};

const RelatedVideos = ({ currentId }: { currentId: string }) => {
  const { data: videos = [] } = useQuery({
    queryKey: ['videos'],
    queryFn: () => contentService.list(),
  });

  return (
    <div className="section-grid">
      {videos
        .filter((video) => video.id !== currentId)
        .slice(0, 4)
        .map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
    </div>
  );
};

