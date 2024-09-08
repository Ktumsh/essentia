import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { memo } from "react";

interface MainButtonProps {
  handleClick: () => void;
  isFastClick: boolean;
  clicks: number;
}

const MainButton = memo(
  ({ handleClick, isFastClick, clicks }: MainButtonProps) => {
    return (
      <motion.div
        whileTap={{ scale: isFastClick ? 1.3 : 0.95 }}
        whileHover={{ scale: 1.1 }}
        animate={{ scale: clicks >= 100 ? 1.4 : 1 }}
        className="hidden md:block"
      >
        <Button
          disableRipple
          onClick={handleClick}
          radius="full"
          color={clicks >= 100 ? "success" : isFastClick ? "warning" : "danger"}
          variant="shadow"
          className="mr-10"
        >
          ¡Sigue moviéndote! Clics: {clicks}
        </Button>
      </motion.div>
    );
  }
);

MainButton.displayName = "MainButton";

export default MainButton;
