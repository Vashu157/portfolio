import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
        <p className="mt-4 text-slate-300 text-lg">Loading portfolio...</p>
      </div>
    </div>
  );
};

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
      <div className="bg-slate-800 border border-red-700 rounded-xl p-8 max-w-md w-full text-center animate-fade-in">
        <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
        <p className="text-red-300 mb-6">{message || 'Failed to load portfolio data'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export { LoadingSpinner, ErrorMessage };
