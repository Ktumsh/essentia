import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface ConfettiComponentProps {
  clicks?: number;
  windowSize: { width: number; height: number };
}

const ConfettiComponent = ({ clicks, windowSize }: ConfettiComponentProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOpacity, setConfettiOpacity] = useState(1);

  useEffect(() => {
    if (clicks !== undefined) {
      if (clicks === 100) {
        setShowConfetti(true);
        setConfettiOpacity(1);

        setTimeout(() => {
          const fadeOutInterval = setInterval(() => {
            setConfettiOpacity((prevOpacity) => {
              if (prevOpacity <= 0.05) {
                clearInterval(fadeOutInterval);
                setShowConfetti(false);
                return 0;
              }
              return prevOpacity - 0.05;
            });
          }, 100);
        }, 3000);
      }
    } else {
      setShowConfetti(true);
      setConfettiOpacity(1);

      setTimeout(() => {
        const fadeOutInterval = setInterval(() => {
          setConfettiOpacity((prevOpacity) => {
            if (prevOpacity <= 0.05) {
              clearInterval(fadeOutInterval);
              setShowConfetti(false);
              return 0;
            }
            return prevOpacity - 0.05;
          });
        }, 100);
      }, 3000);
    }
  }, [clicks]);

  if (!showConfetti) return null;

  return (
    <div style={{ opacity: confettiOpacity }}>
      <Confetti width={windowSize.width} height={windowSize.height} />
    </div>
  );
};

export default ConfettiComponent;
