import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CSSProperties } from "react";
import PropagateLoader  from "react-spinners/PropagateLoader";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const override: CSSProperties = {
  display: "block",
  margin: "0",
  borderColor: "#000000",
};

interface LoadingProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Loading({
  open,
  setOpen,
}: LoadingProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <VisuallyHidden>
          <AlertDialogTitle>Title</AlertDialogTitle>
        </VisuallyHidden>
        <AlertDialogHeader>
          <div className="w-full h-20 flex flex-col items-center justify-center">
            <PropagateLoader 
              color={'#000000'}
              loading={true}
              cssOverride={override}
              size={10}
              speedMultiplier={1}
              aria-label="PropagateLoader "
              data-testid="PropagateLoader "
            />
            <div className="absolute right-50 left-50 bottom-6 font-geist text-[12px]">This may take a while</div>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
