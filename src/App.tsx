import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, ArrowLeft } from "lucide-react";
import { SpeechSelector } from "./components/SpeechSelector";
import { TopicGenerator } from "./components/TopicGenerator";
import { Timer } from "./components/Timer";
import { SpeechType, Topic } from "./types";

function App() {
  const [speechType, setSpeechType] = useState<SpeechType | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isInProgress, setIsInProgress] = useState(false);
  const [showTopicGenerator, setShowTopicGenerator] = useState(false);

  const handleSpeechSelect = (type: SpeechType) => {
    setSpeechType(type);
    setShowTopicGenerator(type === "impromptu");
    setSelectedTopic(null);
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setShowTopicGenerator(false);
  };

  const handleBackToSelection = () => {
    setIsInProgress(false);
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
      case "impromptu":
        return 2.5;
      case "prepared":
        return 7;
      case "evaluative":
        return 2.5;
      default:
        return 2.5;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleFullscreen}
        className="fixed top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 z-10"
      >
        <Maximize2 className="w-5 h-5" />
      </motion.button>

      {isInProgress && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBackToSelection}
          className="fixed top-4 left-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
      )}

      <div className="max-w-5xl mx-auto w-full h-full flex flex-col">
        <AnimatePresence mode="wait">
          {!isInProgress ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center pt-16"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-center mb-16"
              >
                Oratio
              </motion.h1>

              <div className="space-y-12 w-full">
                <SpeechSelector
                  selectedType={speechType}
                  onSelect={handleSpeechSelect}
                />

                <div className="min-h-[200px] flex flex-col items-center justify-start relative">
                  <AnimatePresence mode="wait" initial={false}>
                    {showTopicGenerator ? (
                      <motion.div
                        key="topic-generator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className="absolute w-full"
                      >
                        <TopicGenerator
                          isOpen={true}
                          onSelectTopic={handleTopicSelect}
                        />
                      </motion.div>
                    ) : speechType === "prepared" ||
                      speechType === "evaluative" ||
                      selectedTopic ? (
                      <motion.div
                        key="timer-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className="text-center space-y-6 mt-4 absolute w-full"
                      >
                        {selectedTopic && (
                          <div className="mb-10">
                            <h2 className="text-2xl font-semibold">
                              Selected Topic
                            </h2>
                            <p className="text-xl text-gray-300 mt-2">
                              {selectedTopic.text}
                            </p>
                          </div>
                        )}
                        <Timer
                          duration={getDuration()}
                          isActive={false}
                          onComplete={handleTimerComplete}
                        />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center flex-grow justify-center"
            >
              {selectedTopic && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12 fixed top-20"
                >
                  <p className="text-gray-400 text-lg">Current Topic</p>
                  <p className="text-2xl">{selectedTopic.text}</p>
                </motion.div>
              )}

              <div className="flex-grow flex items-center justify-center">
                <Timer
                  duration={getDuration()}
                  isActive={true}
                  onComplete={handleTimerComplete}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
