import React from 'react';
import { JobPosting } from '../types';

interface JobCardProps {
  job: JobPosting;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{job.title}</h3>
        <p className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-2">{job.company}</p>
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
          <span>{job.location}</span>
        </div>

        {job.details && job.details.length > 0 && (
          <ul className="mb-4 space-y-1.5">
            {job.details.map((detail, i) => (
              <li key={i} className="flex items-start text-xs text-slate-600 dark:text-slate-400">
                <svg className="w-3.5 h-3.5 mr-2 mt-0.5 flex-shrink-0 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
          {job.description}
        </p>
      </div>
      <div className="px-6 pb-6 mt-auto">
        <a 
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-block text-center bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-200"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default JobCard;