import { Movie } from '../types/movie';

// Local Storage Configuration
const WATCHLIST_KEY = 'movie-watchlist';

// Logger utility
const log = (level: 'info' | 'error' | 'warn', message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [LocalStorage] ${message}`;
  
  switch (level) {
    case 'info':
      console.log(logMessage, data || '');
      break;
    case 'error':
      console.error(logMessage, data || '');
      break;
    case 'warn':
      console.warn(logMessage, data || '');
      break;
  }
};

// Local Storage Functions
export const saveWatchlist = (watchlist: Movie[]): void => {
  log('info', `Saving watchlist with ${watchlist.length} movies`);
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    log('info', 'Watchlist saved successfully');
  } catch (error) {
    log('error', 'Error saving watchlist to localStorage:', error);
  }
};

export const loadWatchlist = (): Movie[] => {
  log('info', 'Loading watchlist from localStorage');
  try {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    const watchlist = stored ? JSON.parse(stored) : [];
    log('info', `Loaded ${watchlist.length} movies from localStorage`);
    return watchlist;
  } catch (error) {
    log('error', 'Error loading watchlist from localStorage:', error);
    return [];
  }
};

export const isMovieInWatchlist = (watchlist: Movie[], movieId: string): boolean => {
  const isInWatchlist = watchlist.some(movie => movie.imdbID === movieId);
  log('info', `Checking if movie ${movieId} is in watchlist: ${isInWatchlist}`);
  return isInWatchlist;
};

export const addToWatchlist = (watchlist: Movie[], movie: Movie): Movie[] => {
  if (isMovieInWatchlist(watchlist, movie.imdbID)) {
    log('warn', `Movie ${movie.Title} (${movie.imdbID}) is already in watchlist`);
    return watchlist;
  }
  
  const updatedWatchlist = [...watchlist, movie];
  log('info', `Added movie "${movie.Title}" (${movie.imdbID}) to watchlist`);
  return updatedWatchlist;
};

export const removeFromWatchlist = (watchlist: Movie[], movieId: string): Movie[] => {
  const movie = watchlist.find(m => m.imdbID === movieId);
  const updatedWatchlist = watchlist.filter(movie => movie.imdbID !== movieId);
  log('info', `Removed movie "${movie?.Title || movieId}" (${movieId}) from watchlist`);
  return updatedWatchlist;
}; 