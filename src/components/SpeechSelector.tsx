import { motion } from "framer-motion";
import { Mic2, BookOpen, Scale } from "lucide-react";
import { SpeechType } from "../types";

interface SpeechSelectorProps {
  selectedType: SpeechType | null;
  onSelect: (type: SpeechType) => void;
}

const speechTypes = [
  { id: "impromptu", icon: Mic2, label: "Impromptu", duration: 2.5 },
  { id: "prepared", icon: BookOpen, label: "Prepared", duration: 7 },
  { id: "evaluative", icon: Scale, label: "Evaluative", duration: 2.5 },
] as const;

export function SpeechSelector({
  selectedType,
  onSelect,
}: SpeechSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 justify-center"
    >
      {speechTypes.map(({ id, icon: Icon, label }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(id as SpeechType)}
          className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors w-28 mx-1
            ${
              selectedType === id
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
        >
          <Icon className="w-8 h-8" />
          <span className="text-sm font-medium">{label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
