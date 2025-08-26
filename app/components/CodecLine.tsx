import { cn } from "@/lib/cn";

export default function CodecLine({ className }: { className?: string }) {
  return <span aria-hidden className={cn("codec-line", className)} />;
}
