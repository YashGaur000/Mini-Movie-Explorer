import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ErrorMessageProps } from '../types/movie';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry, 
  className = "" 
}) => {
  return (
    <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                    rounded-xl p-4 md:p-6 text-center ${className}`}>
      <AlertCircle className="h-10 w-10 md:h-12 md:w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-base md:text-lg font-medium text-red-900 dark:text-red-400 mb-2">
        Something went wrong
      </h3>
      <p className="text-sm md:text-base text-red-700 dark:text-red-300 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 
                   rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 font-medium 
                   transition-colors text-sm md:text-base"
        >
          Try Again
        </button>
      )}
    </div>
  );
}; 