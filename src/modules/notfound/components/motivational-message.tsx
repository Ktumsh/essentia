import { motion, AnimatePresence } from "framer-motion";

interface MotivationalMessagesProps {
  clicks: number;
  isFastClick: boolean;
  showSpeedMessage: boolean;
}

const MotivationalMessages = ({
  clicks,
  isFastClick,
  showSpeedMessage,
}: MotivationalMessagesProps) => {
  return (
    <div className="space-y-2 self-end max-w-52 mr-10 text-center text-sm text-base-color-h dark:text-base-color-dark-h">
      {clicks >= 10 && clicks < 20 && (
        <p>¡Bien hecho! Mantente activo para una mejor salud.</p>
      )}
      {clicks >= 20 && clicks < 30 && (
        <p>¡Increíble! Sigues avanzando hacia un bienestar óptimo.</p>
      )}
      {clicks >= 30 && clicks < 50 && (
        <p>¡No te detengas, estás a mitad de camino hacia un nuevo récord!</p>
      )}
      {clicks >= 50 && clicks < 100 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-bold text-warning">
            ¡Asombroso! ¡Ya llegaste a los 50 clics! 🎉
          </p>
        </motion.div>
      )}
      {clicks >= 100 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-bold text-success">
            ¡Impresionante! ¡100 clics! Eres imparable. 🚀
          </p>
        </motion.div>
      )}

      <AnimatePresence>
        {isFastClick && (
          <motion.p
            key="fast-click-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-red-500"
          >
            ¡Wow, estás haciendo clic muy rápido! 🚀
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSpeedMessage && (
          <motion.p
            key="speed-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-warning"
          >
            ¡Increíble velocidad! ¡Eres una máquina de clics! 💥
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MotivationalMessages;
