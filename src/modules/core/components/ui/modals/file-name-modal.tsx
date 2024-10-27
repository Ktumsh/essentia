import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Dispatch, FC, SetStateAction } from "react";

interface FileNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  fileName: string | undefined;
  setFileName: Dispatch<SetStateAction<string | undefined>>;
  onSubmit: () => void;
}

const FileNameModal: FC<FileNameModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  fileName,
  setFileName,
  onSubmit,
}) => (
  <Modal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    classNames={{
      backdrop: "z-[101] bg-black/80",
      wrapper: "z-[102]",
      base: "bg-white dark:bg-full-dark",
      header: "text-main dark:text-main-dark",
      closeButton:
        "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
    }}
  >
    <ModalContent>
      <ModalHeader>
        <span>Ingresa el nombre del archivo</span>
      </ModalHeader>
      <ModalBody>
        <Input
          isClearable
          fullWidth
          defaultValue={fileName}
          onValueChange={setFileName}
          classNames={{
            inputWrapper:
              "dark:bg-dark dark:data-[hover=true]:bg-dark/50 dark:data-[focus=true]:bg-dark",
            clearButton: "text-main-m dark:text-main-dark-m",
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          variant="light"
          onPress={onClose}
          className="data-[hover=true]:bg-black/5 dark:data-[hover=true]:bg-white/5"
        >
          Cancelar
        </Button>
        <Button color="danger" onPress={onSubmit}>
          Descargar
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default FileNameModal;
