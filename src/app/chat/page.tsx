// app/chat/page.tsx
'use client'

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import FullScreenLoader from "@/components/ui/LoadingOverlay";
import { Send, User, Bot, Code, Eye, Copy, Check, LogOut } from "lucide-react";

export default function ChatPage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<{ prompt: string; response: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewHTML, setPreviewHTML] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    
    // Clean the response by removing markdown code blocks
    const cleanResponse = data.response
      .replace(/```html\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const newMessage = { prompt, response: cleanResponse };
    setMessages((prev) => [...prev, newMessage]);
    setPreviewHTML(cleanResponse);
    setPrompt("");
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleLogout = async () => {
    try {
      // Add your logout logic here
      // For example: await signOut() if using NextAuth
      // Or: await fetch('/api/auth/logout', { method: 'POST' })
      
      // Redirect to login or home page
      window.location.href = '/login'; // or wherever you want to redirect
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  HTML Generator Chat
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Describe your landing page and watch it come to life
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-red-600 hover:border-red-300 dark:hover:text-red-400 dark:hover:border-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            {/* Chat Section */}
            <div className="flex flex-col space-y-4">
              <Card className="flex-1 shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Conversation
                    </span>
                    <Badge variant="secondary" className="ml-auto">
                      {messages.length} messages
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px] px-6">
                    <div className="space-y-6">
                      {messages.length === 0 ? (
                        <div className="text-center py-12">
                          <Bot className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">
                            Start a conversation to generate your HTML
                          </p>
                        </div>
                      ) : (
                        messages.map((msg, i) => (
                          <div key={i} className="space-y-4">
                            {/* User Message */}
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                  <p className="text-slate-800 dark:text-slate-200">
                                    {msg.prompt}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Bot Response */}
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 relative group">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Code className="w-4 h-4 text-slate-500" />
                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                      Generated HTML
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                      onClick={() => copyToClipboard(msg.response, i)}
                                    >
                                      {copiedIndex === i ? (
                                        <Check className="w-3 h-3 text-green-500" />
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                    </Button>
                                  </div>
                                  <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono bg-white dark:bg-slate-800 rounded p-2 overflow-x-auto">
                                    {msg.response}
                                  </pre>
                                </div>
                              </div>
                            </div>
                            
                            {i < messages.length - 1 && (
                              <Separator className="my-6" />
                            )}
                          </div>
                        ))
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Input Section */}
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <form onSubmit={handleSubmit} className="flex gap-3">
                    <Input
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Describe your landing page (e.g., 'Create a modern portfolio website with dark theme')"
                      className="flex-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                    />
                    <Button 
                      type="submit"
                      disabled={loading || !prompt.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Generating...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Send
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="flex flex-col">
              <Card className="flex-1 shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Live Preview
                    </span>
                    <Badge variant="outline" className="ml-auto">
                      <Eye className="w-3 h-3 mr-1" />
                      Real-time
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[500px] bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    {previewHTML ? (
                      <iframe
                        srcDoc={previewHTML}
                        className="w-full h-full border-0"
                        title="HTML Preview"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-400">
                        <div className="text-center">
                          <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium mb-2">No preview yet</p>
                          <p className="text-sm">
                            Send a message to generate and preview your HTML
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}