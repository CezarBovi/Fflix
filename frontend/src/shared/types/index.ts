export type Video = {
  id: string;
  title: string;
  description: string;
  categories: string[];
  status: 'draft' | 'processing' | 'published';
  duration: number;
  formats: string[];
};

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  roles: string[];
  preferences: Record<string, unknown>;
  history: Array<{ videoId: string; watchedAt: string; progress: number }>;
};

export type PlaybackSession = {
  id: string;
  videoId: string;
  userId: string;
  manifestUrl: string;
  licenseUrl: string;
  streamUrl: string;
  lastHeartbeat: string;
};

