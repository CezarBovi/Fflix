import { Link } from 'react-router-dom';
import type { Video } from '../../shared/types';

const getThumbnail = (id: string) => `https://picsum.photos/seed/${id}/600/340`;

type VideoCardProps = {
  video: Video;
  subtitle?: string;
};

export const VideoCard = ({ video, subtitle }: VideoCardProps) => (
  <Link to={`/watch/${video.id}`} className="video-card">
    <img src={getThumbnail(video.id)} alt={video.title} loading="lazy" />
    <div className="video-card_content">
      <strong>{video.title}</strong>
      <p>{video.description}</p>
      {subtitle ? <small>{subtitle}</small> : null}
    </div>
  </Link>
);

