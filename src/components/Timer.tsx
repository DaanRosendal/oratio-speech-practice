import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { TimerState } from '../types';

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
    setState(prev => ({ ...prev, duration: duration * 60, timeRemaining: duration * 60 }));
  }, [duration]);

  useEffect(() => {
    let interval: number;
    
    if (state.isRunning && state.timeRemaining > 0) {
      interval = setInterval(() => {
        setState(prev => {
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
    if (state.timeRemaining <= 0) return 'bg-red-600';
    if (state.timeRemaining <= 30) return 'bg-orange-600';
    if (state.timeRemaining <= 60) return 'bg-green-600';
    return 'bg-gray-700';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-8"
    >
      <div className="relative w-48 h-48">
        <motion.div
          className={`absolute inset-0 rounded-full ${getTimerColor()} transition-colors duration-1000`}
          style={{
            background: `conic-gradient(${getTimerColor()} ${(state.timeRemaining / state.duration) * 100}%, transparent 0)`,
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
                className="text-4xl font-bold"
              >
                {formatTime(state.timeRemaining)}
              </motion.span>
            ) : (
              <motion.div
                key="indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-4 h-4 rounded-full bg-white"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setState(prev => ({ ...prev, isRunning: !prev.isRunning }))}
          className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-700"
        >
          {state.isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setState(prev => ({ ...prev, timeRemaining: prev.duration, isRunning: false }))}
          className="p-3 bg-gray-700 rounded-full text-white hover:bg-gray-600"
        >
          <RotateCcw className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setState(prev => ({ ...prev, showNumbers: !prev.showNumbers }))}
          className="p-3 bg-gray-700 rounded-full text-white hover:bg-gray-600"
        >
          {state.showNumbers ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
        </motion.button>
      </div>
    </motion.div>
  );
}