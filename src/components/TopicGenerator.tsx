import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Theme, Topic } from "../types";

interface TopicGeneratorProps {
  onSelectTopic: (topic: Topic) => void;
  isOpen: boolean;
}

const themes: Theme[] = [
  "technology",
  "society",
  "environment",
  "education",
  "philosophy",
];

const generateTopics = (theme: Theme): Topic[] => {
  const topicsByTheme: Record<Theme, string[]> = {
    technology: [
      "How has artificial intelligence changed human creativity?",
      "Should social media platforms be regulated like utilities?",
      "Is digital privacy a human right?",
      "The impact of remote work on society",
      "The future of transportation in smart cities",
    ],
    society: [
      "The role of tradition in modern society",
      "The impact of globalization on local cultures",
      "Universal basic income: necessity or mistake?",
      "The future of democracy in the digital age",
      "The changing nature of work and careers",
    ],
    environment: [
      "Individual vs corporate responsibility in climate change",
      "The future of renewable energy",
      "Urban farming and food sustainability",
      "Ocean conservation strategies",
      "The impact of fast fashion on the environment",
    ],
    education: [
      "The role of AI in education",
      "Should coding be mandatory in schools?",
      "The future of higher education",
      "Learning styles: myth or reality?",
      "The impact of gamification on learning",
    ],
    philosophy: [
      "The ethics of artificial intelligence",
      "Free will in the age of algorithms",
      "The nature of consciousness",
      "The role of truth in the post-truth era",
      "The meaning of progress in modern society",
    ],
  };

  return topicsByTheme[theme].map((text, index) => ({
    id: `${theme}-${index}`,
    text,
    theme,
  }));
};

export function TopicGenerator({ onSelectTopic, isOpen }: TopicGeneratorProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>("technology");
  const [topics, setTopics] = useState<Topic[]>([]);

  const handleGenerateTopics = () => {
    setTopics(generateTopics(selectedTheme));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg p-6 space-y-6"
    >
      <div className="flex gap-4 flex-wrap justify-center">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => setSelectedTheme(theme)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                selectedTheme === theme
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGenerateTopics}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
      >
        <RefreshCw className="w-5 h-5" />
        Generate Topics
      </motion.button>

      <AnimatePresence mode="wait">
        {topics.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="space-y-3"
          >
            {topics.map((topic) => (
              <motion.button
                key={topic.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectTopic(topic)}
                className="w-full p-4 bg-gray-700 rounded-lg text-left hover:bg-gray-600 transition-colors"
              >
                {topic.text}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
