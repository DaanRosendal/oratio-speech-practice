import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Eye, EyeOff } from "lucide-react";
import { TimerState } from "../types";

interface TimerProps {
  duration: number;
  isActive: boolean;
  onComplete: () => void;
}

export function Timer({ duration, isActive, onComplete }: TimerProps) {
  const [state, setState] = useState<TimerState>({
    duration: duration * 60,
    isRunning: false,
    timeRemaining: duration * 60,
    showNumbers: true,
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      duration: duration * 60,
      timeRemaining: duration * 60,
    }));
  }, [duration]);

  useEffect(() => {
    let interval: number;

    if (state.isRunning && state.timeRemaining > 0) {
      interval = setInterval(() => {
        setState((prev) => {
          const newTime = prev.timeRemaining - 1;
          if (newTime <= 0) {
            clearInterval(interval);
            onComplete();
          }
          return { ...prev, timeRemaining: newTime };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.isRunning, state.timeRemaining, onComplete]);

  const getTimerColor = () => {
    if (state.timeRemaining <= 0) return "bg-red-600";
    if (state.timeRemaining <= 30) return "bg-orange-600";
    if (state.timeRemaining <= 60) return "bg-green-600";
    return "bg-gray-700";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-8"
    >
      <div className="relative w-80 h-80">
        <motion.div
          className={`absolute inset-0 rounded-full ${getTimerColor()} transition-colors duration-1000`}
          style={{
            background: `conic-gradient(${getTimerColor()} ${
              (state.timeRemaining / state.duration) * 100
            }%, transparent 0)`,
          }}
        />
        <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {state.showNumbers ? (
              <motion.span
                key="time"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-7xl font-bold"
              >
                {formatTime(state.timeRemaining)}
              </motion.span>
            ) : (
              <motion.div
                key="indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-8 h-8 rounded-full bg-white"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            setState((prev) => ({ ...prev, isRunning: !prev.isRunning }))
          }
          className="p-4 bg-indigo-600 rounded-full text-white hover:bg-indigo-700"
        >
          {state.isRunning ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            setState((prev) => ({
              ...prev,
              timeRemaining: prev.duration,
              isRunning: false,
            }))
          }
          className="p-4 bg-gray-700 rounded-full text-white hover:bg-gray-600"
        >
          <RotateCcw className="w-8 h-8" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            setState((prev) => ({ ...prev, showNumbers: !prev.showNumbers }))
          }
          className="p-4 bg-gray-700 rounded-full text-white hover:bg-gray-600"
        >
          {state.showNumbers ? (
            <EyeOff className="w-8 h-8" />
          ) : (
            <Eye className="w-8 h-8" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
