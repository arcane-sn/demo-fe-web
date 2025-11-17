'use client';

import React from 'react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ 
  message = "Loading...", 
  className = "min-h-screen bg-background flex items-center justify-center" 
}: LoadingStateProps) {
  return (
    <div className={className}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
  backLabel?: string;
}

export function ErrorState({ 
  title = "Something went wrong",
  message = "An error occurred while loading the data.",
  onRetry,
  onBack,
  backLabel = "Go Back"
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-destructive">{title}</h1>
        <p className="text-muted-foreground mt-2">{message}</p>
        <div className="mt-4 flex gap-2 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Try Again
            </button>
          )}
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 text-primary hover:underline"
            >
              {backLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

