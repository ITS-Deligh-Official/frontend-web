"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion } from "lucide-react";

export default function AiChatButton() {
  return (
    <Button
      size="lg"
      variant="outline"
      onClick={() =>
        toast.info(
          "AI Chat is coming soon — it'll connect to the assistant once the backend is live.",
        )
      }
    >
      <MessageCircleQuestion className="h-4 w-4" />
      AI Chat
    </Button>
  );
}
