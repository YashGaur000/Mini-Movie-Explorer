import React from 'react';
import { Plus, Check, Calendar, Film } from 'lucide-react';
import { MovieCardProps } from '../types/movie';

export const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  onAddToWatchlist, 
  isInWatchlist,
  onMovieClick,
  className = ""
}) => {
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : null;

  const handleCardClick = (e: React.MouseEvent) => {

    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onMovieClick(movie);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (!isInWatchlist) {
      onAddToWatchlist(movie);
    }
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg 
                  transition-all duration-300 overflow-hidden cursor-pointer
                  hover:scale-[1.02] ${className}`}
      onClick={handleCardClick}
    >

      <div className="relative aspect-[2/3] bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {posterUrl ? (
          <img 
            src={posterUrl} 
            alt={`${movie.Title} poster`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Film className="h-12 w-12 md:h-16 md:w-16 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        

        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 
                      transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 
                        bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Click for details
            </span>
          </div>
        </div>
      </div>
      

      <div className="p-3 md:p-4">
        <h3 className="font-semibold text-base md:text-lg text-gray-900 dark:text-white 
                     mb-2 line-clamp-2 leading-tight">
          {movie.Title}
        </h3>
        
        <div className="flex items-center gap-2 mb-3 md:mb-4 text-xs md:text-sm 
                     text-gray-600 dark:text-gray-400">
          <Calendar className="h-3 w-3 md:h-4 md:w-4" />
          <span>{movie.Year}</span>
          <span className="text-gray-400 dark:text-gray-500">•</span>
          <span className="capitalize">{movie.Type}</span>
        </div>
        
        <button
          onClick={handleAddClick}
          disabled={isInWatchlist}
          className={`w-full py-2 md:py-2.5 px-3 md:px-4 rounded-lg font-medium 
                     transition-colors flex items-center justify-center gap-2 text-sm md:text-base ${
            isInWatchlist 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' 
              : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30'
          }`}
        >
          {isInWatchlist ? (
            <>
              <Check className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">In Watchlist</span>
              <span className="sm:hidden">Added</span>
            </>
          ) : (
            <>
              <Plus className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Add to Watchlist</span>
              <span className="sm:hidden">Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}; 