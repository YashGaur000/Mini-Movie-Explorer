import React from 'react';
import { Trash2, Heart, Film, ChevronUp, ChevronDown } from 'lucide-react';
import { WatchlistPanelProps } from '../types/movie';

export const WatchlistPanel: React.FC<WatchlistPanelProps> = ({ 
  watchlist, 
  onRemoveFromWatchlist,
  onReorderWatchlist,
  onMovieClick,
  className = ""
}) => {
  const moveMovie = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= watchlist.length) return;
    
    const newOrder = [...watchlist];
    const [movedMovie] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedMovie);
    onReorderWatchlist(newOrder);
  };

  if (watchlist.length === 0) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 
                      text-center ${className}`}>
        <Heart className="h-10 w-10 md:h-12 md:w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-2">
          Your Watchlist is Empty
        </h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Start searching for movies and add them to your watchlist.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6 ${className}`}>
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <Heart className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
          My Watchlist ({watchlist.length})
        </h2>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        {watchlist.map((movie, index) => (
          <div key={movie.imdbID} className="group relative">
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg 
                          border border-gray-100 dark:border-gray-700 hover:border-gray-200 
                          dark:hover:border-gray-600 transition-colors">
              {/* Poster */}
              <div 
                className="flex-shrink-0 w-12 h-16 md:w-16 md:h-24 bg-gray-100 dark:bg-gray-700 
                          rounded-lg overflow-hidden cursor-pointer"
                onClick={() => onMovieClick(movie)}
              >
                {movie.Poster !== 'N/A' ? (
                  <img 
                    src={movie.Poster} 
                    alt={`${movie.Title} poster`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Film className="h-4 w-4 md:h-6 md:w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </div>
              
              {/* Movie Info */}
              <div 
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => onMovieClick(movie)}
              >
                <h3 className="font-medium text-sm md:text-base text-gray-900 dark:text-white truncate 
                              hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {movie.Title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {movie.Year}
                </p>
              </div>
              
              {/* Reorder Controls */}
              <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => moveMovie(index, index - 1)}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                           disabled:text-gray-200 dark:disabled:text-gray-700 disabled:cursor-not-allowed
                           hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  aria-label="Move up"
                >
                  <ChevronUp className="h-3 w-3" />
                </button>
                <button
                  onClick={() => moveMovie(index, index + 1)}
                  disabled={index === watchlist.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                           disabled:text-gray-200 dark:disabled:text-gray-700 disabled:cursor-not-allowed
                           hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  aria-label="Move down"
                >
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>
              
              {/* Remove Button */}
              <button
                onClick={() => onRemoveFromWatchlist(movie.imdbID)}
                className="flex-shrink-0 p-1.5 md:p-2 text-gray-400 hover:text-red-500 
                         hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                aria-label={`Remove ${movie.Title} from watchlist`}
              >
                <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 