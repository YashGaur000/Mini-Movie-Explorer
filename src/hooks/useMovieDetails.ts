import { useState } from 'react';
import { OMDbDetailsResponse, UseMovieDetailsReturn } from '../types/movie';
import { getMovieDetails } from '../utils/api';

// Logger utility
const log = (level: 'info' | 'error' | 'warn', message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [MovieDetails] ${message}`;
  
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

export const useMovieDetails = (): UseMovieDetailsReturn => {
  const [movieDetails, setMovieDetails] = useState<OMDbDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetails = async (imdbId: string): Promise<void> => {
    log('info', `Fetching details for movie: ${imdbId}`);
    
    setIsLoading(true);
    setError(null);
    
    try {
      const details = await getMovieDetails(imdbId);
      setMovieDetails(details);
      log('info', `Successfully fetched details for: ${details.Title}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch movie details';
      setError(errorMessage);
      log('error', `Error fetching movie details: ${errorMessage}`, err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    movieDetails,
    isLoading,
    error,
    fetchMovieDetails
  };
}; 