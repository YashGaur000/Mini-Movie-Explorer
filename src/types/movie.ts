export interface OMDbResponse {
  Response: 'True' | 'False';
  Search?: Movie[];
  totalResults?: string;
  Error?: string;
}

export interface OMDbDetailsResponse {
  Response: 'True' | 'False';
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Poster?: string;
  Ratings?: Rating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Error?: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}

export interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist: (movie: Movie) => void;
  isInWatchlist: boolean;
  onMovieClick: (movie: Movie) => void;
  className?: string;
}

export interface WatchlistPanelProps {
  watchlist: Movie[];
  onRemoveFromWatchlist: (movieId: string) => void;
  onReorderWatchlist: (newOrder: Movie[]) => void;
  onMovieClick: (movie: Movie) => void;
  className?: string;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export interface MovieDetailsDrawerProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export interface UseWatchlistReturn {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: string) => void;
  reorderWatchlist: (newOrder: Movie[]) => void;
  isInWatchlist: (movieId: string) => boolean;
  clearWatchlist: () => void;
}

export interface UseThemeReturn {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface UseMovieDetailsReturn {
  movieDetails: OMDbDetailsResponse | null;
  isLoading: boolean;
  error: string | null;
  fetchMovieDetails: (imdbId: string) => Promise<void>;
}

export interface AppState {
  query: string;
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  noResults: boolean;
  selectedMovie: Movie | null;
  isDrawerOpen: boolean;
}