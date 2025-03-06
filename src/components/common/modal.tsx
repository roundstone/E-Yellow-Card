import React from "react";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface AppModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

const AppModal: React.FC<AppModalProps> = ({
  open,
  setOpen,
  title,
  children,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogContent className="smmax-w-md w[867px] w-full p-0 transition-all duration-300 ease-in-out">
        <DialogTitle className="border-b px-6 py-3 text-base text-[#8E8E93]">
          {title}
        </DialogTitle>
        <div className="p-6"> {children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
