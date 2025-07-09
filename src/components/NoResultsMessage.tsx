import React from 'react';
import { Search, Film } from 'lucide-react';

interface NoResultsMessageProps {
  query: string;
  onRetry?: () => void;
  className?: string;
}

export const NoResultsMessage: React.FC<NoResultsMessageProps> = ({ 
  query, 
  onRetry, 
  className = "" 
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 text-center ${className}`}>
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
          <Search className="h-8 w-8 md:h-10 md:w-10 text-blue-500" />
        </div>
      </div>
      
      <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white mb-3">
        No movies found for "{query}"
      </h3>
      
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        We couldn't find any movies matching your search. Try different keywords, check your spelling, or search for a more general term.
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
          <Film className="h-4 w-4" />
          <span>Try searching for: "action", "comedy", "drama", or a specific movie title</span>
        </div>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                     rounded-lg hover:from-blue-600 hover:to-purple-700 font-medium 
                     transition-all duration-200 text-sm md:text-base shadow-sm hover:shadow-md"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}; 