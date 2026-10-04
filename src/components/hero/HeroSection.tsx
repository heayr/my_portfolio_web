'use client';

import React, { useRef } from 'react';
import { TelemetryHUD } from './TelemetryHUD';
import { NarrativeCards } from './NarrativeCards';
import { MorphingWordmark } from './MorphingWordmark';
import { FrameScrubberCanvas } from './FrameScrubberCanvas';
import { useHeroPlayback } from '../../hooks/useHeroPlayback';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

interface HeroSectionProps {
  onScrollProgress?: (progress: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { height: windowHeight } = useWindowDimensions();

  const {
    stage,
    dockProgress,
    videoProgress,
    activeAct,
    handleSelectAct,
    handleAdvance,
    handleSkip,
    handleReplay,
    handleResetToInitial,
  } = useHeroPlayback({ onScrollProgress });

  const isNarrativeVisible = stage === 'playing' || stage === 'completed' || videoProgress > 0.04;

  return (
    <>
      <MorphingWordmark
        dockProgress={dockProgress}
        windowHeight={windowHeight || 800}
        onReset={handleResetToInitial}
      />

      <section
        ref={containerRef}
        id="hero"
        aria-label="Interactive Hero Journey"
        className="scrollytelling-container relative w-full h-screen bg-[#040406]"
      >
        <div className="scrollytelling-stage relative w-full h-screen overflow-hidden flex items-center justify-center">
          <div className="stage-gradient-top opacity-40" aria-hidden="true" />

          <FrameScrubberCanvas progress={videoProgress} frameCount={55} />

          <TelemetryHUD
            activeAct={activeAct}
            progress={videoProgress}
            visible={true}
            stage={stage}
            onSelectAct={handleSelectAct}
            onAdvance={handleAdvance}
            onSkip={handleSkip}
            onReplay={handleReplay}
          />

          <NarrativeCards activeAct={activeAct} visible={isNarrativeVisible} />
        </div>
      </section>
    </>
  );
};
