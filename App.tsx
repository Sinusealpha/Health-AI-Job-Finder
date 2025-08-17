import React, { useState, useCallback } from 'react';
import { JobPosting } from './types';
import { fetchJobs } from './services/geminiService';
import SearchBar from './components/SearchBar';
import JobCard from './components/JobCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setError('Please enter a search keyword.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setJobPostings([]);
    setHasSearched(true);

    try {
      const results = await fetchJobs(keyword);
      setJobPostings(results);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch job postings. The AI may be unavailable or the search failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (!hasSearched) {
      return (
        <div className="text-center text-slate-500 dark:text-slate-400 mt-12">
          <p className="text-lg">Enter a keyword to find public jobs in the Health AI space.</p>
          <p className="text-sm mt-2">For example: "Clinical NLP", "Medical Imaging AI", "Bioinformatics"</p>
        </div>
      );
    }

    if (jobPostings.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPostings.map((job, index) => (
            <JobCard key={`${job.company}-${job.title}-${index}`} job={job} />
          ))}
        </div>
      );
    }
    
    return (
        <div className="text-center text-slate-500 dark:text-slate-400 mt-12">
            <p className="text-lg font-semibold">No results found.</p>
            <p className="text-sm mt-2">The AI couldn't find any public job postings for your query. Try a different keyword.</p>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <header className="bg-white dark:bg-slate-800 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 13.5v-7l5.25 3.5L10.5 15.5z"/>
            </svg>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Health AI Job Finder</h1>
          </div>
          <div className="w-full sm:w-auto">
            <SearchBar onSearch={handleSearch} disabled={isLoading} />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>

      <footer className="text-center py-6 mt-8 text-xs text-slate-400 dark:text-slate-500">
        <p>Powered by Google Gemini. This tool uses AI and Google Search to find recent, public job postings.</p>
        <p>Job data is sourced from public web pages and accuracy may vary.</p>
      </footer>
    </div>
  );
};

export default App;