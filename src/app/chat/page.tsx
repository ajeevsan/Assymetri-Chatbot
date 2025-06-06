// app/chat/page.tsx
'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ChatPage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<{ prompt: string; response: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewHTML, setPreviewHTML] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    const newMessage = { prompt, response: data.response };
    setMessages((prev) => [...prev, newMessage]);
    setPreviewHTML(data.response);
    setPrompt("");
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="space-y-4">
        {messages.map((msg, i) => (
          <Card key={i} className="p-4">
            <p className="text-sm font-semibold">You:</p>
            <p>{msg.prompt}</p>
            <p className="text-sm font-semibold mt-2">Bot:</p>
            <pre className="whitespace-pre-wrap">{msg.response}</pre>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe a landing page you want..."
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Generating..." : "Send"}
        </Button>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Live Preview</h2>
        <iframe
          srcDoc={previewHTML}
          className="w-full h-[400px] rounded-md border"
        />
      </div>
    </div>
  );
}
