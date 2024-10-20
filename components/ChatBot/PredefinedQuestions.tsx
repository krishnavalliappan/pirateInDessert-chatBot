import React from "react";
import { motion } from "framer-motion";
import predefinedQA from "./PredefinedQuestionsData";

interface Props {
  onQuestionClick: (question: string, answer: string) => void;
  onChatMoreClick: () => void;
}

const PredefinedQuestions: React.FC<Props> = ({
  onQuestionClick,
  onChatMoreClick,
}) => (
  <div className="space-y-2">
    {predefinedQA.map((qa, index) => (
      <motion.button
        key={index}
        onClick={() => onQuestionClick(qa.question, qa.answer)}
        className="w-full py-2 px-3 bg-background text-foreground rounded-full border border-primary/50 transition-colors duration-300 text-left relative overflow-hidden group text-xs sm:text-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10">{qa.question}</span>
        <motion.div
          className="absolute inset-0 bg-primary/10"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </motion.button>
    ))}
    <motion.button
      onClick={onChatMoreClick}
      className="w-full py-2 px-3 bg-primary text-primary-foreground rounded-full border border-primary transition-colors duration-300 font-medium mt-2 text-xs sm:text-sm"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Chat more to uncover hidden treasures...
    </motion.button>
  </div>
);

export default PredefinedQuestions;
