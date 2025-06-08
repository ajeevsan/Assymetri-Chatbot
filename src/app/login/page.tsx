'use client';

import Link from "next/link";
import { useState } from "react";
import { AuthForm } from "../components/auth/authForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code2, Sparkles, CheckCircle, XCircle, X } from "lucide-react";

interface Notification {
  id: string;
  type: 'success' | 'error';
  message: string;
  visible: boolean;
}

export default function LoginPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Function to add a new notification
  const addNotification = (type: 'success' | 'error', message: string) => {
    const id = Date.now().toString();
    const newNotification: Notification = {
      id,
      type,
      message,
      visible: false
    };

    setNotifications(prev => [...prev, newNotification]);

    // Trigger animation after a brief delay
    setTimeout(() => {
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, visible: true } : notif
        )
      );
    }, 10);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  // Function to remove a notification
  const removeNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, visible: false } : notif
      )
    );

    // Remove from array after animation completes
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, 300);
  };

  // Handle authentication results
  const handleAuthResult = (success: boolean, message?: string) => {
    if (success) {
      addNotification('success', message || 'Login successful! Welcome back.');
    } else {
      addNotification('error', message || 'Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 w-full max-w-sm">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`
              transform transition-all duration-300 ease-in-out
              ${notification.visible 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-full opacity-0'
              }
            `}
          >
            <div className={`
              p-4 rounded-lg shadow-lg border-l-4 backdrop-blur-sm
              ${notification.type === 'success'
                ? 'bg-green-50/90 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-300'
                : 'bg-red-50/90 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300'
              }
            `}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {notification.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium">{notification.message}</p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="ml-2 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
        {/* Logo/Brand Section */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HTML Generator
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Transform ideas into beautiful web pages
          </p>
        </div>

        {/* Login Card */}
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
          <CardHeader className="space-y-4 pb-6">
            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Welcome back
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                Sign in to your account to continue creating
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <AuthForm type="login" onAuthResult={handleAuthResult} />
            
            <div className="relative">
              <Separator className="my-6" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white dark:bg-slate-800 px-4 text-sm text-slate-500 dark:text-slate-400">
                  New here?
                </span>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Don&apos;t have an account yet?
              </p>
              <Link href="/signup">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 dark:border-slate-600 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create new account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© 2025 HTML Generator. Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}