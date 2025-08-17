import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  disabled: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, disabled }) => {
  const [keyword, setKeyword] = useState('Health AI');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="e.g., 'Clinical NLP in Boston'"
        className="flex-grow w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 disabled:opacity-50"
        disabled={disabled}
      />
      <button
        type="submit"
        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed dark:focus:ring-offset-slate-800 flex items-center justify-center"
        disabled={disabled}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <span className="ml-2 hidden sm:inline">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;