import { toast } from "sonner";

export function useClipboard(text: string) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return { copyToClipboard };
}
