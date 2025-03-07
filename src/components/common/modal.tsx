import React from "react";
import {
  Dialog,
  // DialogClose,
  // DialogFooter,
  // DialogHeader,
  // DialogTrigger,
  DialogContent,
  // DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface AppModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  modal?: boolean;
}

const AppModal: React.FC<AppModalProps> = ({
  open,
  setOpen,
  title,
  children,
  className,
  modal = true,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={modal} >
      <DialogContent
        className={cn(
          "sm:max-w-lg w-ull p-0 transition-all duration-300 ease-in-out",
          className
        )}
      >
        {title && (
          <DialogTitle className="border-b px-6 py-3 text-base text-[#8E8E93]">
            {title}
          </DialogTitle>
        )}
        <div className="p-6"> {children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
