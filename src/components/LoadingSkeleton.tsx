import React from 'react';
import { motion } from 'motion/react';

export function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-40"
    >
      {/* Skeleton for enhanced prompt */}
      <div className="space-y-3">
        <div className="h-3 w-28 bg-zinc-800 rounded-full animate-pulse" />
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <div className="h-3.5 w-full bg-zinc-800 rounded-full animate-pulse" />
          <div className="h-3.5 w-11/12 bg-zinc-800 rounded-full animate-pulse" />
          <div className="h-3.5 w-4/5 bg-zinc-800 rounded-full animate-pulse" />
          <div className="h-3.5 w-full bg-zinc-800 rounded-full animate-pulse" />
          <div className="h-3.5 w-3/4 bg-zinc-800 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Skeleton for variations */}
      <div className="space-y-3">
        <div className="h-3 w-32 bg-zinc-800 rounded-full animate-pulse" />
        <div className="grid grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
              <div className="h-5 w-20 bg-zinc-800 rounded-lg animate-pulse" />
              <div className="h-3 w-full bg-zinc-800 rounded-full animate-pulse" />
              <div className="h-3 w-5/6 bg-zinc-800 rounded-full animate-pulse" />
              <div className="h-3 w-4/6 bg-zinc-800 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
