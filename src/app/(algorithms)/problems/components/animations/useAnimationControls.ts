"use client";

import { useState, useCallback, useRef } from "react";

export interface AnimationState {
  isPlaying: boolean;
  isPaused: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number; // ms per step
}

export interface AnimationControls {
  state: AnimationState;
  play: () => void;
  pause: () => void;
  reset: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  setSpeed: (speed: number) => void;
}

export function useAnimationControls(
  totalSteps: number,
  onStepChange?: (step: number) => void
): AnimationControls {
  const [state, setState] = useState<AnimationState>({
    isPlaying: false,
    isPaused: false,
    currentStep: 0,
    totalSteps,
    speed: 500,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearAnimationInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    clearAnimationInterval();
    setState((prev) => ({ ...prev, isPlaying: true, isPaused: false }));

    intervalRef.current = setInterval(() => {
      setState((prev) => {
        const nextStep = prev.currentStep + 1;
        if (nextStep >= prev.totalSteps) {
          clearAnimationInterval();
          return { ...prev, isPlaying: false, currentStep: prev.totalSteps - 1 };
        }
        onStepChange?.(nextStep);
        return { ...prev, currentStep: nextStep };
      });
    }, state.speed);
  }, [state.speed, onStepChange, clearAnimationInterval]);

  const pause = useCallback(() => {
    clearAnimationInterval();
    setState((prev) => ({ ...prev, isPlaying: false, isPaused: true }));
  }, [clearAnimationInterval]);

  const reset = useCallback(() => {
    clearAnimationInterval();
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      currentStep: 0,
    }));
    onStepChange?.(0);
  }, [clearAnimationInterval, onStepChange]);

  const nextStep = useCallback(() => {
    setState((prev) => {
      const next = Math.min(prev.currentStep + 1, prev.totalSteps - 1);
      onStepChange?.(next);
      return { ...prev, currentStep: next };
    });
  }, [onStepChange]);

  const prevStep = useCallback(() => {
    setState((prev) => {
      const prev_step = Math.max(prev.currentStep - 1, 0);
      onStepChange?.(prev_step);
      return { ...prev, currentStep: prev_step };
    });
  }, [onStepChange]);

  const setStep = useCallback(
    (step: number) => {
      setState((prev) => {
        const newStep = Math.max(0, Math.min(step, prev.totalSteps - 1));
        onStepChange?.(newStep);
        return { ...prev, currentStep: newStep };
      });
    },
    [onStepChange]
  );

  const setSpeed = useCallback((speed: number) => {
    setState((prev) => ({ ...prev, speed }));
  }, []);

  return {
    state,
    play,
    pause,
    reset,
    nextStep,
    prevStep,
    setStep,
    setSpeed,
  };
}
