import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { SpeechSelector } from './components/SpeechSelector';
import { TopicGenerator } from './components/TopicGenerator';
import { Timer } from './components/Timer';
import { SpeechType, Topic } from './types';

function App() {
  const [speechType, setSpeechType] = useState<SpeechType | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isInProgress, setIsInProgress] = useState(false);
  const [showTopicGenerator, setShowTopicGenerator] = useState(false);

  const handleSpeechSelect = (type: SpeechType) => {
    setSpeechType(type);
    setShowTopicGenerator(type === 'impromptu');
    setSelectedTopic(null);
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setShowTopicGenerator(false);
  };

  const handleTimerComplete = () => {
    setIsInProgress(false);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const getDuration = () => {
    switch (speechType) {
      case 'impromptu': return 2.5;
      case 'prepared': return 7;
      case 'evaluative': return 2.5;
      default: return 2.5;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleFullscreen}
        className="fixed top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
      >
        <Maximize2 className="w-5 h-5" />
      </motion.button>

      <div className="max-w-4xl mx-auto space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Oratio
        </motion.h1>

        <AnimatePresence mode="wait">
          {!isInProgress && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <SpeechSelector
                selectedType={speechType}
                onSelect={handleSpeechSelect}
              />

              <TopicGenerator
                isOpen={showTopicGenerator}
                onSelectTopic={handleTopicSelect}
              />

              {selectedTopic && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-4"
                >
                  <h2 className="text-xl font-semibold">Selected Topic</h2>
                  <p className="text-gray-300">{selectedTopic.text}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsInProgress(true)}
                    className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Start Speech
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isInProgress && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-8"
            >
              {selectedTopic && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <p className="text-gray-400 text-sm">Current Topic</p>
                  <p className="text-xl">{selectedTopic.text}</p>
                </motion.div>
              )}

              <Timer
                duration={getDuration()}
                isActive={isInProgress}
                onComplete={handleTimerComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;