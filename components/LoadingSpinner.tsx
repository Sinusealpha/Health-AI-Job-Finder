
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-12">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
      <p className="text-slate-600 dark:text-slate-300 mt-4 text-lg font-semibold">Searching for jobs...</p>
      <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">The AI is searching the web for relevant jobs. Please wait a moment.</p>
    </div>
  );
};

export default LoadingSpinner;