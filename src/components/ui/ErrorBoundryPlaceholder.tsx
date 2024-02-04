import { AlertTriangle } from "lucide-react";

export default function ErrorBoundryPlaceholder() {
  return (
    <div className="border border-gray-200 p-8 w-fit h-fit rounded-lg text-gray-500 flex flex-col gap-1 items-center">
      <AlertTriangle />
      Something went wrong
    </div>
  );
}
