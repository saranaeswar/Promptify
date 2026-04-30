/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnimatePresence } from 'motion/react';
import { usePromptify } from './hooks/usePromptify';
import { Sidebar } from './components/Sidebar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ResultView } from './components/ResultView';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { PromptInput } from './components/PromptInput';
import { ErrorBanner } from './components/ErrorBanner';

export default function App() {
  const {
    input,
    setInput,
    loading,
    error,
    result,
    parameters,
    history,
    copied,
    setPersona,
    setFormat,
    setComplexity,
    handleEnhance,
    copyToClipboard,
    newSession,
    loadFromHistory,
  } = usePromptify();

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-200 overflow-hidden font-sans">
      <Sidebar
        parameters={parameters}
        history={history}
        onPersonaChange={setPersona}
        onFormatChange={setFormat}
        onComplexityChange={setComplexity}
        onNewSession={newSession}
        onLoadHistory={loadFromHistory}
      />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-3xl mx-auto px-6 py-10 min-h-full flex flex-col">
            {error && (
              <div className="mb-6">
                <ErrorBanner message={error} onDismiss={() => setInput(input)} />
              </div>
            )}

            <AnimatePresence mode="wait">
              {!result && !loading ? (
                <WelcomeScreen key="welcome" onExampleClick={setInput} />
              ) : loading ? (
                <LoadingSkeleton key="loading" />
              ) : result ? (
                <ResultView
                  key="result"
                  result={result}
                  input={input}
                  loading={loading}
                  copied={copied}
                  onCopy={copyToClipboard}
                  onRegenerate={handleEnhance}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <PromptInput
          value={input}
          loading={loading}
          onChange={setInput}
          onSubmit={handleEnhance}
        />
      </main>
    </div>
  );
}
