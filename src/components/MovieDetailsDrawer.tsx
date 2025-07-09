import React, { useEffect } from 'react';
import { X, Star, Calendar, Clock, Users, Award, Film } from 'lucide-react';
import { MovieDetailsDrawerProps } from '../types/movie';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { LoadingSpinner } from './LoadingSpinner';

export const MovieDetailsDrawer: React.FC<MovieDetailsDrawerProps> = ({ 
  movie, 
  isOpen, 
  onClose,
  className = ""
}) => {
  const { movieDetails, isLoading, error, fetchMovieDetails } = useMovieDetails();

  useEffect(() => {
    if (isOpen && movie) {
      fetchMovieDetails(movie.imdbID);
    }
  }, [isOpen, movie, fetchMovieDetails]);

  if (!isOpen) return null;

  return (
    <>

      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      

      <div className={`fixed right-0 top-0 h-full w-full sm:w-96 lg:w-[500px] 
                      bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform
                      ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${className}`}>
        

        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Movie Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                     hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>


        <div className="h-full overflow-y-auto">
          {movie && (
            <div className="p-4">
              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0 w-24 h-36 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
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
                      <Film className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {movie.Title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{movie.Year}</span>
                    </div>
                    <span className="capitalize">{movie.Type}</span>
                  </div>
                </div>
              </div>


              {isLoading && (
                <div className="py-8">
                  <LoadingSpinner />
                </div>
              )}


              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                              rounded-lg p-4 text-center">
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}


              {movieDetails && movieDetails.Response === 'True' && (
                <div className="space-y-6">

                  {movieDetails.Plot && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Plot</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {movieDetails.Plot}
                      </p>
                    </div>
                  )}


                  {movieDetails.imdbRating && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Rating</h4>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {movieDetails.imdbRating}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">/10</span>
                        {movieDetails.imdbVotes && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({parseInt(movieDetails.imdbVotes).toLocaleString()} votes)
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {movieDetails.Runtime && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{movieDetails.Runtime}</span>
                      </div>
                    )}
                    
                    {movieDetails.Rated && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Award className="h-4 w-4" />
                        <span>{movieDetails.Rated}</span>
                      </div>
                    )}
                    
                    {movieDetails.Released && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{movieDetails.Released}</span>
                      </div>
                    )}
                    
                    {movieDetails.Genre && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Film className="h-4 w-4" />
                        <span>{movieDetails.Genre}</span>
                      </div>
                    )}
                  </div>

                  {(movieDetails.Director || movieDetails.Actors) && (
                    <div className="space-y-3">
                      {movieDetails.Director && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Director</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{movieDetails.Director}</p>
                        </div>
                      )}
                      
                      {movieDetails.Actors && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Cast</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{movieDetails.Actors}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {movieDetails.Ratings && movieDetails.Ratings.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Other Ratings</h4>
                      <div className="space-y-2">
                        {movieDetails.Ratings.map((rating, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">{rating.Source}</span>
                            <span className="font-medium text-gray-900 dark:text-white">{rating.Value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}; 