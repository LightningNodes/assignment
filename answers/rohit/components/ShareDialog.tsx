import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Contract } from "@/types";
import { encodeString } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  contract: Contract | null;
};
export default function ShareDialog({ open, setOpen, contract }: Props) {
  const [downloadUrl, setDownloadUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    let file, url: string;

    if (contract) {
      let result = "";
      for (const [key, value] of Object.entries(contract)) {
        result += `${key}: ${value}\n`;
      }
      file = new Blob([result.trim()], { type: "text/plain" });
      url = URL.createObjectURL(file);
      setDownloadUrl(url);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [contract]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Welcome to Pi42! Today&apos;s update on {contract?.symbol}.
          </DialogDescription>
        </DialogHeader>
        {contract && (
          <>
            <p>Symbol name: {contract.symbol}</p>
            <p>Last price: {contract.lastPrice}</p>
            <p>24 hour change percentage: {contract.priceChangePercent}</p>
            <p>24 hour volume: {contract.baseAssetVolume}</p>
            <p>24 hour high: {contract.high}</p>
            <p>24 hour low: {contract.low}</p>
          </>
        )}
        <DialogFooter className="sm:justify-start gap-4">
          <Button
            type="button"
            variant="secondary"
            className="bg-green-300 basis-1/2"
            asChild
          >
            <Link href={`whatsapp://send?text=${encodeString(contract!)}`}>
              Share on Whatsapp
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            asChild
            className="basis-1/2"
            onClick={() => toast({ title: "Starting download" })}
          >
            <a href={downloadUrl} download={`${contract?.symbol}.txt`}>
              Download as file
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
