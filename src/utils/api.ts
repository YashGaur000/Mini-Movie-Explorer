import { OMDbResponse, OMDbDetailsResponse } from '../types/movie';

const log = (level: 'info' | 'error' | 'warn', message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [API] ${message}`;
  
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

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

if (!API_KEY) {
  log('error', 'OMDb API key is missing. Please set VITE_OMDB_API_KEY in your .env file');
  throw new Error('OMDb API key is missing. Please set VITE_OMDB_API_KEY in your .env file');
}

export const searchMovies = async (query: string): Promise<OMDbResponse> => {
  log('info', `Searching movies with query: "${query}"`);
  
  if (!query.trim()) {
    log('warn', 'Search query is empty');
    throw new Error('Search query cannot be empty');
  }

  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`;
    log('info', `Making API request to: ${url.replace(API_KEY, '[API_KEY]')}`);
    
    const response = await fetch(url);
    log('info', `API response status: ${response.status}`);
    
    if (!response.ok) {
      log('error', `API request failed with status: ${response.status}`);
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data: OMDbResponse = await response.json();
    log('info', 'API response received:', {
      Response: data.Response,
      totalResults: data.totalResults,
      SearchCount: data.Search?.length || 0,
      Error: data.Error
    });
    
    if (data.Response === 'False') {
      log('warn', `API returned error: ${data.Error}`);
    }
    
    return data;
  } catch (error) {
    log('error', 'Search movies failed:', error);
    throw error;
  }
};

export const getMovieDetails = async (imdbId: string): Promise<OMDbDetailsResponse> => {
  log('info', `Fetching movie details for IMDb ID: ${imdbId}`);
  
  if (!imdbId.trim()) {
    log('warn', 'IMDb ID is empty');
    throw new Error('IMDb ID cannot be empty');
  }

  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbId)}&plot=full`;
    log('info', `Making API request to: ${url.replace(API_KEY, '[API_KEY]')}`);
    
    const response = await fetch(url);
    log('info', `API response status: ${response.status}`);
    
    if (!response.ok) {
      log('error', `API request failed with status: ${response.status}`);
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data: OMDbDetailsResponse = await response.json();
    log('info', 'Movie details API response received:', {
      Response: data.Response,
      Title: data.Title,
      Year: data.Year,
      Error: data.Error
    });
    
    if (data.Response === 'False') {
      log('warn', `API returned error: ${data.Error}`);
      throw new Error(data.Error || 'Failed to fetch movie details');
    }
    
    return data;
  } catch (error) {
    log('error', 'Get movie details failed:', error);
    throw error;
  }
}; 