import React, { useState, useEffect } from 'react';
import { Film, Search } from 'lucide-react';
import { SearchInput } from './components/SearchInput';
import { MovieCard } from './components/MovieCard';
import { WatchlistPanel } from './components/WatchlistPanel';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { ThemeToggle } from './components/ThemeToggle';
import { MovieDetailsDrawer } from './components/MovieDetailsDrawer';
import { useDebounce } from './hooks/useDebounce';
import { useWatchlist } from './hooks/useWatchlist';
import { useTheme } from './hooks/useTheme';
import { searchMovies } from './utils/api';
import { Movie, AppState } from './types/movie';

const log = (level: 'info' | 'error' | 'warn', message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [App] ${message}`;
  
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

function App() {
  const [state, setState] = useState<AppState>({
    query: '',
    movies: [],
    isLoading: false,
    error: null,
    hasSearched: false,
    selectedMovie: null,
    isDrawerOpen: false
  });
  
  const debouncedQuery = useDebounce(state.query, 500);
  const { watchlist, addToWatchlist, removeFromWatchlist, reorderWatchlist, isInWatchlist } = useWatchlist();
  const theme = useTheme();

  useEffect(() => {
    log('info', 'App component mounted');
  }, []);

  useEffect(() => {
    log('info', `Debounced query changed: "${debouncedQuery}"`);
    if (debouncedQuery.trim()) {
      handleSearch(debouncedQuery);
    } else {
      log('info', 'Clearing search results - empty query');
      setState(prev => ({
        ...prev,
        movies: [],
        error: null,
        hasSearched: false
      }));
    }
  }, [debouncedQuery]);

  const handleSearch = async (searchQuery: string): Promise<void> => {
    log('info', `Starting search for: "${searchQuery}"`);
    
    if (!searchQuery.trim()) {
      log('warn', 'Search query is empty, aborting search');
      return;
    }
    
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      hasSearched: true
    }));
    
    log('info', 'Search state updated: loading=true, error=null, hasSearched=true');
    
    try {
      log('info', 'Calling searchMovies API');
      const response = await searchMovies(searchQuery);
      
      log('info', 'Search API response received:', {
        Response: response.Response,
        totalResults: response.totalResults,
        SearchCount: response.Search?.length || 0,
        Error: response.Error
      });
      
      if (response.Response === 'True') {
        const movies = response.Search?.slice(0, 10) || [];
        log('info', `Setting ${movies.length} movies in state`);
        setState(prev => ({
          ...prev,
          movies,
          isLoading: false
        }));
      } else {
        const errorMessage = response.Error || 'No movies found';
        log('warn', `API returned error: ${errorMessage}`);
        setState(prev => ({
          ...prev,
          error: errorMessage,
          movies: [],
          isLoading: false
        }));
      }
    } catch (err) {
      log('error', 'Search failed with error:', err);
      setState(prev => ({
        ...prev,
        error: 'Failed to search movies. Please try again.',
        movies: [],
        isLoading: false
      }));
    }
  };

  const handleRetry = (): void => {
    log('info', 'Retry button clicked');
    if (state.query.trim()) {
      log('info', `Retrying search with query: "${state.query}"`);
      handleSearch(state.query);
    } else {
      log('warn', 'Cannot retry - no query available');
    }
  };

  const handleSearchInput = (query: string): void => {
    log('info', `Search input changed: "${query}"`);
    setState(prev => ({ ...prev, query }));
  };

  const handleAddToWatchlist = (movie: Movie): void => {
    log('info', `Add to watchlist clicked for: "${movie.Title}"`);
    addToWatchlist(movie);
  };

  const handleRemoveFromWatchlist = (movieId: string): void => {
    log('info', `Remove from watchlist clicked for movie ID: ${movieId}`);
    removeFromWatchlist(movieId);
  };

  const handleReorderWatchlist = (newOrder: Movie[]): void => {
    log('info', `Watchlist reordered with ${newOrder.length} movies`);
    reorderWatchlist(newOrder);
  };

  const handleMovieClick = (movie: Movie): void => {
    log('info', `Movie clicked: "${movie.Title}"`);
    setState(prev => ({
      ...prev,
      selectedMovie: movie,
      isDrawerOpen: true
    }));
  };

  const handleCloseDrawer = (): void => {
    log('info', 'Closing movie details drawer');
    setState(prev => ({
      ...prev,
      isDrawerOpen: false,
      selectedMovie: null
    }));
  };

  useEffect(() => {
    log('info', 'App state updated:', {
      query: state.query,
      moviesCount: state.movies.length,
      isLoading: state.isLoading,
      error: state.error,
      hasSearched: state.hasSearched,
      isDrawerOpen: state.isDrawerOpen
    });
  }, [state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">

        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
            <div className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Film className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                         bg-clip-text text-transparent">
              Mini Movie Explorer
            </h1>
            <ThemeToggle theme={theme} className="ml-2 md:ml-4" />
          </div>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover amazing movies and build your personal watchlist.
          </p>
        </div>

        <div className="mb-6 md:mb-8">
          <SearchInput 
            onSearch={handleSearchInput}
            isLoading={state.isLoading}
            placeholder="Search for movies..."
          />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            {state.isLoading && <LoadingSpinner />}
            
            {state.error && (
              <ErrorMessage message={state.error} onRetry={handleRetry} />
            )}
            
            {!state.isLoading && !state.error && state.movies.length > 0 && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white 
                             mb-4 md:mb-6 flex items-center gap-2">
                  <Search className="h-5 w-5 md:h-6 md:w-6" />
                  Search Results ({state.movies.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {state.movies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onAddToWatchlist={handleAddToWatchlist}
                      isInWatchlist={isInWatchlist(movie.imdbID)}
                      onMovieClick={handleMovieClick}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {!state.isLoading && !state.error && state.hasSearched && state.movies.length === 0 && (
              <div className="text-center py-8 md:py-12">
                <Search className="h-12 w-12 md:h-16 md:w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No Movies Found
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  Try searching with different keywords or check your spelling.
                </p>
              </div>
            )}
            
            {!state.hasSearched && !state.isLoading && (
              <div className="text-center py-8 md:py-12">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8">
                  <Search className="h-12 w-12 md:h-16 md:w-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white mb-2">
                    Start Exploring
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Search for your favorite movies or discover new ones to add to your watchlist.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 order-1 lg:order-2">
            <WatchlistPanel 
              watchlist={watchlist}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
              onReorderWatchlist={handleReorderWatchlist}
              onMovieClick={handleMovieClick}
            />
          </div>
        </div>
      </div>

      <MovieDetailsDrawer
        movie={state.selectedMovie}
        isOpen={state.isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}

export default App;