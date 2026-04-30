import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="flex items-start gap-3 bg-red-950/40 border border-red-900/50 rounded-2xl px-5 py-4 text-sm">
      <AlertTriangle size={16} className="text-red-400 mt-0.5 shrink-0" />
      <p className="text-red-300 flex-1">{message}</p>
      <button onClick={onDismiss} className="text-red-600 hover:text-red-400 transition-colors shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}
