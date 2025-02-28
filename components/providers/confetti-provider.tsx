"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import ReactConfetti from "react-confetti";

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) return null;

  return (
    <ReactConfetti
      className="pointer-events-none z-50 opacity-80"
      numberOfPieces={5500}
      recycle={false}
      onConfettiComplete={confetti.onClose}
    />
  );
};
