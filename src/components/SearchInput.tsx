import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { SearchInputProps } from '../types/movie';

export const SearchInput: React.FC<SearchInputProps> = ({ 
  onSearch, 
  isLoading = false, 
  placeholder = "Search for movies...",
  className = ""
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
          isLoading ? 'text-blue-500 animate-pulse' : 'text-gray-400 dark:text-gray-500'
        }`} />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 md:py-4 text-base md:text-lg border border-gray-200 
                   dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                   shadow-sm transition-colors"
          disabled={isLoading}
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                     hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 
                     transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  );
}; 