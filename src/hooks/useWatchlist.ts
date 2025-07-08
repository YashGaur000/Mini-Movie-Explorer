import { useState, useEffect } from 'react';
import { Movie, UseWatchlistReturn } from '../types/movie';
import { 
  loadWatchlist, 
  saveWatchlist, 
  addToWatchlist as addToWatchlistUtil,
  removeFromWatchlist as removeFromWatchlistUtil,
  isMovieInWatchlist
} from '../utils/localStorage';

// Logger utility
const log = (level: 'info' | 'error' | 'warn', message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [Watchlist] ${message}`;
  
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

export const useWatchlist = (): UseWatchlistReturn => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    log('info', 'Initializing watchlist hook');
    const savedWatchlist = loadWatchlist();
    setWatchlist(savedWatchlist);
    log('info', `Watchlist initialized with ${savedWatchlist.length} movies`);
  }, []);

  const addToWatchlist = (movie: Movie): void => {
    log('info', `Adding movie to watchlist: "${movie.Title}" (${movie.imdbID})`);
    const updatedWatchlist = addToWatchlistUtil(watchlist, movie);
    setWatchlist(updatedWatchlist);
    saveWatchlist(updatedWatchlist);
    log('info', `Watchlist updated, now contains ${updatedWatchlist.length} movies`);
  };

  const removeFromWatchlist = (movieId: string): void => {
    log('info', `Removing movie from watchlist: ${movieId}`);
    const updatedWatchlist = removeFromWatchlistUtil(watchlist, movieId);
    setWatchlist(updatedWatchlist);
    saveWatchlist(updatedWatchlist);
    log('info', `Watchlist updated, now contains ${updatedWatchlist.length} movies`);
  };

  const reorderWatchlist = (newOrder: Movie[]): void => {
    log('info', `Reordering watchlist with ${newOrder.length} movies`);
    setWatchlist(newOrder);
    saveWatchlist(newOrder);
    log('info', 'Watchlist reordered and saved');
  };

  const isInWatchlist = (movieId: string): boolean => {
    const result = isMovieInWatchlist(watchlist, movieId);
    log('info', `Checking if movie ${movieId} is in watchlist: ${result}`);
    return result;
  };

  const clearWatchlist = (): void => {
    log('info', 'Clearing entire watchlist');
    setWatchlist([]);
    saveWatchlist([]);
    log('info', 'Watchlist cleared successfully');
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    reorderWatchlist,
    isInWatchlist,
    clearWatchlist
  };
}; 