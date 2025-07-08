import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-8 md:py-12">
      <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-blue-200 dark:border-blue-800 
                    border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
    </div>
  );
}; 